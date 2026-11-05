import { Network } from 'lucide-react';
import { Fragment } from 'react';
import { type MindmapNode, parseMindmap } from '@/lib/mindmap';

/** **bold** and `code` inside labels — the only inline marks mindmaps use. */
function InlineLabel({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : part.startsWith('`') ? (
          <code key={i} className="bg-muted rounded px-1 text-[0.9em]">
            {part.slice(1, -1)}
          </code>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

function Leaves({ nodes }: { nodes: MindmapNode[] }) {
  if (!nodes.length) return null;
  return (
    <ul className="border-border mt-1 space-y-1 border-l pl-3">
      {nodes.map((node, i) => (
        <li key={i} className="text-sm">
          <InlineLabel text={node.label} />
          <Leaves nodes={node.children} />
        </li>
      ))}
    </ul>
  );
}

/**
 * A topic on one screen: the root, then one card per branch with its leaves. Used for the
 * ```mindmap blocks in imported Learning notes; falls back to the raw text if it can't parse.
 */
export function Mindmap({ source }: { source: string }) {
  const root = parseMindmap(source);
  if (!root) return null;
  return (
    <figure className="not-prose my-6 space-y-3" aria-label={`Mindmap: ${root.label}`}>
      <figcaption className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold">
        <Network className="size-4" aria-hidden />
        <InlineLabel text={root.label} />
      </figcaption>
      <div className="grid gap-3 sm:grid-cols-2">
        {root.children.map((branch, i) => (
          <div key={i} className="bg-card rounded-lg border p-3">
            <p className="text-primary text-sm font-semibold">
              <InlineLabel text={branch.label} />
            </p>
            <Leaves nodes={branch.children} />
          </div>
        ))}
      </div>
    </figure>
  );
}
