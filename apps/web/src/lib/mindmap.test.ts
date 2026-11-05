import { describe, expect, it } from 'vitest';
import { parseMindmap } from './mindmap';

describe('parseMindmap', () => {
  it('builds a tree from a 2-space outline', () => {
    const tree = parseMindmap(
      [
        'OSI vs TCP/IP',
        '  **Why layers**',
        '    one job per layer',
        '  **OSI 7**',
        '    7 App',
      ].join('\n'),
    );
    expect(tree).toEqual({
      label: 'OSI vs TCP/IP',
      children: [
        { label: '**Why layers**', children: [{ label: 'one job per layer', children: [] }] },
        { label: '**OSI 7**', children: [{ label: '7 App', children: [] }] },
      ],
    });
  });

  it('tolerates skipped levels and blank lines', () => {
    const tree = parseMindmap('Root\n\n      deep leaf\n  branch');
    expect(tree?.children.map((c) => c.label)).toEqual(['deep leaf', 'branch']);
  });

  it('returns null for an empty block', () => {
    expect(parseMindmap('  \n ')).toBeNull();
  });
});
