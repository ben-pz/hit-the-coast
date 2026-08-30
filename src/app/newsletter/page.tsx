import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { NewsletterForm } from '@/components/NewsletterForm';
import { Callout } from '@/components/ui';
import { newsletterConnected, siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Take part — get an account on the coast tracker',
  description:
    'Put your name down for an account on the coast tracker, so your progress follows you between devices and you can see what your friends have run. Plus one email a month with new segments, events and routes.',
  alternates: { canonical: '/newsletter' },
  openGraph: {
    title: `Take part | ${siteConfig.titleSuffix}`,
    description:
      'Get an account on the coast tracker when they land, plus one email a month about running England’s coast.',
    url: '/newsletter',
  },
};

const promises = [
  {
    title: 'First in line for an account',
    body: 'Your ticked segments stop living in one browser and start following you around. This is the main reason to sign up.',
  },
  {
    title: 'Friends, when they land',
    body: 'See what the people you run with have covered, and how much of the coast your lot have done between you.',
  },
  {
    title: 'New segments as they open',
    body: 'Cornwall is done. Devon, the Jurassic Coast and the rest of England follow, and you will hear first.',
  },
  {
    title: 'No filler',
    body: 'About one email a month. No motivational quotes, no countdown timers, no “last chance” emails. Unsubscribe in one click.',
  },
];

export default function NewsletterPage() {
  return (
    <>
      <PageHeader
        eyebrow="Take part"
        title="Your coast, on every device"
        intro="The tracker works right now without an account. Put your name down and you get one the moment they exist — so your progress follows you between your phone and your laptop, and you can see what your mates have covered."
      />

      <section className="py-12 sm:py-16">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <div className="relative mb-10 aspect-[4/3] border border-line">
                <Image
                  src="/images/brand/newsletter-cove.webp"
                  alt="A PZ×RC runner mid-air over a rut in a sunken coast-path track, arms out, bracken either side"
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-cover"
                />
              </div>
              <h2 className="text-3xl">What you actually get</h2>
              <dl className="mt-8 space-y-8">
                {promises.map((item) => (
                  <div key={item.title}>
                    <dt className="text-lg text-red-bright">{item.title}</dt>
                    <dd className="mt-2 text-base leading-relaxed text-mute">
                      {item.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <div className="border border-line bg-ink-800 p-6 sm:p-10">
                <h2 className="text-2xl">Sign up</h2>
                <p className="mt-3 text-sm leading-relaxed text-mute">
                  Your address is used to give you a tracker account and to send
                  the newsletter. Nothing else, ever.
                </p>
                <div className="mt-8">
                  <NewsletterForm />
                </div>
              </div>

              {/* Pre-launch only: disappears the moment a form ID is set. */}
              {!newsletterConnected ? (
                <div className="mt-8">
                  <Callout title="Not live yet">
                    <p>
                      No mailing list is connected, so this form deliberately
                      does not claim to have stored anything. The form,
                      validation, consent handling and error states are all
                      built and working.
                    </p>
                    <p>
                      To switch it on: create a free Kit form, then paste its ID
                      into{' '}
                      <code className="font-mono">kitFormId</code> in{' '}
                      <code className="font-mono">src/config/site.ts</code> and
                      redeploy. This notice removes itself.
                    </p>
                  </Callout>
                </div>
              ) : null}

              <p className="mt-8 text-sm leading-relaxed text-mute">
                You do not need to sign up to use{' '}
                <Link
                  href="/coast"
                  className="text-red-bright underline underline-offset-4 hover:text-paper"
                >
                  the tracker
                </Link>{' '}
                — it works right now, it just cannot follow you between devices
                yet.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-mute">
                Prefer to just email us?{' '}
                <a
                  href={`mailto:${siteConfig.email.general}`}
                  className="text-red-bright underline underline-offset-4 hover:text-paper"
                >
                  {siteConfig.email.general}
                </a>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
