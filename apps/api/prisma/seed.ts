import {
  type AccessLevel,
  type CircularCategory,
  type Difficulty,
  PrismaClient,
} from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();
const DAY_MS = 24 * 60 * 60 * 1000;

// ─────────────────────────────── Data ───────────────────────────────

const SUBJECTS = [
  {
    slug: 'bangla',
    name: 'Bangla',
    nameBn: 'বাংলা',
    category: 'GENERAL',
    order: 1,
    description: 'Bangla language and literature for recruitment exams.',
  },
  {
    slug: 'english',
    name: 'English',
    nameBn: 'ইংরেজি',
    category: 'GENERAL',
    order: 2,
    description: 'Grammar, vocabulary and comprehension.',
  },
  {
    slug: 'mathematics',
    name: 'Mathematics',
    nameBn: 'গণিত',
    category: 'GENERAL',
    order: 3,
    description: 'Arithmetic, algebra and mental ability.',
  },
  {
    slug: 'general-knowledge',
    name: 'General Knowledge',
    nameBn: 'সাধারণ জ্ঞান',
    category: 'GENERAL',
    order: 4,
    description: 'Bangladesh and international affairs.',
  },
  {
    slug: 'ict',
    name: 'ICT',
    nameBn: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    category: 'GENERAL',
    order: 5,
    description: 'Information and communication technology basics.',
  },
  {
    slug: 'computer-science',
    name: 'Computer Science',
    nameBn: 'কম্পিউটার বিজ্ঞান',
    category: 'TECHNICAL',
    order: 6,
    description:
      'Core CS topics for IT recruitment exams (Assistant Programmer, Programmer, etc.).',
  },
] as const;

interface TopicSeed {
  slug: string;
  title: string;
  description: string;
  accessLevel?: AccessLevel;
  children?: TopicSeed[];
}

const TOPICS: Record<string, TopicSeed[]> = {
  bangla: [
    {
      slug: 'bangla-grammar',
      title: 'Bangla Grammar (ব্যাকরণ)',
      description: 'সন্ধি, সমাস, কারক ও বিভক্তি।',
    },
  ],
  english: [
    {
      slug: 'parts-of-speech',
      title: 'Parts of Speech',
      description: 'Nouns, verbs, adjectives and more.',
    },
  ],
  mathematics: [
    { slug: 'percentage', title: 'Percentage', description: 'Percent, profit & loss basics.' },
  ],
  'general-knowledge': [
    {
      slug: 'bangladesh-affairs',
      title: 'Bangladesh Affairs',
      description: 'History, constitution and geography of Bangladesh.',
    },
    {
      slug: 'international-affairs',
      title: 'International Affairs',
      description: 'International organisations and current affairs.',
    },
  ],
  ict: [
    {
      slug: 'ict-basics',
      title: 'ICT Basics',
      description: 'Hardware, software, internet and e-governance.',
    },
  ],
  'computer-science': [
    {
      slug: 'digital-logic',
      title: 'Digital Logic',
      description: 'Number systems, gates, Boolean algebra and combinational circuits.',
      children: [
        {
          slug: 'number-systems',
          title: 'Number Systems',
          description: 'Binary, octal, decimal and hexadecimal conversions.',
        },
        {
          slug: 'logic-gates',
          title: 'Logic Gates',
          description: 'AND, OR, NOT, NAND, NOR, XOR and universal gates.',
        },
        {
          slug: 'boolean-algebra',
          title: 'Boolean Algebra',
          description: 'Laws, De Morgan’s theorem and simplification.',
        },
      ],
    },
    {
      slug: 'operating-systems',
      title: 'Operating Systems',
      description: 'Processes, scheduling, memory management and deadlocks.',
    },
    {
      slug: 'database-management-systems',
      title: 'Database Management Systems',
      description: 'Relational model, SQL, keys and normalization.',
    },
    {
      slug: 'computer-networks',
      title: 'Computer Networks',
      description: 'OSI/TCP-IP models, addressing and protocols.',
    },
    {
      slug: 'data-structures-and-algorithms',
      title: 'Data Structures and Algorithms',
      description: 'Arrays, stacks, queues, trees, sorting and complexity.',
    },
    {
      slug: 'object-oriented-programming',
      title: 'Object-Oriented Programming',
      description: 'Encapsulation, inheritance, polymorphism and abstraction.',
      accessLevel: 'PREMIUM',
    },
  ],
};

