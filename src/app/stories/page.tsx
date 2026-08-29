import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { ArticleCard } from '@/components/cards';
import { Callout, SectionHeader } from '@/components/ui';
import { articleCategories, sortedArticles } from '@/data/articles';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Stories, route guides and honest gear reviews',
  description:
    'Club stories, coastal route guides, race reports, beginner advice and honest running-equipment reviews from the PZX Wasters.',
  alternates: { canonical: '/stories' },
  openGraph: {
    title: `Stories & gear | ${siteConfig.titleSuffix}`,
    description:
      'Route guides, race reports, beginner advice and honest kit reviews from England’s coast.',
    url: '/stories',
  },
};

export default function StoriesPage() {
  const all = sortedArticles();
  const [lead, ...rest] = all;

  const byCategory = articleCategories
    .map((category) => ({
      category,
      count: all.filter((article) => article.category === category).length,
    }))
    .filter((group) => group.count > 0);

  return (
    <>
      <PageHeader
        eyebrow="Stories & gear"
        title="Writing about running the coast"
        intro="Club stories, route guides, race reports, advice for people starting out, and kit reviews written by people who paid for the kit and wore it out."
      >
        <ul className="flex flex-wrap gap-2">
          {byCategory.map((group) => (
            <li
              key={group.category}
              className="label border border-line px-3 py-1.5 text-mute"
            >
              {group.category}
              <span className="ml-2 text-red">{group.count}</span>
            </li>
          ))}
        </ul>
      </PageHeader>

      <section className="py-12 sm:py-16">
        <Container width="wide">
          <div className="mb-12">
            <Callout title="How we handle money and kit">
              <p>
                We do not take payment for positive reviews. Reviews are written
                about kit club members have actually used. When we eventually add
                affiliate links, they will be disclosed clearly at the top of the
                article and marked in the link itself — and there are none on the
                site today.
              </p>
            </Callout>
          </div>

          {lead ? (
            <>
              <SectionHeader eyebrow="Latest" title="Read this first" />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="sm:col-span-2 lg:col-span-2">
                  <ArticleCard article={lead} priority />
                </div>
                {rest[0] ? <ArticleCard article={rest[0]} /> : null}
              </div>
            </>
          ) : null}

          {rest.length > 1 ? (
            <div className="mt-20">
              <SectionHeader eyebrow="Everything else" title="More reading" />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.slice(1).map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </div>
          ) : null}
        </Container>
      </section>
    </>
  );
}
