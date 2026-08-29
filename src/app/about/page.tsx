import Image from 'next/image';
import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { ButtonLink, Callout, DataList, SectionHeader } from '@/components/ui';
import { NewsletterForm } from '@/components/NewsletterForm';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About PZX Wasters and the coastal running mission',
  description:
    'PZX Wasters started in Penzance with a group of mates, some Cornish roots and a bad idea about running to Mousehole. Here is the club, and why we are building a home for coastal running in England.',
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
    body: 'Two groups on club night, and the faster one loops back. It is not a race. Some of us are quite bad at this and intend to stay that way.',
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
        intro="We started running for better mornings and stayed for the cliffs, the weather and the people. PZX Wasters began in Cornwall. Now we want to help more runners find their place on England’s coast."
      />

      <section className="py-12 sm:py-16">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div className="measure space-y-6 text-lg leading-relaxed text-paper/90">
              <p>
                There was no founding meeting. There was a group of mates in
                Penzance with Cornish roots, a long and distinguished record of
                excellent Friday nights, and one member who announced with total
                confidence and no supporting evidence that he could run to
                Mousehole.
              </p>
              <p>
                He could not. Four of us went anyway, in cotton, into a
                headwind. Somewhere around the harbour we stopped being able to
                speak and started laughing instead, and that was the whole thing.
                That was the beginning.
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

              <h2 className="pt-6 text-3xl">Why we built this site</h2>
              <p>
                Because finding a coastal race in England is still stupidly hard.
                The information is scattered across a dozen organiser sites, half
                of them last updated years ago, and there is no decent way to ask
                the obvious question: what is on, near the sea, at a distance I
                can actually do, in the month I am free?
              </p>
              <p>
                And because the friendly stuff is almost invisible. Social runs
                and no-drop club nights are what actually get people outdoors,
                but they are buried underneath the ultras. We wanted them side by
                side, treated as equally worth doing.
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
                  src="/images/brand/about-club-portrait.svg"
                  alt="Placeholder artwork: a contour map of the coast around Penzance. Replace with a photograph of the club."
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
                    { label: 'Club run', value: 'Thursdays, 6.30pm' },
                    { label: 'Meeting point', value: 'Penzance harbour' },
                    { label: 'Groups', value: '5K and 8K, no-drop' },
                    { label: 'Cost', value: 'Free' },
                  ]}
                />
                <p className="mt-4 text-xs leading-relaxed text-mute">
                  Club run details are a placeholder while we confirm the meeting
                  point and winter timings. Email before travelling.
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