const NOTES: {
  subject: string;
  topic: string;
  title: string;
  summary: string;
  accessLevel: AccessLevel;
  content: string;
}[] = [
  {
    subject: 'computer-science',
    topic: 'number-systems',
    title: 'Number system conversions',
    summary: 'Convert between binary, octal, decimal and hexadecimal quickly.',
    accessLevel: 'FREE',
    content: `## Bases at a glance

| System | Base | Digits |
| --- | --- | --- |
| Binary | 2 | 0–1 |
| Octal | 8 | 0–7 |
| Decimal | 10 | 0–9 |
| Hexadecimal | 16 | 0–9, A–F |

## Decimal → Binary
Divide by 2 repeatedly and read the remainders **bottom-up**.

\`\`\`
13 ÷ 2 = 6 r 1
 6 ÷ 2 = 3 r 0
 3 ÷ 2 = 1 r 1
 1 ÷ 2 = 0 r 1   →  13₁₀ = 1101₂
\`\`\`

## Binary → Hex
Group bits in fours from the right: \`1010 1111₂ = AF₁₆\`.

> **Exam tip:** 2's complement of a number = 1's complement + 1.`,
  },
  {
    subject: 'computer-science',
    topic: 'boolean-algebra',
    title: 'Laws of Boolean algebra',
    summary: 'Identity, complement, idempotent and De Morgan’s laws.',
    accessLevel: 'FREE',
    content: `## Basic laws

- Identity: \`A + 0 = A\`, \`A · 1 = A\`
- Null: \`A + 1 = 1\`, \`A · 0 = 0\`
- Idempotent: \`A + A = A\`, \`A · A = A\`
- Complement: \`A + A' = 1\`, \`A · A' = 0\`
- Absorption: \`A + AB = A\`

## De Morgan’s theorem

1. \`(A + B)' = A' · B'\`
2. \`(A · B)' = A' + B'\`

**Universal gates:** NAND and NOR can each implement any Boolean function.`,
  },
  {
    subject: 'computer-science',
    topic: 'boolean-algebra',
    title: 'K-map simplification (advanced)',
    summary: 'Grouping rules and don’t-care conditions with worked examples.',
    accessLevel: 'PREMIUM',
    content: `## Karnaugh map rules

1. Groups must contain 1, 2, 4, 8… cells.
2. Groups may wrap around edges.
3. Make groups as large as possible, and as few as possible.
4. Don't-care cells (X) may be included when they help.

### Worked example
F(A,B,C) = Σm(1,3,5,7) simplifies to **F = C**.`,
  },
  {
    subject: 'computer-science',
    topic: 'operating-systems',
    title: 'Process scheduling basics',
    summary: 'FCFS, SJF, Round Robin and priority scheduling.',
    accessLevel: 'FREE',
    content: `## Common CPU scheduling algorithms

- **FCFS** — non-preemptive, can cause the *convoy effect*.
- **SJF** — optimal average waiting time; needs burst-time prediction.
- **Round Robin** — preemptive with a time quantum; good for time-sharing.
- **Priority** — may cause starvation; fixed by *aging*.

## Deadlock conditions (Coffman)
Mutual exclusion, hold and wait, no preemption, circular wait.`,
  },
  {
    subject: 'computer-science',
    topic: 'database-management-systems',
    title: 'Keys and normalization',
    summary: 'Primary, candidate and foreign keys; 1NF to BCNF.',
    accessLevel: 'FREE',
    content: `## Keys
- **Super key** — any set of attributes that uniquely identifies a row.
- **Candidate key** — a minimal super key.
- **Primary key** — the chosen candidate key.
- **Foreign key** — references a primary key in another table.

## Normal forms
1. **1NF** — atomic values.
2. **2NF** — 1NF + no partial dependency.
3. **3NF** — 2NF + no transitive dependency.
4. **BCNF** — every determinant is a candidate key.`,
  },
  {
    subject: 'general-knowledge',
    topic: 'bangladesh-affairs',
    title: 'Key facts about Bangladesh',
    summary: 'Frequently asked facts in recruitment exams.',
    accessLevel: 'FREE',
    content: `- Independence declared: **26 March 1971**
- Victory Day: **16 December 1971**
- Constitution effective: **16 December 1972**
- Number of divisions: **8**
- Longest river inside Bangladesh: **Meghna**`,
  },
];

