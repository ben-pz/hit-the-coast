import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { SubmitEventForm } from '@/components/SubmitEventForm';
import { Callout } from '@/components/ui';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Submit a coastal running event',
  description:
    'Organising a coastal race, ultra, club run or social run in England? Send us the details and we will verify and list it. Free, no payment processing.',
  alternates: { canonical: '/submit-event' },
  openGraph: {
    title: `Submit an event | ${siteConfig.titleSuffix}`,
    description:
      'Send us your coastal race, club run or social run and we will verify and list it.',
    url: '/submit-event',
  },
};

export default function SubmitEventPage() {
  return (
    <>
      <PageHeader
        eyebrow="Organisers"
        title="Submit a coastal event"
        intro="Races, ultras, club runs, social runs — anywhere on or near the English coast. Listing is free. We check details with you before publishing."
      />

      <section className="py-12 sm:py-16">
        <Container width="default">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-start">
            <aside className="space-y-6 lg:sticky lg:top-28">
              <Callout title="How this works right now">
                <p>
                  There is no database behind this site yet, so this form does
                  not store anything. Filling it in and pressing the button opens
                  your own email app with everything laid out — you press send.
                </p>
                <p>
                  If your email app does not open, just write to{' '}
                  <a
                    href={`mailto:${siteConfig.email.events}`}
                    className="text-red-bright underline underline-offset-4"
                  >
                    {siteConfig.email.events}
                  </a>
                  .
                </p>
              </Callout>

              <div className="border border-line bg-ink-800 p-5">
                <h2 className="label text-red">What happens next</h2>
                <ol className="mt-4 space-y-3 text-sm leading-relaxed text-mute">
                  <li>
                    <span className="font-mono text-paper">01</span> We read it
                    and check the entry page.
                  </li>
                  <li>
                    <span className="font-mono text-paper">02</span> We come back
                    to you with anything unclear.
                  </li>
                  <li>
                    <span className="font-mono text-paper">03</span> It goes up,
                    marked as verified, and into the next newsletter.
                  </li>
                </ol>
                <p className="mt-4 text-xs leading-relaxed text-mute">
                  Listing is free. We do not sell placement, and there is no
                  payment processing on this site.
                </p>
              </div>
            </aside>

            <div className="border border-line bg-ink-800 p-6 sm:p-10">
              <h2 className="text-2xl">Event details</h2>
              <p className="mt-3 text-sm leading-relaxed text-mute">
                Everything marked with a red asterisk helps us list it without
                coming back to you.
              </p>
              <div className="mt-8">
                <SubmitEventForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
