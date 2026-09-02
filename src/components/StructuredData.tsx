import { events } from '@/data/events';
import { siteConfig } from '@/config/site';

/**
 * Organisation, site and event structured data.
 *
 * Only events flagged `verified: true` are published. An unverified listing is
 * sample content, and publishing sample dates and locations as machine-readable
 * facts would push them into search results as though they were confirmed.
 *
 * `price` and `validFrom` on `offers` only appear when `priceGBP` /
 * `offerValidFrom` are set on the event — several of these races price by
 * tier, or don't publish a single clear number or date at all, and a wrong
 * figure in search results is worse than a missing one. Likewise there is no
 * `performer`: these are open-entry races with no fixed competitor or act to
 * name, and schema.org has nothing honest to put there.
 */
const availabilityFor: Record<(typeof events)[number]['ticketStatus'], string> =
  {
    'Entries open': 'https://schema.org/InStock',
    'Entries not yet open': 'https://schema.org/PreOrder',
    'Sold out': 'https://schema.org/SoldOut',
    'Free to join': 'https://schema.org/InStock',
    'Waiting list': 'https://schema.org/LimitedAvailability',
  };

export function StructuredData() {
  const base = siteConfig.url.replace(/\/$/, '');

  const eventGraph = events
    .filter((event) => event.verified)
    .map((event) => ({
      '@type': 'Event',
      '@id': `${base}/events/#${event.id}`,
      name: event.name,
      startDate: event.date,
      // Real end date when the organiser gives one (a multi-day event); a
      // same-day race genuinely ends on its start date even without a known
      // finish time, so that is what we fall back to rather than guessing a
      // time.
      endDate: event.endDate ?? event.date,
      description: event.description,
      url: event.url,
      image: `${base}${event.image}`,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: event.location,
        address: {
          '@type': 'PostalAddress',
          addressRegion: event.region,
          addressCountry: 'GB',
        },
      },
      organizer: {
        '@type': 'Organization',
        name: event.organiser,
        url: new URL(event.url).origin,
      },
      offers: {
        '@type': 'Offer',
        url: event.url,
        availability: availabilityFor[event.ticketStatus],
        ...(event.priceGBP != null
          ? { price: event.priceGBP, priceCurrency: 'GBP' }
          : {}),
        ...(event.offerValidFrom ? { validFrom: event.offerValidFrom } : {}),
      },
    }));

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${base}/#organization`,
        name: siteConfig.name,
        // The running club the site is made with, not the publisher of it.
        memberOf: { '@type': 'SportsOrganization', name: siteConfig.clubName },
        url: base,
        logo: `${base}/images/brand/coast-path-mark.png`,
        email: siteConfig.email.general,
        areaServed: 'England',
        // Omitted entirely while there are no profiles: an empty sameAs is
        // worse than no sameAs.
        ...(siteConfig.social.length > 0
          ? { sameAs: siteConfig.social.map((item) => item.href) }
          : {}),
      },
      {
        '@type': 'WebSite',
        '@id': `${base}/#website`,
        url: base,
        name: siteConfig.titleSuffix,
        description: siteConfig.description,
        inLanguage: 'en-GB',
        publisher: { '@id': `${base}/#organization` },
      },
      ...eventGraph,
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Content is generated from local config, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
