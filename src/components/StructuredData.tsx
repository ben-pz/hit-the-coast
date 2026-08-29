import { siteConfig } from '@/config/site';

/**
 * Organisation and site-level structured data.
 *
 * Deliberately no `Event` structured data yet. Every listing in
 * src/data/events.ts is flagged `verified: false`, and publishing unverified
 * dates and locations as machine-readable facts would push sample content into
 * search results as though it were confirmed. Add an Event graph here once
 * listings carry `verified: true`.
 */
export function StructuredData() {
  const base = siteConfig.url.replace(/\/$/, '');

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${base}/#organization`,
        name: siteConfig.clubName,
        alternateName: siteConfig.titleSuffix,
        url: base,
        logo: `${base}/images/brand/pzx-wasters-logo.png`,
        email: siteConfig.email.general,
        areaServed: 'England',
        sameAs: siteConfig.social.map((item) => item.href),
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
