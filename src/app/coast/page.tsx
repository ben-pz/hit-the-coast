import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { CoastTracker } from '@/components/CoastTracker';
import { Callout } from '@/components/ui';
import { coastSegments, totalCoastMiles } from '@/data/coast-segments';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Track the Cornish coast, segment by segment',
  description:
    'Tick off the South West Coast Path in Cornwall one point-to-point segment at a time — 26 segments and about 295 miles, from the Devon border at Marsland Mouth round Land’s End to the Tamar.',
  alternates: { canonical: '/coast' },
  openGraph: {
    title: `Track the Cornish coast | ${siteConfig.titleSuffix}`,
    description:
      'Twenty-six point-to-point segments, about 295 miles. Tick them off as you run them.',
    url: '/coast',
  },
};

export default function CoastPage() {
  return (
    <>
      <PageHeader
        eyebrow="Early prototype"
        title="Run the whole thing, a bit at a time"
        intro={`The Cornish coast path broken into ${coastSegments.length} point-to-point segments — about ${Math.round(totalCoastMiles)} miles from the Devon border at Marsland Mouth, round Land’s End, to the Tamar. Tick them off as you run them.`}
      />

      <section className="py-12 sm:py-16">
        <Container width="default">
          <div className="mb-10">
            <Callout title="What this is, and what it is not yet">
              <p>
                This is a first sketch of something bigger: a proper record of
                which parts of England’s coast you have run. Right now it is
                deliberately simple — no account, no login, no proof required.
                You tick a segment, we believe you.
              </p>
              <p>
                <strong className="text-paper">
                  Your ticks are saved in this browser only.
                </strong>{' '}
                They will not follow you to your phone, and clearing your browser
                data will clear them. That is the trade for having no accounts
                yet. If enough people use this, the next version gets accounts
                and verified GPX uploads.
              </p>
            </Callout>
          </div>

          <CoastTracker />

          <div className="mt-16 space-y-10 border-t border-line pt-12">
            <div>
              <h2 className="text-2xl">Where the segments come from</h2>
              <p className="measure mt-4 text-base leading-relaxed text-mute">
                The boundaries and distances follow the South West Coast Path
                Association’s own stage list for the National Trail, trimmed to
                the Cornish portion. Using a published list rather than inventing
                our own means every segment starts and ends somewhere real, with
                parking, a bus and usually a pub — and if you have already walked
                the Trail, your history maps straight onto it.
              </p>
              <p className="measure mt-4 text-base leading-relaxed text-mute">
                Two segments are marked <span className="font-mono">approx</span>
                : the first and last, where the official stage either side
                straddles the county border and the Association does not publish
                the split. Everything else is their published mileage.
              </p>
            </div>

            <div>
              <h2 className="text-2xl">Why there are no times</h2>
              <p className="measure mt-4 text-base leading-relaxed text-mute">
                Most of this coast is unfenced cliff path. A fastest-time board
                on ground like that rewards running it hard in bad light and bad
                weather, which is the opposite of what we want this site to
                encourage. If timing arrives, it will be on a small set of
                genuinely safe segments — hard surfaces, no cliff edge, nothing
                tidal — chosen one at a time by people who know the ground.
              </p>
              <p className="measure mt-4 text-base leading-relaxed text-mute">
                Covering the whole coast is the interesting challenge anyway. It
                takes most people years.
              </p>
            </div>

            <div>
              <h2 className="text-2xl">Coming next, roughly in this order</h2>
              <ul className="measure mt-4 space-y-3">
                {[
                  'The rest of England, region by region — Devon and the Jurassic Coast first.',
                  'Accounts, so your progress follows you between your phone and your laptop.',
                  'GPX upload, so a segment can be marked verified rather than just ticked.',
                  'Leaderboards by distance covered and regions completed. Never by speed.',
                  'A real map, replacing the strip at the top of this page.',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-red"
                    />
                    <span className="text-mute">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-mute">
                If you want this to exist,{' '}
                <a
                  href="/newsletter"
                  className="text-red-bright underline underline-offset-4 hover:text-paper"
                >
                  join the list
                </a>{' '}
                — that is how we will know it is worth building.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
