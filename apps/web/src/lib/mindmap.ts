/** Parses a Learning ```mindmap block: an outline indented 2 spaces per level, root first. */

export interface MindmapNode {
  label: string;
  children: MindmapNode[];
}

export function parseMindmap(source: string): MindmapNode | null {
  const lines = source.split('\n').filter((line) => line.trim());
  if (!lines.length) return null;

  const root: MindmapNode = { label: lines[0].trim(), children: [] };
  // stack[level] = the last node seen at that depth (root is level 0).
  const stack: MindmapNode[] = [root];
  for (const line of lines.slice(1)) {
    const indent = line.length - line.trimStart().length;
    const level = Math.max(1, Math.floor(indent / 2));
    const node: MindmapNode = { label: line.trim(), children: [] };
    // Attach to the nearest shallower node (tolerates skipped levels).
    const parent = stack[Math.min(level - 1, stack.length - 1)];
    parent.children.push(node);
    stack[level] = node;
    stack.length = level + 1;
  }
  return root;
}
