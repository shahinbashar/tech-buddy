import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

const MARKDOWN_COMPONENTS: Components = {
  // Wide tables scroll inside the note instead of widening the page on phones.
  table: ({ node: _node, ...props }) => (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  ),
};

/**
 * Renders admin-authored Markdown. Raw HTML is not rendered (react-markdown default),
 * which keeps notes safe from script injection.
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
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={MARKDOWN_COMPONENTS}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