type Q = [
  subject: string,
  topic: string | null,
  difficulty: Difficulty,
  text: string,
  options: [string, string, string, string],
  correct: 0 | 1 | 2 | 3,
  explanation: string,
  access?: AccessLevel,
];

const QUESTIONS: Q[] = [
  // Computer Science — Digital logic
  [
    'computer-science',
    'number-systems',
    'EASY',
    'What is the binary equivalent of decimal 13?',
    ['1101', '1011', '1110', '1001'],
    0,
    '13 = 8 + 4 + 1 = 1101₂.',
  ],
  [
    'computer-science',
    'number-systems',
    'EASY',
    'Hexadecimal number system has base:',
    ['8', '10', '16', '2'],
    2,
    'Hexadecimal uses 16 symbols: 0–9 and A–F.',
  ],
  [
    'computer-science',
    'number-systems',
    'MEDIUM',
    'What is the hexadecimal equivalent of binary 10101111?',
    ['AF', 'BF', 'A7', 'FA'],
    0,
    'Group into nibbles: 1010 = A, 1111 = F → AF.',
  ],
  [
    'computer-science',
    'number-systems',
    'MEDIUM',
    "The 2's complement of binary 0101 (4-bit) is:",
    ['1010', '1011', '1101', '0110'],
    1,
    "1's complement of 0101 is 1010; adding 1 gives 1011.",
  ],
  [
    'computer-science',
    'logic-gates',
    'EASY',
    'Which gates are known as universal gates?',
    ['AND and OR', 'NAND and NOR', 'XOR and XNOR', 'NOT and AND'],
    1,
    'Any Boolean function can be implemented using only NAND or only NOR gates.',
  ],
  [
    'computer-science',
    'logic-gates',
    'EASY',
    'The output of an XOR gate is 1 when:',
    ['Both inputs are 1', 'Both inputs are 0', 'Inputs are different', 'Any input is 1'],
    2,
    'XOR outputs 1 only when its inputs differ.',
  ],
  [
    'computer-science',
    'boolean-algebra',
    'EASY',
    "According to the complement law, A + A' equals:",
    ['0', '1', 'A', "A'"],
    1,
    "A variable OR'ed with its complement is always 1.",
  ],
  [
    'computer-science',
    'boolean-algebra',
    'MEDIUM',
    "By De Morgan's theorem, (A · B)' is equal to:",
    ["A' · B'", "A' + B'", 'A + B', "(A + B)'"],
    1,
    'De Morgan: the complement of a product is the sum of the complements.',
  ],
  [
    'computer-science',
    'boolean-algebra',
    'MEDIUM',
    'Simplify the Boolean expression A + AB.',
    ['A', 'B', 'AB', 'A + B'],
    0,
    'Absorption law: A + AB = A(1 + B) = A.',
  ],
  // Operating systems
  [
    'computer-science',
    'operating-systems',
    'EASY',
    'Which scheduling algorithm can cause the convoy effect?',
    ['Round Robin', 'FCFS', 'SJF', 'Priority with aging'],
    1,
    'In FCFS, short processes wait behind one long process — the convoy effect.',
  ],
  [
    'computer-science',
    'operating-systems',
    'MEDIUM',
    'Which of the following is NOT a necessary condition for deadlock?',
    ['Mutual exclusion', 'Hold and wait', 'Preemption', 'Circular wait'],
    2,
    'The Coffman conditions require NO preemption; allowing preemption prevents deadlock.',
  ],
  [
    'computer-science',
    'operating-systems',
    'MEDIUM',
    'Thrashing in an operating system occurs when:',
    [
      'CPU utilisation is very high',
      'The system spends more time paging than executing',
      'Too many I/O devices are attached',
      'A process enters an infinite loop',
    ],
    1,
    'Thrashing is excessive paging caused by insufficient frames for the working set.',
  ],
  // DBMS
  [
    'computer-science',
    'database-management-systems',
    'EASY',
    'Which SQL command is used to remove all rows from a table but keep its structure?',
    ['DROP', 'DELETE TABLE', 'TRUNCATE', 'REMOVE'],
    2,
    'TRUNCATE removes all rows quickly while keeping the table definition.',
  ],
  [
    'computer-science',
    'database-management-systems',
    'MEDIUM',
    'A relation is in 2NF if it is in 1NF and has no:',
    ['Transitive dependency', 'Partial dependency', 'Multivalued dependency', 'Join dependency'],
    1,
    '2NF removes partial dependencies of non-key attributes on part of a composite key.',
  ],
  [
    'computer-science',
    'database-management-systems',
    'EASY',
    'A minimal super key is called a:',
    ['Foreign key', 'Candidate key', 'Composite key', 'Alternate key'],
    1,
    'A candidate key is a super key with no redundant attributes.',
  ],
  // Networks
  [
    'computer-science',
    'computer-networks',
    'EASY',
    'How many layers are there in the OSI model?',
    ['5', '6', '7', '4'],
    2,
    'Physical, Data Link, Network, Transport, Session, Presentation, Application.',
  ],
  [
    'computer-science',
    'computer-networks',
    'MEDIUM',
    'Which protocol is used to translate domain names into IP addresses?',
    ['DHCP', 'DNS', 'ARP', 'FTP'],
    1,
    'DNS resolves human-readable domain names to IP addresses.',
  ],
  [
    'computer-science',
    'computer-networks',
    'MEDIUM',
    'The default port number of HTTPS is:',
    ['80', '21', '443', '25'],
    2,
    'HTTPS uses TCP port 443 by default; HTTP uses 80.',
  ],
  // DSA
  [
    'computer-science',
    'data-structures-and-algorithms',
    'EASY',
    'Which data structure follows the LIFO principle?',
    ['Queue', 'Stack', 'Linked list', 'Tree'],
    1,
    'Stack: Last In, First Out.',
  ],
  [
    'computer-science',
    'data-structures-and-algorithms',
    'MEDIUM',
    'The worst-case time complexity of binary search is:',
    ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
    1,
    'Each comparison halves the search space, giving O(log n).',
  ],
  [
    'computer-science',
    'data-structures-and-algorithms',
    'HARD',
    'Which sorting algorithm has O(n log n) worst-case time complexity?',
    ['Quick sort', 'Bubble sort', 'Merge sort', 'Insertion sort'],
    2,
    'Merge sort is always O(n log n); quick sort degrades to O(n²) in the worst case.',
  ],
  // OOP (premium)
  [
    'computer-science',
    'object-oriented-programming',
    'MEDIUM',
    'Which OOP feature allows the same method name to behave differently based on the object?',
    ['Encapsulation', 'Polymorphism', 'Abstraction', 'Inheritance'],
    1,
    'Polymorphism lets one interface have multiple implementations.',
    'PREMIUM',
  ],
  [
    'computer-science',
    'object-oriented-programming',
    'HARD',
    'Which of the following best describes encapsulation?',
    [
      'Hiding implementation by bundling data and methods',
      'Deriving a class from another',
      'Defining multiple constructors',
      'Overriding a parent method',
    ],
    0,
    'Encapsulation bundles state with behaviour and restricts direct access.',
    'PREMIUM',
  ],
  // ICT
  [
    'ict',
    'ict-basics',
    'EASY',
    'Which of the following is an input device?',
    ['Monitor', 'Printer', 'Scanner', 'Speaker'],
    2,
    'A scanner sends data into the computer.',
  ],
  [
    'ict',
    'ict-basics',
    'EASY',
    '1 kilobyte (KB) is equal to:',
    ['1000 bits', '1024 bytes', '1024 bits', '1000 megabytes'],
    1,
    'In binary convention 1 KB = 2¹⁰ = 1024 bytes.',
  ],
  [
    'ict',
    'ict-basics',
    'MEDIUM',
    'Which memory is volatile?',
    ['ROM', 'RAM', 'Hard disk', 'Flash drive'],
    1,
    'RAM loses its contents when power is removed.',
  ],
  // General knowledge
  [
    'general-knowledge',
    'bangladesh-affairs',
    'EASY',
    'When is the Victory Day of Bangladesh celebrated?',
    ['26 March', '21 February', '16 December', '15 August'],
    2,
    'Bangladesh achieved victory on 16 December 1971.',
  ],
  [
    'general-knowledge',
    'bangladesh-affairs',
    'EASY',
    'How many administrative divisions does Bangladesh have?',
    ['6', '7', '8', '9'],
    2,
    'Bangladesh has 8 divisions (Mymensingh became the 8th in 2015).',
  ],
  [
    'general-knowledge',
    'international-affairs',
    'MEDIUM',
    'Where is the headquarters of the United Nations located?',
    ['Geneva', 'New York', 'Paris', 'Vienna'],
    1,
    'The UN headquarters is in New York City, USA.',
  ],
  // Mathematics
  [
    'mathematics',
    'percentage',
    'EASY',
    'What is 25% of 240?',
    ['50', '60', '70', '48'],
    1,
    '25% = 1/4, and 240 ÷ 4 = 60.',
  ],
  [
    'mathematics',
    'percentage',
    'MEDIUM',
    'A product bought for 800 Tk is sold for 1000 Tk. What is the profit percentage?',
    ['20%', '25%', '15%', '30%'],
    1,
    'Profit = 200; 200 / 800 × 100 = 25%.',
  ],
  // English
  [
    'english',
    'parts-of-speech',
    'EASY',
    'Identify the adjective: "She wore a beautiful dress."',
    ['She', 'wore', 'beautiful', 'dress'],
    2,
    '"Beautiful" describes the noun "dress".',
  ],
  [
    'english',
    'parts-of-speech',
    'MEDIUM',
    'Choose the correct synonym of "Abundant".',
    ['Scarce', 'Plentiful', 'Rare', 'Tiny'],
    1,
    'Abundant means existing in large quantities — plentiful.',
  ],
  // Bangla
  [
    'bangla',
    'bangla-grammar',
    'EASY',
    '"বিদ্যালয়" শব্দের সন্ধি বিচ্ছেদ কোনটি?',
    ['বিদ্যা + আলয়', 'বিদ্য + আলয়', 'বিদ্যা + লয়', 'বিদ + আলয়'],
    0,
    'বিদ্যা + আলয় = বিদ্যালয় (স্বরসন্ধি: আ + আ = আ)।',
  ],
  [
    'bangla',
    'bangla-grammar',
    'MEDIUM',
    '"নীলপদ্ম" কোন সমাস?',
    ['দ্বন্দ্ব', 'কর্মধারয়', 'বহুব্রীহি', 'তৎপুরুষ'],
    1,
    'নীল যে পদ্ম = নীলপদ্ম — বিশেষণ ও বিশেষ্যের মিলনে কর্মধারয় সমাস।',
  ],
];

