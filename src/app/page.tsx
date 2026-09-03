import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { ButtonLink, Callout, SectionHeader } from '@/components/ui';
import { CoastTracker } from '@/components/CoastTracker';
import { ArticleCard, EventCard } from '@/components/cards';
import { NewsletterForm } from '@/components/NewsletterForm';
import { events, sortByDate } from '@/data/events';
import { sortedArticles } from '@/data/articles';
import {
  coastSegments,
  plannedRegions,
  totalCoastMiles,
} from '@/data/coast-segments';
import { totalTips } from '@/data/segment-tips';
import { siteConfig } from '@/config/site';

const segmentCount = coastSegments.length;
const roundedMiles = Math.round(totalCoastMiles);

export const metadata: Metadata = {
  title: `${siteConfig.name} — track every mile of England’s coast you’ve run`,
  description: `Tick off the coast path segment by segment. ${segmentCount} point-to-point segments and ${roundedMiles} miles in Cornwall to start, with the rest of England to follow. Plus coastal races, club runs and honest writing.`,
  alternates: { canonical: '/' },
};

const upcoming = sortByDate(events.filter((event) => event.featured)).slice(0, 3);
const latestArticles = sortedArticles().slice(0, 3);

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/brand/hero-coast-path-runner.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
        </div>

        <Container width="wide">
          <div className="relative py-20 sm:py-24 lg:py-28">
            <p className="label text-red">
              {roundedMiles} miles in Cornwall · the rest of England to come
            </p>

            <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.94]">
              Run it.
              <br />
              Track it.
              <br />
              <span className="text-red">Complete it.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/85 sm:text-xl">
              Cornwall’s coast path, divided into {segmentCount} segments.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-paper/85 sm:text-xl">
              Complete them in your own time or find a coastal event that
              helps you tick off part of the route. Track every segment and
              watch your map fill in: {roundedMiles} miles of Cornwall to
              start, with the rest of England to follow.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/coast" size="lg">
                Start tracking your coast
              </ButtonLink>
              <ButtonLink href="/events" variant="secondary" size="lg">
                Find an event
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------- The main feature */}
      <section className="border-b border-line py-16 sm:py-20">
        <Container width="default">
          <SectionHeader
            eyebrow="The coast tracker"
            title="How much of it have you run?"
            intro={`${segmentCount} point-to-point segments, from the Devon border round Land’s End to the Tamar. Mostly half days, a few full ones, all starting and ending somewhere with parking and a bus.`}
            action={{ label: 'Open the tracker', href: '/coast' }}
          />

          <CoastTracker compact />

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-lg text-red-bright">Tick it off</h3>
              <p className="mt-3 text-sm leading-relaxed text-mute">
                Every segment is a real outing you can run in a morning or a day.
                Mark them as you go and the strip above fills in.
              </p>
            </div>
            <div>
              <h3 className="text-lg text-red-bright">Share your thoughts</h3>
              <p className="mt-3 text-sm leading-relaxed text-mute">
                Where to park, which crossing works at which tide, what the
                ground is really like. {totalTips} so far and every one read by a
                human before it goes up.
              </p>
            </div>
            <div>
              <h3 className="text-lg text-red-bright">Then the rest of England</h3>
              <p className="mt-3 text-sm leading-relaxed text-mute">
                Cornwall first because that is what we know. {plannedRegions.length}{' '}
                more regions to come, all the way round to the Tamar and beyond.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------- Newsletter */}
      <section className="border-b border-line bg-ink-800">
        <Container width="wide">
          <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="label text-red">Take part properly</span>
              <h2 className="mt-5 text-4xl sm:text-5xl">
                Join in, and your coast comes with you.
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-mute">
                The tracker works right now with no account at all — but your
                ticks live in this browser only. Put your name down and you get
                an account the moment they exist, so your progress follows you
                between your phone and your laptop, and you can see what your
                mates have run.
              </p>
              <div className="mt-8">
                <Callout title="What you are signing up for">
                  <p>
                    First in line for accounts and friends on the tracker, one
                    email a month or so with new segments and routes, and nothing
                    else. Unsubscribe in one click.
                  </p>
                </Callout>
              </div>
            </div>
            <div className="border border-line bg-ink p-6 sm:p-8">
              <NewsletterForm />
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------- Everyone welcome */}
      <section className="bg-paper py-20 text-ink">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="label text-red-deep">Who this is for</span>
              <h2 className="mt-5 text-4xl sm:text-5xl">
                Four miles count just as much as forty.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute-dark">
                Whether you run, walk or do a bit of both, every mile along
                the Cornish coast counts. Choose a section, track the ground
                you have covered and gradually join the whole route
                together, at your own pace and in your own time.
              </p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-mute-dark">
                Explore coastal races and events, discover new routes and,
                coming soon, find practical tips and recommendations from
                the people and businesses that know the coast best.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/coast" variant="onPaper">
                  Explore the coast
                </ButtonLink>
                <Link
                  href="/stories/first-coast-path-run-nine-things"
                  className="label self-center text-red-deep hover:text-ink"
                >
                  Find your first segment →
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: 'New to the coast path?',
                  body: 'Start with a manageable section and build from there. We will help you find your first route.',
                },
                {
                  title: 'Road runner, coast curious?',
                  body: 'Forget your usual pace. On the coast, elevation, terrain and the view matter far more than the clock.',
                },
                {
                  title: 'Chasing something big?',
                  body: 'Take on all 45 segments and 294 miles, tracking your progress as you work your way around the Cornish coast.',
                },
                {
                  title: 'Looking for your next challenge?',
                  body: 'Discover races, organised runs and other events taking place along the coast.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border border-paper-line bg-paper-dim p-5"
                >
                  <h3 className="text-base">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mute-dark">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ Events */}
      <section className="py-20">
        <Container width="wide">
          <SectionHeader
            eyebrow="Coming up"
            title="Coastal events"
            intro="Races and ultras on the English coast. Three Cornish classics to start, each checked against the organiser’s own page — always confirm the details before you enter."
            action={{ label: 'All events', href: '/events' }}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------- Editorial */}
      <section className="border-t border-line py-20">
        <Container width="wide">
          <SectionHeader
            eyebrow="Stories & gear"
            title="Reading for the drive home"
            intro="Route guides, race reports, beginner advice and kit reviews written by people who paid for the kit."
            action={{ label: 'All stories', href: '/stories' }}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
