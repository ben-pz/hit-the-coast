import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { EventsExplorer } from '@/components/EventsExplorer';
import { ButtonLink, Callout } from '@/components/ui';
import { events, sortByDate } from '@/data/events';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Coastal races and ultras in England',
  description:
    'A checked directory of coastal running events in England — trail races, ultramarathons, road races and social runs. Filter by region, type, distance and month. Three Cornish classics to start.',
  alternates: { canonical: '/events' },
  openGraph: {
    title: `Coastal running events in England | ${siteConfig.titleSuffix}`,
    description:
      'Trail races and ultras along the English coast, checked against the organisers. Filter by region, type, distance and month.',
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
        intro="Races and ultras on or near the English coast, checked against the organiser before they go up. Cornwall first — send us the ones we are missing."
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
                Three to start with, and every date, distance and link below was
                checked against the organiser&rsquo;s own page in August 2026.
                Entries open and sell out, courses get tweaked and winter dates
                move — so{' '}
                <strong className="text-paper">
                  always confirm with the organiser
                </strong>{' '}
                before you enter or travel.
              </p>
              <p>
                We would rather list three races we have checked than fifty we
                have not. Organising something on the English coast? Send it
                over and we will verify it and add it.
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
