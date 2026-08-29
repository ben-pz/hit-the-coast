import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { ResponsibleRunning } from '@/components/ResponsibleRunning';
import { SegmentTick } from '@/components/SegmentTick';
import { ButtonLink, Callout, DataList, SampleBadge, Tag } from '@/components/ui';
import {
  coastSegments,
  getSegment,
  isHalfDay,
  neighbours,
  siblingSegment,
} from '@/data/coast-segments';
import { tipsForSegment } from '@/data/segment-tips';
import { siteConfig } from '@/config/site';

type Props = { params: Promise<{ segment: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return coastSegments.map((segment) => ({ segment: segment.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segment: id } = await params;
  const segment = getSegment(id);

  if (!segment) return { title: 'Segment not found' };

  const title = `${segment.name} — ${segment.distanceMiles} miles of the Cornish coast path`;

  return {
    title,
    description: `${segment.name}: ${segment.distanceMiles} miles on the South West Coast Path in ${segment.area}. Tips, distance and what to know before you run it.`,
    alternates: { canonical: `/coast/${segment.id}` },
    openGraph: {
      title: `${title} | ${siteConfig.titleSuffix}`,
      description:
        segment.note ??
        `${segment.distanceMiles} miles on the coast path in ${segment.area}.`,
      url: `/coast/${segment.id}`,
      type: 'article',
    },
  };
}

export default async function SegmentPage({ params }: Props) {
  const { segment: id } = await params;
  const segment = getSegment(id);

  if (!segment) notFound();

  const tips = tipsForSegment(segment.id);
  const { previous, next } = neighbours(segment.id);
  const sibling = siblingSegment(segment);
  const half = isHalfDay(segment);

  const tipSubject = `Tip for ${segment.name}`;
  const tipBody = [
    `Segment: ${segment.name}`,
    '',
    'My tip:',
    '',
    '',
    'What kind of tip is it? (parking / transport / tides / terrain / water & food / access / safety)',
    '',
    '',
    'Have you run this segment yourself?',
    '',
    '',
    'First name to credit it to:',
    '',
  ].join('\n');
  const tipMailto = `mailto:${siteConfig.email.general}?subject=${encodeURIComponent(
    tipSubject,
  )}&body=${encodeURIComponent(tipBody)}`;

  return (
    <>
      <section className="border-b border-line">
        <Container width="default">
          <div className="py-14 sm:py-16">
            <nav aria-label="Breadcrumb" className="label text-mute">
              <Link href="/coast" className="hover:text-red-bright">
                The coast
              </Link>
              <span aria-hidden="true"> / </span>
              <span className="text-paper">{segment.area}</span>
            </nav>

            <h1 className="mt-5 max-w-3xl text-[clamp(2rem,6vw,3.75rem)]">
              {segment.name}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Tag tone="red">{half ? 'Half day' : 'Full day'}</Tag>
              <Tag>{segment.distanceMiles} miles</Tag>
              <Tag tone="quiet">{segment.area}</Tag>
              {segment.distanceSource !== 'official' ? <SampleBadge label="Distance approx" /> : null}
            </div>

            {segment.note ? (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/85">
                {segment.note}
              </p>
            ) : null}

            <div className="mt-8">
              <SegmentTick segmentId={segment.id} segmentName={segment.name} />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container width="default">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            {/* ------------------------------------------------------- tips */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="text-3xl">
                  Tips {tips.length > 0 ? `(${tips.length})` : null}
                </h2>
                <a
                  href={tipMailto}
                  className="label text-red-bright hover:text-paper"
                >
                  Add a tip →
                </a>
              </div>

              <p className="measure mt-3 text-base leading-relaxed text-mute">
                The practical stuff that only comes from having been there. A
                good tip is worth more than any rating — where to park, which
                crossing works at which tide, what the ground is actually like.
              </p>

              {tips.length > 0 ? (
                <ul className="mt-8 space-y-5">
                  {tips.map((tip) => (
                    <li
                      key={tip.id}
                      className="border-l-2 border-line bg-ink-800 p-5 hover:border-l-red"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <Tag tone="red">{tip.category}</Tag>
                        {!tip.verified ? <SampleBadge /> : null}
                      </div>
                      <p className="mt-3 text-base leading-relaxed text-paper/90">
                        {tip.text}
                      </p>
                      <p className="mt-3 font-mono text-xs text-mute">
                        {tip.author}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-8 border border-dashed border-line p-8 text-center">
                  <p className="text-lg">No tips on this one yet.</p>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-mute">
                    If you have run it, you know something the next person does
                    not. It takes thirty seconds.
                  </p>
                  <div className="mt-5">
                    <ButtonLink href={tipMailto}>Add the first tip</ButtonLink>
                  </div>
                </div>
              )}

              <div className="mt-10">
                <Callout title="Ratings and reviews are coming, tips are not waiting">
                  <p>
                    A rating needs dozens of people before it means anything, and
                    both need accounts before they can exist. A tip is useful the
                    moment one person writes it, so tips are here first and are
                    read by a human before they go up.
                  </p>
                </Callout>
              </div>

              <div className="mt-10">
                <ResponsibleRunning />
              </div>
            </div>

            {/* ---------------------------------------------------- sidebar */}
            <aside className="space-y-8 lg:sticky lg:top-28">
              <div>
                <h2 className="label mb-4 text-red">The detail</h2>
                <DataList
                  items={[
                    { label: 'Start', value: segment.start },
                    { label: 'Finish', value: segment.end },
                    { label: 'Distance', value: `${segment.distanceMiles} miles` },
                    { label: 'Session', value: half ? 'Half day' : 'Full day' },
                    { label: 'Area', value: segment.area },
                  ]}
                />
              </div>

              {segment.distanceSource === 'split' ? (
                <div className="border border-line bg-ink-800 p-5">
                  <p className="label text-mute">Part of an official stage</p>
                  <p className="mt-2 text-sm leading-relaxed text-paper/85">
                    This is half of the coast path’s official{' '}
                    <span className="text-paper">{segment.officialStage}</span>{' '}
                    stage.
                    {sibling ? (
                      <>
                        {' '}
                        The other half is{' '}
                        <Link
                          href={`/coast/${sibling.id}`}
                          className="text-red-bright underline underline-offset-4"
                        >
                          {sibling.name}
                        </Link>
                        , {sibling.distanceMiles} miles — do both in one go for
                        the full stage.
                      </>
                    ) : null}
                  </p>
                </div>
              ) : null}

              <div className="space-y-3">
                {previous ? (
                  <Link
                    href={`/coast/${previous.id}`}
                    className="block border border-line p-4 hover:border-red/70"
                  >
                    <span className="label text-mute">← Before this</span>
                    <span className="mt-1 block font-display font-bold">
                      {previous.name}
                    </span>
                  </Link>
                ) : null}
                {next ? (
                  <Link
                    href={`/coast/${next.id}`}
                    className="block border border-line p-4 hover:border-red/70"
                  >
                    <span className="label text-mute">After this →</span>
                    <span className="mt-1 block font-display font-bold">
                      {next.name}
                    </span>
                  </Link>
                ) : null}
              </div>

              <ButtonLink href="/coast" variant="secondary" className="w-full">
                Back to the whole coast
              </ButtonLink>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
