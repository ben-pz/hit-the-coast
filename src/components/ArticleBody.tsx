import type { ArticleBlock } from '@/data/articles';
import { Callout } from './ui';

/**
 * Renders the structured article body.
 *
 * Content is typed data rather than MDX so it can move to a CMS without a
 * rewrite — swap the source of `blocks` and this component is unchanged.
 */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="measure space-y-6">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        switch (block.type) {
          case 'heading':
            return (
              <h2 key={key} className="pt-6 text-2xl sm:text-3xl">
                {block.text}
              </h2>
            );

          case 'paragraph':
            return (
              <p
                key={key}
                className="text-lg leading-relaxed text-paper/90"
              >
                {block.text}
              </p>
            );

          case 'list':
            return (
              <ul key={key} className="space-y-3">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-red"
                    />
                    <span className="text-lg leading-relaxed text-paper/90">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            );

          case 'quote':
            return (
              <blockquote
                key={key}
                className="border-l-2 border-red py-2 pl-6 font-display text-2xl font-bold leading-snug sm:text-3xl"
              >
                <p>“{block.text}”</p>
                {block.attribution ? (
                  <footer className="label mt-4 text-mute">
                    {block.attribution}
                  </footer>
                ) : null}
              </blockquote>
            );

          case 'note':
            return (
              <Callout key={key} title={block.title}>
                <p>{block.text}</p>
              </Callout>
            );

          case 'product':
            return (
              <div key={key} className="border border-line bg-ink-800 p-5">
                <h3 className="text-xl">{block.name}</h3>
                <p className="mt-3 text-base leading-relaxed text-paper/90">
                  {block.verdict}
                </p>
                <dl className="mt-5 grid gap-4 border-t border-line pt-4 sm:grid-cols-2">
                  <div>
                    <dt className="label text-mute">Best for</dt>
                    <dd className="mt-1 text-sm">{block.bestFor}</dd>
                  </div>
                  <div>
                    <dt className="label text-mute">Watch out</dt>
                    <dd className="mt-1 text-sm">{block.watchOut}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-xs text-mute">
                  No purchase link yet. When we add one it will be labelled, and
                  any affiliate relationship will be disclosed at the top of the
                  article.
                </p>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
