/**
 * Remark plugin: everything after a `#### Solution` heading, up to the next heading of level
 * 1–4, is folded into a closed <details> ("Show solution"), so recall questions and practice
 * sets don't give their answers away. This mirrors the convention of the imported Learning
 * notes. Uses mdast `data.hName`, so no raw HTML is involved.
 */

interface MdNode {
  type: string;
  depth?: number;
  value?: string;
  children?: MdNode[];
  data?: Record<string, unknown>;
}

const SOLUTION = /^solution\b/i;

function textOf(node: MdNode): string {
  return node.value ?? (node.children ?? []).map(textOf).join('');
}

function isHeadingUpTo4(node: MdNode): boolean {
  return node.type === 'heading' && (node.depth ?? 7) <= 4;
}

function fold(parent: MdNode): void {
  const children = parent.children;
  if (!children) return;
  const result: MdNode[] = [];
  for (let i = 0; i < children.length; i++) {
    const node = children[i];
    const label = node.type === 'heading' && node.depth === 4 ? textOf(node).trim() : '';
    if (!SOLUTION.test(label)) {
      fold(node);
      result.push(node);
      continue;
    }
    const body: MdNode[] = [];
    let j = i + 1;
    while (j < children.length && !isHeadingUpTo4(children[j])) body.push(children[j++]);
    result.push({
      type: 'solutionFold',
      data: { hName: 'details', hProperties: { className: ['solution'] } },
      children: [
        {
          type: 'paragraph',
          data: { hName: 'summary' },
          children: [{ type: 'text', value: label === 'Solution' ? 'Show solution' : label }],
        },
        ...body,
      ],
    });
    i = j - 1;
  }
  parent.children = result;
}

export function remarkSolutionFold() {
  return (tree: MdNode) => fold(tree);
}