interface CircularSeed {
  slug: string;
  organizationName: string;
  organizationNameBn?: string;
  title: string;
  category: CircularCategory;
  vacancies: number;
  salary: string;
  /** days relative to now */
  published: number;
  start: number;
  deadline: number;
  featured?: boolean;
  url: string;
}

const CIRCULARS: CircularSeed[] = [
  {
    slug: 'sample-bcc-assistant-programmer',
    organizationName: 'Bangladesh Computer Council',
    organizationNameBn: 'বাংলাদেশ কম্পিউটার কাউন্সিল',
    title: 'Assistant Programmer',
    category: 'IT',
    vacancies: 12,
    salary: 'Grade 9 (৳22,000–53,060)',
    published: -5,
    start: -3,
    deadline: 20,
    featured: true,
    url: 'https://bcc.gov.bd',
  },
  {
    slug: 'sample-bb-assistant-maintenance-engineer',
    organizationName: 'Bangladesh Bank',
    organizationNameBn: 'বাংলাদেশ ব্যাংক',
    title: 'Assistant Maintenance Engineer (IT)',
    category: 'BANK',
    vacancies: 25,
    salary: 'Grade 9',
    published: -2,
    start: 0,
    deadline: 5,
    featured: true,
    url: 'https://erecruitment.bb.org.bd',
  },
  {
    slug: 'sample-btcl-programmer',
    organizationName: 'Bangladesh Telecommunications Company Limited',
    organizationNameBn: 'বিটিসিএল',
    title: 'Programmer',
    category: 'IT',
    vacancies: 8,
    salary: 'Grade 6 (৳35,500–67,010)',
    published: -1,
    start: 2,
    deadline: 30,
    url: 'https://btcl.gov.bd',
  },
  {
    slug: 'sample-dshe-computer-operator',
    organizationName: 'Directorate of Secondary and Higher Education',
    organizationNameBn: 'মাধ্যমিক ও উচ্চ শিক্ষা অধিদপ্তর',
    title: 'Computer Operator',
    category: 'EDUCATION',
    vacancies: 40,
    salary: 'Grade 13 (৳11,000–26,590)',
    published: -10,
    start: -8,
    deadline: 1,
    url: 'https://dshe.gov.bd',
  },
  {
    slug: 'sample-pdb-assistant-engineer',
    organizationName: 'Bangladesh Power Development Board',
    organizationNameBn: 'বাংলাদেশ বিদ্যুৎ উন্নয়ন বোর্ড',
    title: 'Assistant Engineer (Computer)',
    category: 'ENGINEERING',
    vacancies: 6,
    salary: 'Grade 9',
    published: -40,
    start: -38,
    deadline: -10,
    url: 'https://bpdb.gov.bd',
  },
  {
    slug: 'sample-health-statistician',
    organizationName: 'Directorate General of Health Services',
    organizationNameBn: 'স্বাস্থ্য অধিদপ্তর',
    title: 'Statistical Assistant',
    category: 'HEALTH',
    vacancies: 30,
    salary: 'Grade 14',
    published: -60,
    start: -58,
    deadline: -30,
    url: 'https://dghs.gov.bd',
  },
];

