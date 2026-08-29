import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { NewsletterForm } from '@/components/NewsletterForm';
import { Callout } from '@/components/ui';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Join the movement — the coastal running newsletter',
  description:
    'One email a month: new coastal races and club runs in England, routes worth the drive, and honest kit reviews from the PZX Wasters.',
  alternates: { canonical: '/newsletter' },
  openGraph: {
    title: `Join the movement | ${siteConfig.titleSuffix}`,
    description:
      'New coastal events, routes and honest writing about running England’s coast. About once a month.',
    url: '/newsletter',
  },
};

const promises = [
  {
    title: 'New events, verified',
    body: 'Coastal races, ultras and club runs as we confirm them with organisers — not a scrape of everything on the internet.',
  },
  {
    title: 'Routes worth the drive',
    body: 'One properly written route each time, with the parking, the water, the tides and the bits that are harder than they look.',
  },
  {
    title: 'Honest kit notes',
    body: 'Only about gear club members have actually worn out. Any affiliate link will be disclosed. There are none today.',
  },
  {
    title: 'No filler',
    body: 'About once a month. No motivational quotes, no countdown timers, no “last chance” emails. Unsubscribe in one click.',
  },
];

export default function NewsletterPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join the movement"
        title="One email a month. Mostly cliffs."
        intro="The simplest way to keep up with coastal running in England: new events as we verify them, new routes as we write them up, and the odd honest opinion about kit."
      />

      <section className="py-12 sm:py-16">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
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
                  Your address is used only to send you this newsletter.
                </p>
                <div className="mt-8">
                  <NewsletterForm />
                </div>
              </div>

              <div className="mt-8">
                <Callout title="Connecting a provider">
                  <p>
                    No email provider is connected yet, so this form deliberately
                    does not claim to have stored anything. The form, validation,
                    consent handling and error states are all built.
                  </p>
                  <p>
                    To go live, add your provider credentials to the environment
                    and replace the single{' '}
                    <code className="font-mono">return notImplemented()</code>{' '}
                    line in{' '}
                    <code className="font-mono">
                      src/app/api/newsletter/route.ts
                    </code>{' '}
                    with a call to Mailchimp, Kit, Beehiiv or Brevo — the exact
                    endpoints are listed in that file’s comment. Then set{' '}
                    <code className="font-mono">
                      newsletterConfig.providerConnected
                    </code>{' '}
                    to <code className="font-mono">true</code> in{' '}
                    <code className="font-mono">src/config/site.ts</code>.
                  </p>
                </Callout>
              </div>

              <p className="mt-8 text-sm leading-relaxed text-mute">
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
