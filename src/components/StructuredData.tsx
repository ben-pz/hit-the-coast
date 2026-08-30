import { events } from '@/data/events';
import { siteConfig } from '@/config/site';

/**
 * Organisation, site and event structured data.
 *
 * Only events flagged `verified: true` are published. An unverified listing is
 * sample content, and publishing sample dates and locations as machine-readable
 * facts would push them into search results as though they were confirmed.
 *
 * No `image` on events yet: every event picture is generated placeholder SVG,
 * and search engines want a real photograph in a raster format. Add it here the
 * day real photography lands.
 */
export function StructuredData() {
  const base = siteConfig.url.replace(/\/$/, '');

  const eventGraph = events
    .filter((event) => event.verified)
    .map((event) => ({
      '@type': 'Event',
      '@id': `${base}/events/#${event.id}`,
      name: event.name,
      startDate: event.date,
      ...(event.endDate ? { endDate: event.endDate } : {}),
      description: event.description,
      url: event.url,
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
      organizer: { '@type': 'Organization', name: event.organiser },
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
