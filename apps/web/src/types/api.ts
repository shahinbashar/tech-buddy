// Response shapes returned by the Tech Buddy API.

export type Role = 'ADMIN' | 'USER';
export type AccessLevel = 'FREE' | 'PREMIUM';
export type JobType = 'GOVERNMENT' | 'PRIVATE';
export type EmploymentType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP';
export type CircularCategory =
  | 'IT'
  | 'BANK'
  | 'EDUCATION'
  | 'HEALTH'
  | 'ENGINEERING'
  | 'ADMINISTRATION'
  | 'DEFENSE'
  | 'OTHER';
export type CircularStatus = 'draft' | 'upcoming' | 'open' | 'closed';
export type SubjectCategory = 'GENERAL' | 'TECHNICAL';
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type ExamType = 'DAILY' | 'MODEL';
export type AttemptStatus = 'IN_PROGRESS' | 'SUBMITTED';
export type PreparationGoal =
  | 'GOVERNMENT_IT'
  | 'BCS'
  | 'BANK'
  | 'OTHER_GOVERNMENT'
  | 'PRIVATE_SECTOR';
export type EntitlementStatus = 'active' | 'scheduled' | 'expired' | 'revoked';

export interface Paginated<T> {
  items: T[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  role: Role;
  preparationGoal: PreparationGoal | null;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  hasPremium: boolean;
}

export interface AdminUserRow extends User {
  examsTaken: number;
  topicsCompleted: number;
}

// ── Circulars ──
export interface Attachment {
  id: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
}

export interface CircularSummary {
  id: string;
  slug: string;
  organizationName: string;
  organizationNameBn: string | null;
  title: string;
  category: CircularCategory;
  jobType: JobType;
  employmentType: EmploymentType;
  publishedDate: string;
  applicationStartDate: string;
  applicationDeadline: string;
  vacancies: number | null;
  salary: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  status: CircularStatus;
}

export interface CircularDetail extends CircularSummary {
  educationalQualification: string | null;
  ageRequirement: string | null;
  additionalRequirements: string | null;
  applicationInstructions: string | null;
  applicationUrl: string | null;
  attachments: Attachment[];
  createdAt: string;
  updatedAt: string;
}

export interface CircularStats {
  running: number;
  archived: number;
  closingSoon: number;
}

// ── Learning ──
export interface SubjectSummary {
  id: string;
  slug: string;
  name: string;
  nameBn: string | null;
  description: string | null;
  category: SubjectCategory;
  order: number;
  isPublished: boolean;
  topicCount: number;
  completedCount: number;
}

export interface TopicNode {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  accessLevel: AccessLevel;
  parentId: string | null;
  noteCount: number;
  isCompleted: boolean;
  isLocked: boolean;
}

export interface SubjectDetail extends SubjectSummary {
  topics: (TopicNode & { children: TopicNode[] })[];
}

export interface TopicNav {
  id: string;
  slug: string;
  title: string;
}

export interface PublicNote {
  id: string;
  title: string;
  summary: string | null;
  content: string | null;
  accessLevel: AccessLevel;
  isLocked: boolean;
  attachments: Attachment[];
  updatedAt: string;
}

export interface TopicDetail {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  content: string | null;
  accessLevel: AccessLevel;
  isLocked: boolean;
  isCompleted: boolean;
  completedAt: string | null;
  subject: { id: string; slug: string; name: string; nameBn: string | null };
  parent: (TopicNav & { isPublished: boolean }) | null;
  children: (TopicNav & { description: string | null; accessLevel: AccessLevel })[];
  notes: PublicNote[];
  previous: TopicNav | null;
  next: TopicNav | null;
}

export interface ProgressTopic {
  id: string;
  slug: string;
  title: string;
  parentId: string | null;
  accessLevel: AccessLevel;
  isCompleted: boolean;
  completedAt: string | null;
}

export interface ProgressOverview {
  totalTopics: number;
  completedTopics: number;
  subjects: {
    id: string;
    slug: string;
    name: string;
    nameBn: string | null;
    category: SubjectCategory;
    totalTopics: number;
    completedTopics: number;
    topics: ProgressTopic[];
  }[];
}

// ── Exams ──
export interface ExamCard {
  id: string;
  title: string;
  description: string | null;
  type: ExamType;
  examDate: string;
  durationMinutes: number;
  marksPerQuestion: number;
  negativeMarking: number;
  allowMultipleAttempts: boolean;
  accessLevel: AccessLevel;
  questionCount: number;
  isLocked: boolean;
  attemptCount: number;
  bestPercentage: number | null;
  lastAttemptId: string | null;
  inProgressAttemptId: string | null;
  canStart: boolean;
}

export interface ExamDetail extends ExamCard {
  attempts: {
    id: string;
    attemptNumber: number;
    status: AttemptStatus;
    startedAt: string;
    submittedAt: string | null;
    obtainedMarks: number;
    totalMarks: number;
    percentage: number;
  }[];
}

export interface SnapshotOption {
  id: string;
  text: string;
  textBn: string | null;
}

export interface AttemptQuestion {
  answerId: string;
  order: number;
  text: string;
  textBn: string | null;
  options: SnapshotOption[];
  selectedOptionId: string | null;
  subjectName: string;
}

export interface ResultQuestion extends AttemptQuestion {
  correctOptionId: string;
  isCorrect: boolean | null;
  explanation: string;
  topicName: string | null;
  difficulty: Difficulty;
}

interface AttemptBase {
  id: string;
  attemptNumber: number;
  exam: {
    id: string;
    title: string;
    durationMinutes?: number;
    allowMultipleAttempts?: boolean;
    type?: ExamType;
  };
  examTitle: string;
  startedAt: string;
  expiresAt: string;
  serverTime: string;
  totalQuestions: number;
  marksPerQuestion: number;
  negativeMarking: number;
}

export interface InProgressAttempt extends AttemptBase {
  status: 'IN_PROGRESS';
  questions: AttemptQuestion[];
}

export interface AttemptResultSummary {
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  obtainedMarks: number;
  totalMarks: number;
  percentage: number;
  timeSpentSeconds: number;
  accuracy: number;
}

export interface SubmittedAttempt extends AttemptBase {
  status: 'SUBMITTED';
  submittedAt: string;
  result: AttemptResultSummary;
  subjectBreakdown: {
    subjectName: string;
    correct: number;
    incorrect: number;
    unanswered: number;
    total: number;
  }[];
  questions: ResultQuestion[];
}

export type AttemptView = InProgressAttempt | SubmittedAttempt;

export interface AttemptHistoryItem {
  id: string;
  examId: string;
  examTitle: string;
  attemptNumber: number;
  startedAt: string;
  submittedAt: string;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  obtainedMarks: number;
  totalMarks: number;
  percentage: number;
  timeSpentSeconds: number;
  accuracy: number;
}

// ── Dashboard ──
export interface UserDashboard {
  overview: {
    examsTaken: number;
    averageScore: number;
    bestScore: number;
    accuracy: number;
    completedTopics: number;
    totalTopics: number;
    currentStreak: number;
  };
  answerBreakdown: { correct: number; incorrect: number; unanswered: number };
  performanceOverTime: { attemptId: string; date: string; examTitle: string; percentage: number }[];
  subjectPerformance: {
    subjectName: string;
    correct: number;
    incorrect: number;
    unanswered: number;
    accuracy: number;
  }[];
  topicProgress: {
    subjectId: string;
    subjectSlug: string;
    subjectName: string;
    completed: number;
    total: number;
  }[];
  weakTopics: {
    topicId: string;
    topicName: string;
    subjectName: string;
    correct: number;
    answered: number;
    accuracy: number;
    /** Null when the topic is no longer published. */
    topicSlug: string | null;
    subjectSlug: string | null;
  }[];
  recentAttempts: {
    id: string;
    examTitle: string;
    submittedAt: string;
    percentage: number;
    obtainedMarks: number;
    totalMarks: number;
  }[];
}

export interface AdminOverview {
  counts: {
    users: number;
    newUsers: number;
    runningCirculars: number;
    circulars: number;
    subjects: number;
    topics: number;
    notes: number;
    questions: number;
    publishedQuestions: number;
    exams: number;
    attemptsToday: number;
    premiumUsers: number;
  };
  recentUsers: { id: string; fullName: string; email: string; createdAt: string }[];
}

// ── Premium ──
export interface PremiumPlan {
  id: string;
  code: string;
  name: string;
  description: string | null;
  priceBdt: number;
  durationDays: number | null;
}

export interface Entitlement {
  id: string;
  userId: string;
  planId: string | null;
  source: 'ADMIN_GRANT' | 'PURCHASE';
  startsAt: string;
  expiresAt: string | null;
  revokedAt: string | null;
  note: string | null;
  createdAt: string;
  status: EntitlementStatus;
  plan: { id: string; name: string; code: string } | null;
  user: { id: string; fullName: string; email: string };
  grantedBy: { id: string; fullName: string } | null;
}

export interface MyPremiumAccess {
  hasPremium: boolean;
  activeUntil: string | null;
  entitlements: Entitlement[];
}

// ── Admin resources ──
export interface AdminSubject extends Omit<SubjectSummary, 'completedCount'> {
  questionCount: number;
}

export interface AdminTopicRow {
  id: string;
  subjectId: string;
  parentId: string | null;
  slug: string;
  title: string;
  description: string | null;
  accessLevel: AccessLevel;
  isPublished: boolean;
  order: number;
  updatedAt: string;
  subject: { id: string; name: string };
  parent: { id: string; title: string } | null;
  _count: { notes: number; questions: number; children: number };
}

export interface AdminTopic {
  id: string;
  subjectId: string;
  parentId: string | null;
  slug: string;
  title: string;
  description: string | null;
  content: string | null;
  accessLevel: AccessLevel;
  isPublished: boolean;
  order: number;
  subject: { id: string; name: string; slug: string };
}

export interface TopicOption {
  id: string;
  title: string;
  subjectId: string;
  parentId: string | null;
}

export interface AdminNoteRow {
  id: string;
  topicId: string;
  title: string;
  summary: string | null;
  accessLevel: AccessLevel;
  isPublished: boolean;
  order: number;
  updatedAt: string;
  topic: { id: string; title: string; subject: { id: string; name: string } };
  _count: { attachments: number };
}

export interface AdminNote {
  id: string;
  topicId: string;
  title: string;
  summary: string | null;
  content: string;
  accessLevel: AccessLevel;
  isPublished: boolean;
  order: number;
  topic: { id: string; title: string; subjectId: string };
  attachments: (Attachment & { fileName: string })[];
}

export interface QuestionOption {
  id: string;
  text: string;
  textBn: string | null;
  isCorrect: boolean;
  order: number;
}

export interface AdminQuestion {
  id: string;
  subjectId: string;
  topicId: string | null;
  text: string;
  textBn: string | null;
  difficulty: Difficulty;
  explanation: string;
  reference: string | null;
  accessLevel: AccessLevel;
  isPublished: boolean;
  createdAt: string;
  subject: { id: string; name: string };
  topic: { id: string; title: string } | null;
  options: QuestionOption[];
  _count?: { examQuestions: number };
}

export interface CsvImportResult {
  imported: number;
  errors: { row: number; message: string }[];
}

export interface ExamSettings {
  questionCount: number;
  durationMinutes: number;
  marksPerQuestion: number;
  negativeMarking: number;
  allowMultipleAttempts: boolean;
  autoGenerateDaily: boolean;
}

export interface AdminExamRow {
  id: string;
  title: string;
  description: string | null;
  type: ExamType;
  examDate: string;
  durationMinutes: number;
  marksPerQuestion: number;
  negativeMarking: number;
  allowMultipleAttempts: boolean;
  accessLevel: AccessLevel;
  isPublished: boolean;
  autoGeneratedFor: string | null;
  createdAt: string;
  updatedAt: string;
  questionCount: number;
  attemptCount: number;
}

export interface AdminExam extends Omit<AdminExamRow, 'questionCount'> {
  questions: AdminQuestion[];
}
