'use client';

import { useEffect } from 'react';

const OPTION_KEYS: Record<string, number> = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  '1': 0,
  '2': 1,
  '3': 2,
  '4': 3,
};

interface ShortcutHandlers {
  optionCount: number;
  onSelect: (optionIndex: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}

/** A–D / 1–4 select an option; ←/→ move between questions. Ignored while typing or in dialogs. */
export function useExamShortcuts({ optionCount, onSelect, onPrevious, onNext }: ShortcutHandlers) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, [contenteditable="true"], [role="dialog"]'))
        return;

      const optionIndex = OPTION_KEYS[event.key.toLowerCase()];
      if (optionIndex !== undefined && optionIndex < optionCount) {
        event.preventDefault();
        onSelect(optionIndex);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNext();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onPrevious();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [optionCount, onSelect, onPrevious, onNext]);
}
