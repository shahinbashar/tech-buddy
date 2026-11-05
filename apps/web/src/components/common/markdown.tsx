import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Mindmap } from '@/components/common/mindmap';
import { remarkSolutionFold } from '@/lib/remark-solution-fold';
import { cn } from '@/lib/utils';

/** The text of a ```mindmap fenced block, if `node` is one (hast <pre><code class="language-mindmap">). */
function mindmapSource(node: unknown): string | null {
  const code = (node as { children?: unknown[] } | undefined)?.children?.[0] as
    | { tagName?: string; properties?: { className?: unknown }; children?: { value?: string }[] }
    | undefined;
  const classes = code?.properties?.className;
  if (code?.tagName !== 'code' || !Array.isArray(classes) || !classes.includes('language-mindmap'))
    return null;
  return (code.children ?? []).map((child) => child.value ?? '').join('');
}

const MARKDOWN_COMPONENTS: Components = {
  // ```mindmap outlines become a visual map; other code blocks render as usual.
  pre: ({ node, ...props }) => {
    const source = mindmapSource(node);
    return source !== null ? <Mindmap source={source} /> : <pre {...props} />;
  },
  // Wide tables scroll inside the note instead of widening the page on phones.
  table: ({ node: _node, ...props }) => (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  ),
};

/**
 * Renders admin-authored and imported Markdown. Raw HTML is not rendered (react-markdown
 * default), which keeps notes safe from script injection. Supports the Learning notes'
 * ```mindmap blocks and `#### Solution` folds.
 */
export function Markdown({ content, className }: { content: string; className?: string }) {
  return (
    <div
      className={cn(
        // Code styling lives in globals.css (.markdown): inline chips vs dark code blocks.
        'markdown prose prose-slate max-w-none prose-headings:scroll-mt-20 prose-headings:font-semibold prose-a:text-primary prose-table:text-sm',
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkSolutionFold]}
        components={MARKDOWN_COMPONENTS}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
