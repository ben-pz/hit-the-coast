import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { ButtonLink, Callout, DataList, SectionHeader } from '@/components/ui';
import { NewsletterForm } from '@/components/NewsletterForm';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About Hit the Coast',
  description:
    'Built by Ben Hearn, who grew up near Land’s End and now lives in Amsterdam. Why this site exists, and the Classic Quarter comeback behind it.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: `About | ${siteConfig.titleSuffix}`,
    description: 'One runner, a long way from Cornwall, mapping the coast he grew up on.',
    url: '/about',
  },
};

const principles = [
  {
    title: 'Nobody gets dropped',
    body: 'When we run together the faster ones loop back. It is not a race. Some of us are quite bad at this and intend to stay that way.',
  },
  {
    title: 'Honest before impressive',
    body: 'If a route is horrible in February we say so. If a jacket leaked we say that too. Being useful matters more than being aspirational.',
  },
  {
    title: 'Beginners are the point',
    body: 'Ultras get all the attention. The runs that change people’s lives are usually a friendly 5K somewhere beautiful with someone to talk to.',
  },
  {
    title: 'Respect the coast',
    body: 'Cliffs, tides and weather do not care how fit you are. We would rather write a boring safety note than a memorial.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Keeping a line open to home"
        intro="For runners and walkers, and anyone who loves this coast, near or far. Built by one runner a long way from Cornwall."
      />

      <section className="py-12 sm:py-16">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div className="measure space-y-6 text-lg leading-relaxed text-paper/90">
              <p>
                This is for runners and walkers, for anyone who loves the coast
                whether they live on top of it or a thousand miles from it. A
                target to tick off. A reason to get out on the evenings and
                weekends instead of the sofa. All 2,700 miles of the England
                Coast Path, one stretch at a time.
              </p>
              <p>
                I’m Ben. I grew up just outside Sennen, near the cliffs at
                Land’s End, and I now live in Amsterdam, which as far as I can
                tell has zero cliffs and not many hills either. Building a map
                of the Cornish coast from somewhere that flat is probably a bit
                ridiculous. But it’s an honest reason for a site to exist: it
                keeps a line open to home, and it scratches an itch for the
                kind of nature I only really appreciated once I didn’t have it
                on my doorstep anymore.
              </p>
              <p>
                I’ve always run, on and off, but it only became a proper habit
                about three years ago, which, if the rest of the internet is
                anything to go by, is roughly when most of us in our thirties
                discovered running. A few of us from home ended up doing the
                same thing at the same time, and that’s more or less how PZ
                (x) RC started: a group of friends using running as an excuse
                to stay in touch and get outside on the coast, some of us
                taking it more seriously than others. The full name is PZ (x)
                Wasters RC. It’s a nod to the fact that most of us have simply
                swapped nights out for early mornings on the cliffs. Some of
                the time, anyway.
              </p>
              <p>
                The other reason this exists is the coast path itself. It’s
                officially the King Charles III England Coast Path now, and
                it’s apparently the longest managed coastal path in the world.
                2,700 miles, continuous, and ours to use. I’ve been to plenty
                of places where the best bits of coastline sit behind a fence
                or a hotel. We don’t have that problem here, and I don’t think
                enough people clock how lucky that is. Some of the Cornish
                stretches on this tracker are genuinely among the most
                beautiful coastline anywhere, and you don’t need permission to
                run on any of them.
              </p>
              <p>
                Personally, I’m mid-comeback. The Classic Quarter (Lizard
                Point to Land’s End) was meant to be my first ultra in 2026,
                and I’d wanted to run it for years: it goes straight through
                Penzance and Newlyn, where I spent my teens and where my
                family still live, and finishes at Land’s End, where I grew
                up. A route built out of my own childhood, more or less. Six
                weeks out, my back went. Four months where I could barely
                walk, let alone run. I’m hoping to complete a lot of the coast
                myself in the build-up to the{' '}
                <Link href="/events" className="text-red-bright hover:text-paper">
                  Classic Quarter
                </Link>
                , still a long way off. Another excuse to visit home.
              </p>

              <h2 className="pt-6 text-3xl">Why we built this site</h2>
              <p>
                Because finding a coastal race in England is still stupidly hard.
                The information is scattered across a dozen organiser sites, half
                of them last updated years ago, and there is no decent way to ask
                the obvious question: what is on, near the sea, at a distance I
                can actually do, in the month I am free?
              </p>
              <p>
                And because the friendly stuff is almost invisible. A four-mile
                stretch of coast with a mate is what actually gets people
                outdoors, but it is buried underneath the ultras. We wanted them
                side by side, treated as equally worth doing.
              </p>
              <p>
                The King Charles III England Coast Path — inaugurated in March
                2026, around 2,700 miles when complete — makes the whole thing
                more possible than it has ever been. Not every stretch is
                finished, and we will not pretend otherwise. But a continuous
                right of way around the edge of the country is a genuinely
                exciting thing for runners, and somebody should be writing about
                it properly.
              </p>

              <h2 className="pt-6 text-3xl">What comes next</h2>
              <p>
                Cornwall first, because that is what we know. Then outward, one
                region at a time, as we find people who know their bit of coast
                the way we know ours — the parking, the tides, where the water
                is, which section is miserable in a north-easterly. That is the
                bar for a route on this site.
              </p>
              <p>
                If that is you, get in touch. If you organise events, send them
                over. If you just want to know where to start, the newsletter is
                the easiest way to keep up.
              </p>
            </div>

            <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
              <div className="relative aspect-[4/5] border border-line">
                <Image
                  src="/images/brand/about-club-portrait.webp"
                  alt="Three PZ×RC runners climbing coast-path steps in fancy dress \u2014 one in a Santa suit, one in a three-piece suit"
                  fill
                  priority
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className="object-cover"
                />
              </div>

              <div>
                <h2 className="label mb-4 text-red">The club, in numbers</h2>
                <DataList
                  items={[
                    { label: 'Based', value: siteConfig.basedIn },
                    { label: 'Coast covered', value: 'Cornwall, 45 segments' },
                    { label: 'Runs', value: 'Whenever the weather allows' },
                    { label: 'Cost', value: 'Free' },
                  ]}
                />
                <p className="mt-4 text-xs leading-relaxed text-mute">
                  There is no fixed club night. We go when we go — the tracker is
                  how you join in.
                </p>
              </div>

              <ButtonLink
                href={`mailto:${siteConfig.email.general}`}
                className="w-full"
              >
                Say hello
              </ButtonLink>
            </aside>
          </div>

          <div className="mt-20 border-t border-line pt-16">
            <SectionHeader
              eyebrow="How we do things"
              title="Four things we try to get right"
            />
            <div className="grid gap-6 sm:grid-cols-2">
              {principles.map((item) => (
                <div
                  key={item.title}
                  className="border border-line bg-ink-800 p-6"
                >
                  <h3 className="text-xl text-red-bright">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-mute">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <Callout title="What this site is not, yet">
              <p>
                There is no ticketing, no membership system and no shop. Events,
                routes and some articles are clearly marked sample entries while
                we verify listings with organisers. The newsletter form is
                wired but no mailing list is connected yet, so it cannot store
                your address — and it says so rather than pretending.
              </p>
            </Callout>
          </div>

          <div className="mt-16 grid gap-10 border border-line bg-ink-800 p-6 sm:p-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-3xl">Come with us, roughly monthly</h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-mute">
                New coastal events as we verify them, new routes as we write them
                up, and the occasional strong opinion about a waterproof.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </Container>
      </section>
    </>
  );
}
