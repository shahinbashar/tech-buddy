# Learning content — source

These pages are copied verbatim from **github.com/shahinbashar/learning-exam-prep**, folder
`docs/content`, commit `a7b37ba` (13 Oct 2026). That repository is the master copy; edit
there, then refresh here.

## Imported (18 pages)

telecom, c, oop, networking, os, dsa, dbms, se, coding, pyq, bmath, langmcq, focus, revision,
qbank, icb, buet, bpdb — mapped to subjects in `../catalog.ts`.

## Left out on purpose

- `today`, `log`, `study-plan`, `bydate`, `home` — the author's personal schedule, quiz scores
  and writing feedback.
- `arch`, `general`, `math` — topic lists without notes yet. Add them to `../catalog.ts`
  once they have content.
- Inside imported pages, sections matching `SKIP_SECTIONS` in `../catalog.ts` (score logs,
  schedules, AI-chat instructions, index tables).

## Refresh

```bash
cp ../learning-exam-prep/docs/content/{telecom,c,oop,networking,os,dsa,dbms,se,coding,pyq,bmath,langmcq,focus,revision,qbank,icb,buet,bpdb}.md apps/api/prisma/learning/content/
```

```bash
pnpm --filter api test -- prisma/learning
```

```bash
pnpm --filter api db:import-learning --dry-run
```

```bash
pnpm --filter api db:import-learning
```

Update the commit hash above when you refresh.
