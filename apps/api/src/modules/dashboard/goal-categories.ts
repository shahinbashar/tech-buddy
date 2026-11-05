import { type CircularCategory, type PreparationGoal } from '@prisma/client';

/**
 * Circular categories that match each preparation goal, used to recommend circulars.
 * `null` means every category is relevant (no goal yet, or private-sector candidates who
 * still watch government posts).
 */
const GOAL_CATEGORIES: Record<PreparationGoal, CircularCategory[] | null> = {
  GOVERNMENT_IT: ['IT', 'ENGINEERING'],
  BCS: ['ADMINISTRATION', 'EDUCATION', 'HEALTH'],
  BANK: ['BANK'],
  OTHER_GOVERNMENT: ['ADMINISTRATION', 'EDUCATION', 'HEALTH', 'ENGINEERING', 'DEFENSE', 'OTHER'],
  PRIVATE_SECTOR: null,
};

export function categoriesForGoal(goal: PreparationGoal | null): CircularCategory[] | null {
  return goal ? GOAL_CATEGORIES[goal] : null;
}
