import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { ResponsibleRunning } from '@/components/ResponsibleRunning';
import { ButtonLink, DataList, Tag } from '@/components/ui';
import { RouteCard } from '@/components/cards';
import { getRoute, routes } from '@/data/routes';
import { formatDistance, formatElevation } from '@/lib/format';
import { siteConfig } from '@/config/site';

type Props = { params: Promise<{ slug: string }> };

/**
 * All content is known at build time, so any slug outside generateStaticParams
 * is a 404 rather than an on-demand render. Remove this if content ever starts
 * arriving from a CMS after the build.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return routes.map((route) => ({ slug: route.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const route = getRoute(slug);

  if (!route) return { title: 'Route not found' };

  const title = `${route.name} — ${formatDistance(route.distanceKm)} coastal running route`;

  return {
    title,
    description: route.summary,
    alternates: { canonical: `/routes/${route.slug}` },
    openGraph: {
      title: `${title} | ${siteConfig.titleSuffix}`,
      description: route.summary,
      url: `/routes/${route.slug}`,
      type: 'article',
    },
  };
}

export default async function RoutePage({ params }: Props) {
  const { slug } = await params;
  const route = getRoute(slug);

  if (!route) notFound();

  const others = routes.filter((item) => item.slug !== route.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={route.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        </div>
        <Container width="wide">
          <div className="relative py-16 sm:py-20">
            <nav aria-label="Breadcrumb" className="label text-mute">
              <Link href="/routes" className="hover:text-red-bright">
                Routes
              </Link>
              <span aria-hidden="true"> / </span>
              <span className="text-paper">{route.region}</span>
            </nav>

            <h1 className="mt-5 max-w-3xl text-[clamp(2.25rem,6vw,4.25rem)]">
              {route.name}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/85">
              {route.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              <Tag tone="red">{route.difficulty}</Tag>
              <Tag>{route.loop ? 'Loop' : 'Point to point'}</Tag>
              {route.terrain.map((item) => (
                <Tag key={item} tone="quiet">
                  {item}
                </Tag>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            {/* ------------------------------------------------- Main column */}
            <div>
              <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
                {[
                  { label: 'Distance', value: formatDistance(route.distanceKm) },
                  { label: 'Ascent', value: formatElevation(route.elevationM) },
                  { label: 'Difficulty', value: route.difficulty },
                  { label: 'Time', value: route.estimatedTime },
                ].map((stat) => (
                  <div key={stat.label} className="bg-ink-800 p-5">
                    <p className="label text-mute">{stat.label}</p>
                    <p className="mt-2 font-display text-xl font-extrabold">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="measure mt-10 space-y-5 text-base leading-relaxed text-paper/90">
                {route.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              {/* ------------------------------------------ Map placeholder */}
              <div className="mt-12">
                <h2 className="text-2xl">The map</h2>
                <div className="relative mt-5 aspect-[16/9] overflow-hidden border border-dashed border-line bg-ink-800">
                  <Image
                    src={route.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 700px, 100vw"
                    className="object-cover opacity-45"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/55 p-6 text-center">
                    <span className="label text-red">Map placeholder</span>
                    <p className="max-w-sm text-sm leading-relaxed text-mute">
                      An interactive map goes here. Drop in OS Maps, Mapbox,
                      MapLibre or an embedded Komoot/Strava route — the container
                      is ready and nothing else needs to change.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <span
                    className="label inline-flex cursor-not-allowed items-center gap-2 border border-dashed border-line px-4 py-3 text-mute"
                    aria-disabled="true"
                  >
                    ↓ GPX download — not available yet
                  </span>
                  <p className="text-xs text-mute">
                    GPX files will be published once each route has been recorded
                    and checked. See{' '}
                    <code className="font-mono">gpxUrl</code> in{' '}
                    <code className="font-mono">src/data/routes.ts</code>.
                  </p>
                </div>
              </div>

              {/* ------------------------------------------------- Safety */}
              <div className="mt-12">
                <h2 className="text-2xl">Safety notes for this route</h2>
                <ul className="mt-5 space-y-3">
                  {route.safety.map((item) => (
                    <li key={item} className="flex gap-3 text-base leading-relaxed">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 bg-red"
                      />
                      <span className="text-paper/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12">
                <h2 className="text-2xl">Seasonal considerations</h2>
                <ul className="mt-5 space-y-3">
                  {route.seasonal.map((item) => (
                    <li key={item} className="flex gap-3 text-base leading-relaxed">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 bg-mute"
                      />
                      <span className="text-paper/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12">
                <ResponsibleRunning />
              </div>
            </div>

            {/* ---------------------------------------------------- Sidebar */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="label mb-5 text-red">The practical bit</h2>
              <DataList
                items={[
                  { label: 'Start', value: route.start },
                  { label: 'Finish', value: route.finish },
                  { label: 'Shape', value: route.loop ? 'Loop' : 'Point to point' },
                  { label: 'Region', value: route.region },
                  { label: 'Terrain', value: route.terrain.join(', ') },
                ]}
              />

              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="label text-mute">Getting there</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/85">
                    {route.transport}
                  </p>
                </div>
                <div>
                  <h3 className="label text-mute">Parking</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/85">
                    {route.parking}
                  </p>
                </div>
                <div>
                  <h3 className="label text-mute">Water</h3>
                  <ul className="mt-2 space-y-1 text-sm text-paper/85">
                    {route.water.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="label text-mute">Food</h3>
                  <ul className="mt-2 space-y-1 text-sm text-paper/85">
                    {route.food.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {!route.verified ? (
                <p className="mt-8 border border-dashed border-line p-4 text-xs leading-relaxed text-mute">
                  <strong className="text-paper">Not yet verified.</strong>{' '}
                  Distance, ascent and facilities here are indicative and have
                  not been re-surveyed. Check current conditions locally before
                  you run.
                </p>
              ) : null}

              <div className="mt-8">
                <ButtonLink href="/newsletter" className="w-full">
                  Get new routes by email
                </ButtonLink>
              </div>
            </aside>
          </div>

          {/* --------------------------------------------------- More routes */}
          <div className="mt-20 border-t border-line pt-16">
            <h2 className="mb-8 text-3xl">More coastal routes</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((item) => (
                <RouteCard key={item.slug} route={item} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
