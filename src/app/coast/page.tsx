import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { CoastTracker } from '@/components/CoastTracker';
import { Callout } from '@/components/ui';
import {
  coastSegments,
  plannedRegions,
  totalCoastMiles,
} from '@/data/coast-segments';
import { siteConfig } from '@/config/site';

const segmentCount = coastSegments.length;
const roundedMiles = Math.round(totalCoastMiles);

export const metadata: Metadata = {
  title: 'Track the Cornish coast, segment by segment',
  description: `Tick off the South West Coast Path in Cornwall one point-to-point segment at a time — ${segmentCount} segments and about ${roundedMiles} miles, from the Devon border at Marsland Mouth round Land’s End to the Tamar. A mixture of half days and full days.`,
  alternates: { canonical: '/coast' },
  openGraph: {
    title: `Track the Cornish coast | ${siteConfig.titleSuffix}`,
    description: `${segmentCount} point-to-point segments, about ${roundedMiles} miles. Tick them off as you run them.`,
    url: '/coast',
  },
};

export default function CoastPage() {
  return (
    <>
      <PageHeader
        eyebrow="Early prototype"
        title="Run the whole thing, a bit at a time"
        intro={`The Cornish coast path broken into ${segmentCount} point-to-point segments — about ${roundedMiles} miles from the Devon border at Marsland Mouth, round Land’s End, to the Tamar. Mostly half days, a few full ones. Tick them off as you run them.`}
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
              <h2 className="text-2xl">Tips beat ratings</h2>
              <p className="measure mt-4 text-base leading-relaxed text-mute">
                Every segment has its own page, and the useful thing on it is the
                tips — where to park, which crossing works at which tide, what
                the ground is actually like. One good tip helps everyone who
                reads it. A single rating helps nobody until there are fifty of
                them, which is why tips are here now and ratings are waiting for
                accounts.
              </p>
              <p className="measure mt-4 text-base leading-relaxed text-mute">
                If you have run a segment, you know something the next person
                does not. Open its page and send it over — every tip is read by
                a person before it goes up.
              </p>
            </div>

            <div>
              <h2 className="text-2xl">Where the segments come from</h2>
              <p className="measure mt-4 text-base leading-relaxed text-mute">
                The backbone is the South West Coast Path Association’s own stage
                list for the National Trail, trimmed to the Cornish portion.
                Their stages are walking days of nine to fourteen miles. Most are
                split once more, at a real intermediate place with parking and
                usually a bus, to give something you can run in a morning.
              </p>
              <p className="measure mt-4 text-base leading-relaxed text-mute">
                The ones left whole are left whole for a reason — the remote
                stretch down from the Devon border has no sensible way off it in
                the middle, and the Helford crossing depends on a seasonal ferry.
                That is where the mixture of half days and full days comes from:
                the ground decided it, not us.
              </p>
              <p className="measure mt-4 text-base leading-relaxed text-mute">
                Anything marked <span className="font-mono">approx</span> is our
                estimate of where a stage divides. Each pair still adds up to the
                Association’s published distance, so the totals stay honest even
                where the split is a judgement call. Once we have the real route
                geometry, those become exact.
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
                  `The rest of England, region by region — ${plannedRegions.length} to go, Devon and the Jurassic Coast first.`,
                  'Accounts, so your progress follows you between your phone and your laptop.',
                  'Friends — see what the people you run with have covered, and how much your lot have done between you.',
                  'Ratings and reviews on each segment, once there are enough people for a rating to mean anything.',
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
                Want an account, and your friends on here?{' '}
                <Link
                  href="/newsletter"
                  className="text-red-bright underline underline-offset-4 hover:text-paper"
                >
                  Put your name down
                </Link>{' '}
                — it is the only way we will know it is worth building, and you
                get first go at it.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
