/**
 * Imports the Learning study content (prisma/learning/content/*.md) into the database.
 *
 *   pnpm --filter api db:import-learning            # write
 *   pnpm --filter api db:import-learning --dry-run  # print the plan only
 *
 * Idempotent: subjects and topics are matched by slug and updated in place, so re-running
 * after editing a page refreshes it. The importer owns each imported topic's `content`;
 * notes, attachments and questions added by admins are never touched. MCQs are matched by
 * question text and added once.
 */
import { PrismaClient } from '@prisma/client';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildPlan, type PlannedSubject } from './plan';

/** Next to this file in the repo; one level up when compiled to dist-seed/learning/. */
function contentDir(): string {
  const candidates = [
    process.env.LEARNING_CONTENT_DIR,
    join(__dirname, 'content'),
    join(__dirname, '../../prisma/learning/content'),
  ].filter((p): p is string => Boolean(p));
  const found = candidates.find((dir) => existsSync(dir));
  if (!found) throw new Error(`Learning content not found; looked in: ${candidates.join(', ')}`);
  return found;
}

function readPages(dir: string): Record<string, string> {
  return Object.fromEntries(
    readdirSync(dir)
      .filter((file) => file.endsWith('.md'))
      .map((file) => [file.replace(/\.md$/, ''), readFileSync(join(dir, file), 'utf8')]),
  );
}

async function importSubject(prisma: PrismaClient, planned: PlannedSubject) {
  const { topics, ...subject } = planned;
  const { id: subjectId } = await prisma.subject.upsert({
    where: { slug: subject.slug },
    create: { ...subject, isPublished: true },
    update: { ...subject, isPublished: true },
  });

  const ids = new Map<string, string>();
  let mcqsCreated = 0;
  // Parents first, so children can point at them.
  const ordered = [...topics].sort(
    (a, b) => Number(Boolean(a.parentSlug)) - Number(Boolean(b.parentSlug)),
  );
  for (const topic of ordered) {
    const data = {
      title: topic.title,
      description: topic.description,
      content: topic.content,
      order: topic.order,
      parentId: topic.parentSlug ? (ids.get(topic.parentSlug) ?? null) : null,
      accessLevel: 'FREE' as const,
      isPublished: true,
    };
    const { id } = await prisma.topic.upsert({
      where: { subjectId_slug: { subjectId, slug: topic.slug } },
      create: { subjectId, slug: topic.slug, ...data },
      update: data,
    });
    ids.set(topic.slug, id);

    for (const mcq of topic.mcqs) {
      if (await prisma.question.findFirst({ where: { subjectId, text: mcq.text } })) continue;
      await prisma.question.create({
        data: {
          subjectId,
          topicId: id,
          text: mcq.text,
          explanation: mcq.explanation,
          difficulty: 'MEDIUM',
          accessLevel: 'FREE',
          isPublished: true,
          options: {
            create: mcq.options.map((text, order) => ({
              text,
              order,
              isCorrect: order === mcq.correct,
            })),
          },
        },
      });
      mcqsCreated++;
    }
  }
  return { topics: topics.length, mcqsCreated };
}

async function main() {
  const dir = contentDir();
  const plan = buildPlan(readPages(dir));
  const totals = plan.reduce(
    (acc, s) => ({
      topics: acc.topics + s.topics.length,
      mcqs: acc.mcqs + s.topics.reduce((n, t) => n + t.mcqs.length, 0),
    }),
    { topics: 0, mcqs: 0 },
  );

  if (process.argv.includes('--dry-run')) {
    for (const subject of plan) {
      console.log(`\n${subject.name}  (/subjects/${subject.slug})`);
      for (const t of subject.topics) {
        const mcqs = t.mcqs.length ? `  [${t.mcqs.length} MCQ]` : '';
        console.log(
          `  ${t.parentSlug ? '  ↳ ' : '• '}${t.title}  (${t.slug}, ${t.content.length} chars)${mcqs}`,
        );
      }
    }
    console.log(
      `\n${plan.length} subjects, ${totals.topics} topics, ${totals.mcqs} MCQs (dry run)`,
    );
    return;
  }

  const prisma = new PrismaClient();
  try {
    let created = 0;
    for (const subject of plan) {
      const result = await importSubject(prisma, subject);
      created += result.mcqsCreated;
      console.log(`✓ ${subject.name}: ${result.topics} topics`);
    }
    console.log(
      `✓ Learning import: ${plan.length} subjects, ${totals.topics} topics, ${created} new MCQs (${totals.mcqs} in content)`,
    );
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
