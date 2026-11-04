interface TreeNode {
  id: string;
  parentId: string | null;
}

/**
 * Flattens topics into reading order: each root followed by its subtopics.
 * Input order is preserved within each level. Subtopics whose parent is not in the
 * list (e.g. an unpublished parent) are dropped, so they are never shown or counted.
 */
export function flattenTopicTree<T extends TreeNode>(topics: readonly T[]): T[] {
  const childrenOf = new Map<string, T[]>();
  for (const topic of topics) {
    if (!topic.parentId) continue;
    const siblings = childrenOf.get(topic.parentId) ?? [];
    siblings.push(topic);
    childrenOf.set(topic.parentId, siblings);
  }
  return topics
    .filter((t) => !t.parentId)
    .flatMap((root) => [root, ...(childrenOf.get(root.id) ?? [])]);
}

/** Groups topics into roots with their `children`, using the same visibility rules. */
export function buildTopicTree<T extends TreeNode>(
  topics: readonly T[],
): (T & { children: T[] })[] {
  return topics
    .filter((t) => !t.parentId)
    .map((root) => ({ ...root, children: topics.filter((t) => t.parentId === root.id) }));
}