// ─────────────────────────────── Seeders ───────────────────────────────

async function seedAdmin(): Promise<void> {
  const email = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD;
  const fullName = process.env.SEED_ADMIN_NAME?.trim() || 'Site Admin';
  if (!email || !password) {
    throw new Error(
      'SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set to seed the admin account',
    );
  }
  if (password.length < 8) throw new Error('SEED_ADMIN_PASSWORD must be at least 8 characters');

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    // Never overwrite an existing password; only make sure the role is correct.
    await prisma.user.update({ where: { email }, data: { role: 'ADMIN', isActive: true } });
    console.log(`✓ Admin exists: ${email}`);
    return;
  }
  await prisma.user.create({
    data: { email, fullName, role: 'ADMIN', passwordHash: await hash(password, 12) },
  });
  console.log(`✓ Admin created: ${email}`);
}

async function seedLearning(): Promise<Map<string, string>> {
  const topicIds = new Map<string, string>(); // `${subjectSlug}/${topicSlug}` → id

  for (const subject of SUBJECTS) {
    const { id: subjectId } = await prisma.subject.upsert({
      where: { slug: subject.slug },
      create: { ...subject, isPublished: true },
      update: {},
    });

    const upsertTopic = async (topic: TopicSeed, order: number, parentId: string | null) => {
      const record = await prisma.topic.upsert({
        where: { subjectId_slug: { subjectId, slug: topic.slug } },
        create: {
          subjectId,
          parentId,
          slug: topic.slug,
          title: topic.title,
          description: topic.description,
          accessLevel: topic.accessLevel ?? 'FREE',
          isPublished: true,
          order,
        },
        update: {},
      });
      topicIds.set(`${subject.slug}/${topic.slug}`, record.id);
      for (const [index, child] of (topic.children ?? []).entries()) {
        await upsertTopic(child, index, record.id);
      }
    };
    for (const [index, topic] of (TOPICS[subject.slug] ?? []).entries()) {
      await upsertTopic(topic, index, null);
    }
  }
  console.log(`✓ ${SUBJECTS.length} subjects, ${topicIds.size} topics`);

  let created = 0;
  for (const [index, note] of NOTES.entries()) {
    const topicId = topicIds.get(`${note.subject}/${note.topic}`);
    if (!topicId) continue;
    const exists = await prisma.note.findFirst({ where: { topicId, title: note.title } });
    if (exists) continue;
    await prisma.note.create({
      data: {
        topicId,
        title: note.title,
        summary: note.summary,
        content: note.content,
        accessLevel: note.accessLevel,
        isPublished: true,
        order: index,
      },
    });
    created++;
  }
  console.log(`✓ Notes: ${created} created`);
  return topicIds;
}

