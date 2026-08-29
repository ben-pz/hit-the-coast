import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { ArticleBody } from '@/components/ArticleBody';
import { ArticleCard } from '@/components/cards';
import { NewsletterForm } from '@/components/NewsletterForm';
import { Tag } from '@/components/ui';
import { articles, getArticle } from '@/data/articles';
import { formatLongDate } from '@/lib/format';
import { siteConfig } from '@/config/site';

type Props = { params: Promise<{ slug: string }> };

/**
 * All content is known at build time, so any slug outside generateStaticParams
 * is a 404 rather than an on-demand render. Remove this if content ever starts
 * arriving from a CMS after the build.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) return { title: 'Article not found' };

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/stories/${article.slug}` },
    openGraph: {
      type: 'article',
      title: `${article.title} | ${siteConfig.titleSuffix}`,
      description: article.excerpt,
      url: `/stories/${article.slug}`,
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const related = articles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <article>
        <header className="border-b border-line">
          <Container width="default">
            <div className="py-16 sm:py-20">
              <nav aria-label="Breadcrumb" className="label text-mute">
                <Link href="/stories" className="hover:text-red-bright">
                  Stories &amp; gear
                </Link>
                <span aria-hidden="true"> / </span>
                <span className="text-paper">{article.category}</span>
              </nav>

              <h1 className="mt-5 max-w-4xl text-[clamp(2rem,5.5vw,3.75rem)]">
                {article.title}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mute">
                {article.excerpt}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
                <Tag tone="red">{article.category}</Tag>
                <span className="label text-mute">
                  {article.author} · {formatLongDate(article.date)} ·{' '}
                  {article.readingMinutes} min read
                </span>
              </div>
            </div>
          </Container>
        </header>

        <Container width="default">
          <div className="relative mt-12 aspect-[2/1] overflow-hidden border border-line">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 1000px, 100vw"
              className="object-cover"
            />
          </div>

          {article.containsAffiliateLinks ? (
            <p className="mt-8 border-l-2 border-red bg-ink-800 p-4 text-sm leading-relaxed text-mute">
              <strong className="text-paper">Affiliate disclosure:</strong> this
              article contains affiliate links. If you buy through one we may
              earn a commission, at no extra cost to you. It does not change what
              we say about the kit.
            </p>
          ) : null}

          <div className="py-12 sm:py-16">
            <ArticleBody blocks={article.body} />
          </div>
        </Container>
      </article>

      <section className="border-t border-line bg-ink-800">
        <Container width="default">
          <div className="grid gap-10 py-16 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-3xl">Get the next one by email</h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-mute">
                One email a month or so. New coastal events, routes worth the
                drive, and the odd honest kit review.
              </p>
            </div>
            <div className="border border-line bg-ink p-6">
              <NewsletterForm />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container width="wide">
          <h2 className="mb-8 text-3xl">More from the club</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
