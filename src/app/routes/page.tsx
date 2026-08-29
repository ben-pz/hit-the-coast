import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { RouteCard } from '@/components/cards';
import { ResponsibleRunning } from '@/components/ResponsibleRunning';
import { ButtonLink, SectionHeader } from '@/components/ui';
import { routes } from '@/data/routes';
import { regions } from '@/data/taxonomy';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Coastal running routes — Cornwall and beyond',
  description:
    'Coastal running routes with honest notes on distance, ascent, terrain, parking, water and safety. Starting in Cornwall and expanding around the English coast.',
  alternates: { canonical: '/routes' },
  openGraph: {
    title: `Coastal running routes | ${siteConfig.titleSuffix}`,
    description:
      'Cornish coast path routes with distance, ascent, terrain, parking, water and safety notes.',
    url: '/routes',
  },
};

export default function RoutesPage() {
  const grouped = regions
    .map((region) => ({
      region,
      items: routes.filter((route) => route.region === region),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <PageHeader
        eyebrow="Where to run"
        title="Coastal routes, starting in Cornwall"
        intro="Real notes from people who run these in February as well as August. What the ground is like, where to park, where the water is, and where it stops being a nice jog."
      />

      <section className="py-12 sm:py-16">
        <Container width="wide">
          <ResponsibleRunning />

          {grouped.map((group, groupIndex) => (
            <div key={group.region} className="mt-16">
              <SectionHeader
                eyebrow={`${group.items.length} route${group.items.length === 1 ? '' : 's'}`}
                title={group.region}
              />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((route, index) => (
                  <RouteCard
                    key={route.slug}
                    route={route}
                    priority={groupIndex === 0 && index === 0}
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="mt-20 border border-line bg-ink-800 p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl">
              Know a stretch of coast properly?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mute">
              We are adding routes around the English coast as we find people who
              genuinely know them — the parking, the tides, where the water is,
              which bit is horrible in February. That is the bar. If that is you,
              get in touch and we will help you write it up.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={`mailto:${siteConfig.email.general}`}>
                Email us a route
              </ButtonLink>
              <ButtonLink href="/newsletter" variant="secondary">
                Get new routes by email
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
