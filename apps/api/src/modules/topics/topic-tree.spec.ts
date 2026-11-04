import { buildTopicTree, flattenTopicTree } from './topic-tree';

const topics = [
  { id: 'a', parentId: null },
  { id: 'a1', parentId: 'a' },
  { id: 'b', parentId: null },
  { id: 'orphan', parentId: 'hidden-parent' },
  { id: 'a2', parentId: 'a' },
];

describe('topic tree', () => {
  it('flattens roots followed by their subtopics and drops orphans', () => {
    expect(flattenTopicTree(topics).map((t) => t.id)).toEqual(['a', 'a1', 'a2', 'b']);
  });

  it('builds nested roots with children', () => {
    expect(buildTopicTree(topics).map((t) => [t.id, t.children.map((c) => c.id)])).toEqual([
      ['a', ['a1', 'a2']],
      ['b', []],
    ]);
  });
});
