import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { ButtonLink, Callout, SectionHeader, Tag } from '@/components/ui';
import { ArticleCard, EventCard, RouteCard } from '@/components/cards';
import { NewsletterForm } from '@/components/NewsletterForm';
import { events, sortByDate } from '@/data/events';
import { featuredRoutes } from '@/data/routes';
import { sortedArticles } from '@/data/articles';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `${siteConfig.name} — coastal races, routes and club runs in England`,
  description: siteConfig.description,
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
            src="/images/brand/hero-coast-path-runner.svg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
          <div className="contours absolute inset-0 opacity-40" />
        </div>

        <Container width="wide">
          <div className="relative py-24 sm:py-32 lg:py-44">
            <p className="label text-red">
              Cornwall first · the whole English coast next
            </p>

            <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,9vw,6.5rem)] leading-[0.92]">
              Run the edge
              <br />
              of <span className="text-red">England.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/85 sm:text-xl">
              Coastal races, local run clubs, routes and stories — from first
              trail miles to full ultras. Built by the {siteConfig.clubName},
              who are still not entirely sure how this happened.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/events" size="lg">
                Find an event
              </ButtonLink>
              <ButtonLink href="/routes" variant="secondary" size="lg">
                Explore the routes
              </ButtonLink>
            </div>

            <dl className="mt-16 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-3">
              <div>
                <dt className="label text-mute">Coast Path length</dt>
                <dd className="mt-2 font-display text-2xl font-extrabold">
                  ~2,700 miles
                </dd>
              </div>
              <div>
                <dt className="label text-mute">Inaugurated</dt>
                <dd className="mt-2 font-display text-2xl font-extrabold">
                  March 2026
                </dd>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <dt className="label text-mute">Where we start</dt>
                <dd className="mt-2 font-display text-2xl font-extrabold">
                  Penwith, Cornwall
                </dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------- What this site is */}
      <section className="border-b border-line py-20">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <span className="label text-red">The short version</span>
              <h2 className="mt-5 text-3xl sm:text-4xl">
                One place for running England’s coast.
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-lg text-red-bright">Races and ultras</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">
                  Coastal trail races, road races and ultras, in one directory
                  you can actually filter — by region, distance and month.
                </p>
              </div>
              <div>
                <h3 className="text-lg text-red-bright">Club and social runs</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">
                  The friendly stuff. Weekly club runs, no-drop groups and
                  sunrise sociables, listed next to the big events rather than
                  hidden behind them.
                </p>
              </div>
              <div>
                <h3 className="text-lg text-red-bright">Routes and honesty</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">
                  Proper route notes: parking, water, what the ground is really
                  like, and where it gets serious. Plus kit reviews written by
                  people who wore the thing out.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------- Featured events */}
      <section className="py-20">
        <Container width="wide">
          <SectionHeader
            eyebrow="Coming up"
            title="Featured coastal events"
            intro="Races, ultras and club runs along the English coast. Sample entries for now — every listing is marked until we have confirmed it with the organiser."
            action={{ label: 'All events', href: '/events' }}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event, index) => (
              <EventCard key={event.id} event={event} priority={index === 0} />
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/events" variant="secondary">
              Browse and filter all events
            </ButtonLink>
            <ButtonLink href="/submit-event" variant="ghost">
              Submit an event
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------- Featured routes */}
      <section className="border-t border-line py-20">
        <Container width="wide">
          <SectionHeader
            eyebrow="Cornwall to start"
            title="Routes worth the drive"
            intro="Written by people who run them in February as well as August. Distances, ascent, parking, water — and where it stops being a nice jog."
            action={{ label: 'All routes', href: '/routes' }}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredRoutes.map((route, index) => (
              <RouteCard key={route.slug} route={route} priority={index === 0} />
            ))}
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
                Your first 5K on a cliff path counts just as much as your first
                100K.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute-dark">
                Coastal running has a reputation problem. It looks like it
                belongs to lean people in expensive vests who talk about vert.
                It does not. Most of us walk the steep bits, take photos, and
                stop for chips.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/stories/first-coast-path-run-nine-things" variant="onPaper">
                  Start here if you’re new
                </ButtonLink>
                <Link
                  href="/events"
                  className="label self-center text-red-deep hover:text-ink"
                >
                  Find a social run →
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: 'Never run off-road',
                  body: 'Start with a flat promenade route and a no-drop social run. Nobody is timing you.',
                },
                {
                  title: 'Road runner, curious',
                  body: 'Expect your pace to fall off a cliff, not your fitness. Ascent is the number that matters.',
                },
                {
                  title: 'First trail race',
                  body: 'Pick something under 20K with a generous cut-off and a route you can recce first.',
                },
                {
                  title: 'Chasing the long stuff',
                  body: 'The Penwith and Exmoor coast will happily take everything you have got.',
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

      {/* -------------------------------------------------------- The story */}
      <section className="border-b border-line py-20">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[4/3] border border-line">
              <Image
                src="/images/brand/about-club-portrait.svg"
                alt="Placeholder artwork: a contour map of the coast around Penzance"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <span className="label text-red">The club</span>
              <h2 className="mt-5 text-4xl">
                We started running for better mornings.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-mute">
                <p>
                  The {siteConfig.clubName} began with a group of mates in
                  Penzance, some Cornish roots, and a very confident claim that
                  one of us could run to Mousehole. He could not.
                </p>
                <p>
                  We went anyway. Somewhere around the harbour we stopped being
                  able to speak and started laughing instead, and the coast did
                  the rest. Now there is a Thursday night run, two groups,
                  nobody dropped, and headtorches from October.
                </p>
                <p>
                  We built this site because finding a coastal race in England is
                  still stupidly hard, and because the friendly runs that
                  actually get people outdoors are almost invisible next to the
                  ultras.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ButtonLink href="/about" variant="secondary">
                  Read the full story
                </ButtonLink>
                <Tag>Thursdays, 6.30pm, Penzance harbour</Tag>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------- Editorial */}
      <section className="py-20">
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

      {/* ------------------------------------------------------- Newsletter */}
      <section className="border-t border-line bg-ink-800">
        <Container width="wide">
          <div className="grid gap-12 py-20 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="label text-red">Join the movement</span>
              <h2 className="mt-5 text-4xl sm:text-5xl">
                One email a month. Mostly cliffs.
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-mute">
                New coastal events as we verify them, routes worth the drive, and
                the occasional honest opinion about a waterproof that leaked.
              </p>
              <div className="mt-8">
                <Callout title="Where the path stands">
                  <p>
                    The King Charles III England Coast Path was inaugurated on 19
                    March 2026 and will run for around 2,700 miles when complete.
                    Not every stretch is finished — around 2,100 miles had full
                    access rights in place at inauguration. Check the National
                    Trails pages for the section you want before you travel.
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
    </>
  );
}
