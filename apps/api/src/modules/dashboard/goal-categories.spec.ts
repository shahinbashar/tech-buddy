import { PreparationGoal } from '@prisma/client';
import { categoriesForGoal } from './goal-categories';

describe('categoriesForGoal', () => {
  it('narrows circulars to the goal', () => {
    expect(categoriesForGoal('GOVERNMENT_IT')).toEqual(['IT', 'ENGINEERING']);
    expect(categoriesForGoal('BANK')).toEqual(['BANK']);
  });

  it('shows every category without a goal or for private-sector candidates', () => {
    expect(categoriesForGoal(null)).toBeNull();
    expect(categoriesForGoal('PRIVATE_SECTOR')).toBeNull();
  });

  it('covers every goal', () => {
    for (const goal of Object.values(PreparationGoal)) {
      expect(() => categoriesForGoal(goal)).not.toThrow();
    }
  });
});
