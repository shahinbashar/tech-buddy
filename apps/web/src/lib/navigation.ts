import {
  BarChart3,
  Bookmark,
  BookOpen,
  BriefcaseBusiness,
  ClipboardList,
  Crown,
  FileQuestion,
  FileText,
  FolderTree,
  History,
  LayoutDashboard,
  Library,
  ListChecks,
  type LucideIcon,
  Settings,
  Users,
} from 'lucide-react';

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Match nested routes as active. */
  matchPrefix?: boolean;
}

export const PUBLIC_NAV: NavItem[] = [
  { href: '/circulars', label: 'Job Circulars', icon: BriefcaseBusiness, matchPrefix: true },
  { href: '/subjects', label: 'Study Notes', icon: BookOpen, matchPrefix: true },
  { href: '/exams', label: 'Daily Exam', icon: ClipboardList, matchPrefix: true },
  { href: '/premium', label: 'Premium', icon: Crown },
];

export const USER_NAV: NavItem[] = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/exams', label: 'Daily Exam', icon: ClipboardList, matchPrefix: true },
  { href: '/dashboard/history', label: 'Exam History', icon: History },
  { href: '/dashboard/progress', label: 'Learning Progress', icon: ListChecks },
  { href: '/dashboard/saved', label: 'Saved Circulars', icon: Bookmark },
  { href: '/dashboard/premium', label: 'Premium Content', icon: Crown },
  { href: '/profile', label: 'Profile', icon: Settings },
];

export const ADMIN_NAV: NavItem[] = [
  { href: '/admin', label: 'Overview', icon: BarChart3 },
  { href: '/admin/circulars', label: 'Circulars', icon: BriefcaseBusiness, matchPrefix: true },
  { href: '/admin/subjects', label: 'Subjects', icon: Library },
  { href: '/admin/topics', label: 'Topics', icon: FolderTree, matchPrefix: true },
  { href: '/admin/notes', label: 'Notes', icon: FileText, matchPrefix: true },
  { href: '/admin/questions', label: 'Questions', icon: FileQuestion, matchPrefix: true },
  { href: '/admin/exams', label: 'Daily Exams', icon: ClipboardList, matchPrefix: true },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/premium', label: 'Premium Access', icon: Crown },
];

export function isActivePath(pathname: string, item: NavItem): boolean {
  if (pathname === item.href) return true;
  return Boolean(item.matchPrefix) && pathname.startsWith(`${item.href}/`);
}
