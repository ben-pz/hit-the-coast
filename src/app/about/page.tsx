import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { ButtonLink, Callout, DataList, SectionHeader } from '@/components/ui';
import { NewsletterForm } from '@/components/NewsletterForm';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About PZ×RC and the coastal running mission',
  description:
    'PZ×RC started in Penzance with a group of mates and a shared love of the coast path. Here is the club, why we are building a home for coastal running in England, and who is writing it.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: `About ${siteConfig.clubName} | ${siteConfig.titleSuffix}`,
    description:
      'How a group of mates in Penzance became a running club, and why we are mapping England’s coast.',
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
        eyebrow={`About ${siteConfig.clubName}`}
        title="A running club that started as a bad idea"
        intro="We started running for better mornings and stayed for the cliffs, the weather and the people. PZ×RC began in Cornwall. Now we want to help more runners find their place on England’s coast."
      />

      <section className="py-12 sm:py-16">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div className="measure space-y-6 text-lg leading-relaxed text-paper/90">
              <p>
                There was no founding meeting. There was a group of mates in
                Penzance with a long and distinguished record of excellent
                Friday nights, who worked out — slowly, and not all at once —
                that running the coast path together was better than the
                alternative.
              </p>
              <p>
                That is genuinely the whole origin story: a shared love of the
                path, and a need to put something in the space where the big
                nights used to be. With the odd big night still chucked in, in
                fairness. Nobody is pretending otherwise.
              </p>
              <p>
                What kept it going was the coast. Once you have run out towards
                Land’s End at seven in the morning with the sea doing something
                ridiculous below you, the pub is still fine — it is just no
                longer the best thing available on a weekend. That is not a moral
                position, and we are not going to lecture anybody about how they
                spend their evenings. It is just what happened to us.
              </p>

              <h2 className="pt-6 text-3xl">Where the name comes from</h2>
              <p>
                It is a joke about who we used to be, and we have kept it because
                it stops anyone taking us too seriously. Including us. If you
                turn up to a club run expecting a lecture on lactate threshold,
                you will be disappointed. If you turn up expecting to be told
                where the good chips are, you are in the right place.
              </p>

              <h2 className="pt-6 text-3xl">Who is writing this</h2>
              <p>
                Mostly Benjamin, who grew up just outside Sennen, near Land’s
                End, and now lives in Amsterdam. Building a map of the Cornish
                coast from a country with no cliffs in it is either very sensible
                or slightly ridiculous, and the jury is still out — but it is an
                honest reason for a site to exist: keeping a line open to home.
                The 2027{' '}
                <Link href="/events" className="text-red-bright hover:text-paper">
                  Classic Quarter
                </Link>{' '}
                is the thing at the end of it, after a back injury took out the
                2026 attempt. That story is{' '}
                <Link
                  href="/stories/the-ultra-i-did-not-run"
                  className="text-red-bright hover:text-paper"
                >
                  written up here
                </Link>
                .
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