async function seedQuestions(topicIds: Map<string, string>): Promise<void> {
  const subjects = new Map((await prisma.subject.findMany()).map((s) => [s.slug, s.id]));
  let created = 0;
  for (const [
    subjectSlug,
    topicSlug,
    difficulty,
    text,
    options,
    correct,
    explanation,
    access,
  ] of QUESTIONS) {
    if (await prisma.question.findFirst({ where: { text } })) continue;
    await prisma.question.create({
      data: {
        subjectId: subjects.get(subjectSlug)!,
        topicId: topicSlug ? (topicIds.get(`${subjectSlug}/${topicSlug}`) ?? null) : null,
        difficulty,
        text,
        explanation,
        accessLevel: access ?? 'FREE',
        isPublished: true,
        options: {
          create: options.map((option, order) => ({
            text: option,
            order,
            isCorrect: order === correct,
          })),
        },
      },
    });
    created++;
  }
  console.log(`✓ Questions: ${created} created (${QUESTIONS.length} in seed set)`);
}

async function seedCirculars(): Promise<void> {
  const now = Date.now();
  // Deadlines fall at 5:00 PM Bangladesh time (11:00 UTC).
  const at = (days: number, hourUtc = 11) => {
    const d = new Date(now + days * DAY_MS);
    d.setUTCHours(hourUtc, 0, 0, 0);
    return d;
  };
  for (const c of CIRCULARS) {
    await prisma.jobCircular.upsert({
      where: { slug: c.slug },
      create: {
        slug: c.slug,
        organizationName: c.organizationName,
        organizationNameBn: c.organizationNameBn,
        title: c.title,
        category: c.category,
        jobType: 'GOVERNMENT',
        employmentType: 'FULL_TIME',
        publishedDate: at(c.published, 4),
        applicationStartDate: at(c.start, 4),
        applicationDeadline: at(c.deadline),
        vacancies: c.vacancies,
        salary: c.salary,
        educationalQualification:
          'B.Sc. in Computer Science & Engineering or equivalent degree from a recognised university.',
        ageRequirement: '18–32 years (up to 32 years for freedom fighters’ children).',
        additionalRequirements:
          'Sample circular created by the development seed. Verify details on the official website.',
        applicationInstructions:
          '1. Apply online through the official Teletalk portal.\n2. Pay the application fee within 72 hours.\n3. Download the admit card when published.',
        applicationUrl: c.url,
        isFeatured: c.featured ?? false,
        isPublished: true,
      },
      update: {},
    });
  }
  console.log(`✓ Circulars: ${CIRCULARS.length} sample circulars`);
}

async function seedPremiumAndSettings(): Promise<void> {
  const plans = [
    {
      code: 'monthly',
      name: 'Monthly',
      description: 'All premium notes, questions and exams for 30 days.',
      priceBdt: 99,
      durationDays: 30,
    },
    {
      code: 'quarterly',
      name: 'Quarterly',
      description: 'Three months of premium access — best for one recruitment cycle.',
      priceBdt: 249,
      durationDays: 90,
    },
    {
      code: 'lifetime',
      name: 'Lifetime',
      description: 'One-time payment, premium access forever.',
      priceBdt: 999,
      durationDays: null,
    },
  ];
  for (const plan of plans) {
    await prisma.premiumPlan.upsert({ where: { code: plan.code }, create: plan, update: {} });
  }
  await prisma.examSettings.upsert({ where: { id: 1 }, create: { id: 1 }, update: {} });
  console.log('✓ Premium plans and exam settings');
}

async function main(): Promise<void> {
  await seedAdmin();
  const topicIds = await seedLearning();
  await seedQuestions(topicIds);
  await seedCirculars();
  await seedPremiumAndSettings();
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    void prisma.$disconnect();
  });
