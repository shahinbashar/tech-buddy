import type {
  CircularCategory,
  Difficulty,
  EmploymentType,
  ExamType,
  JobType,
  PreparationGoal,
  SubjectCategory,
} from '@/types/api';

export const APP_NAME = 'Tech Buddy';
export const APP_TAGLINE = 'Bangladesh job preparation & career portal';
export const AUTH_COOKIE_NAME = 'tb_access_token';
export const CONTACT_EMAIL = 'support@techbuddy.example';

export const CIRCULAR_CATEGORY_LABELS: Record<CircularCategory, string> = {
  IT: 'IT / Computer',
  BANK: 'Bank',
  EDUCATION: 'Education',
  HEALTH: 'Health',
  ENGINEERING: 'Engineering',
  ADMINISTRATION: 'Administration',
  DEFENSE: 'Defense',
  OTHER: 'Other',
};

export const JOB_TYPE_LABELS: Record<JobType, string> = {
  GOVERNMENT: 'Government',
  PRIVATE: 'Private',
};

export const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  FULL_TIME: 'Full-time',
  PART_TIME: 'Part-time',
  CONTRACT: 'Contract',
  INTERNSHIP: 'Internship',
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
};

export const SUBJECT_CATEGORY_LABELS: Record<SubjectCategory, string> = {
  GENERAL: 'General',
  TECHNICAL: 'Technical',
};

export const PREPARATION_GOALS: { value: PreparationGoal; label: string; description: string }[] = [
  {
    value: 'GOVERNMENT_IT',
    label: 'Government IT jobs',
    description: 'Assistant Programmer, Programmer, Computer Operator and similar posts.',
  },
  {
    value: 'BCS',
    label: 'BCS',
    description: 'Bangladesh Civil Service preliminary and written exams.',
  },
  {
    value: 'BANK',
    label: 'Bank jobs',
    description: 'Bangladesh Bank and state-owned bank recruitment (incl. IT).',
  },
  {
    value: 'OTHER_GOVERNMENT',
    label: 'Other government jobs',
    description: 'Ministries, directorates and autonomous bodies.',
  },
  {
    value: 'PRIVATE_SECTOR',
    label: 'Private sector',
    description: 'Private company recruitment tests and interviews.',
  },
];

export const PREPARATION_GOAL_LABELS = Object.fromEntries(
  PREPARATION_GOALS.map((g) => [g.value, g.label]),
) as Record<PreparationGoal, string>;

export const PAGE_SIZE = 12;

export const ACCESS_LEVEL_OPTIONS = [
  { value: 'FREE', label: 'Free' },
  { value: 'PREMIUM', label: 'Premium' },
];

export const DIFFICULTY_OPTIONS = Object.entries(DIFFICULTY_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export const EXAM_TYPE_LABELS: Record<ExamType, string> = {
  DAILY: 'Daily exam',
  MODEL: 'Model test',
  PRACTICE: 'Practice',
};
