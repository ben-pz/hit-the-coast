import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { EventsExplorer } from '@/components/EventsExplorer';
import { ButtonLink, Callout } from '@/components/ui';
import { events, sortByDate } from '@/data/events';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Coastal races, ultras and club runs in England',
  description:
    'A filterable directory of coastal running events in England — trail races, ultramarathons, road races, club runs and social runs. Filter by region, type, distance and month.',
  alternates: { canonical: '/events' },
  openGraph: {
    title: `Coastal running events in England | ${siteConfig.titleSuffix}`,
    description:
      'Trail races, ultras, club runs and social runs along the English coast. Filter by region, type, distance and month.',
    url: '/events',
  },
};

export default function EventsPage() {
  const ordered = sortByDate(events);

  return (
    <>
      <PageHeader
        eyebrow="The directory"
        title="Coastal events in England"
        intro="Competitive races, ultras, club runs and friendly social runs, all on or near the coast. Filter by region, type, distance and month."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/submit-event">Submit an event</ButtonLink>
          <ButtonLink href="/newsletter" variant="secondary">
            Get new events by email
          </ButtonLink>
        </div>
      </PageHeader>

      <section className="py-12 sm:py-16">
        <Container width="wide">
          <div className="mb-10">
            <Callout title="About these listings">
              <p>
                Every entry below is a clearly marked{' '}
                <strong className="text-paper">sample</strong> created to build
                and test the directory. Dates, distances and entry links have not
                been confirmed with organisers, and the linked sites are
                placeholders. Always check details with the organiser before
                entering or travelling.
              </p>
              <p>
                Organising something on the English coast? Send it to us and we
                will verify and list it.
              </p>
            </Callout>
          </div>

          <EventsExplorer events={ordered} />

          <div className="mt-16 border border-line bg-ink-800 p-6 sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl">
                  Missing something? It probably is.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-mute">
                  We would rather list fifty events we have checked than five
                  hundred we have not. If you organise a coastal race, a club run
                  or a social run anywhere on the English coast, tell us.
                </p>
              </div>
              <ButtonLink href="/submit-event" size="lg" className="shrink-0">
                Submit an event
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
