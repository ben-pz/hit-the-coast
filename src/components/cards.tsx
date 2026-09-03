import Image from 'next/image';
import Link from 'next/link';
import type { CoastalEvent } from '@/data/events';
import type { CoastalRoute } from '@/data/routes';
import type { Article } from '@/data/articles';
import { SampleBadge, Tag } from './ui';
import {
  formatDate,
  formatDateRange,
  formatDistance,
  formatElevation,
} from '@/lib/format';

/* ---------------------------------------------------------------- Artwork */

function CardArt({
  src,
  alt,
  priority = false,
  sizes = '(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw',
}: {
  src?: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (!src) {
    return (
      <div className="relative flex aspect-[3/2] items-center justify-center overflow-hidden bg-ink-800">
        <div
          className="contours pointer-events-none absolute inset-0 opacity-60"
          aria-hidden="true"
        />
        <span className="label relative text-mute">Photo coming soon</span>
      </div>
    );
  }

  return (
    <div className="relative aspect-[3/2] overflow-hidden bg-ink-800">
      <Image
        src={src}
        alt={alt ?? ''}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
    </div>
  );
}

/* -------------------------------------------------------------- EventCard */

export function EventCard({
  event,
  priority = false,
}: {
  event: CoastalEvent;
  priority?: boolean;
}) {
  const isInternal = event.url.startsWith('/');

  return (
    <article className="lift group flex h-full flex-col border border-line bg-ink-800 hover:border-red/70">
      <CardArt
        src={event.image}
        alt={event.imageAlt}
        priority={priority}
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Tag tone="red">{event.type}</Tag>
          <Tag>{event.region}</Tag>
        </div>

        <h3 className="mt-4 text-xl">
          {isInternal ? (
            <Link href={event.url} className="hover:text-red-bright">
              {event.name}
            </Link>
          ) : (
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-bright"
            >
              {event.name}
              <span className="sr-only"> (opens the organiser’s site)</span>
            </a>
          )}
        </h3>

        <p className="mt-2 font-mono text-sm text-red-bright">
          {formatDateRange(event.date, event.endDate)}
        </p>
        <p className="mt-1 text-sm text-mute">{event.location}</p>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-mute">
          {event.description}
        </p>

        <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4">
          <div>
            <dt className="label text-mute">Distance</dt>
            <dd className="mt-1 font-mono text-sm">{event.distanceLabel}</dd>
          </div>
          <div>
            <dt className="label text-mute">Ascent</dt>
            <dd className="mt-1 font-mono text-sm">
              {formatElevation(event.elevationM)}
            </dd>
          </div>
          <div>
            <dt className="label text-mute">Entry</dt>
            <dd className="mt-1 font-mono text-sm">{event.ticketStatus}</dd>
          </div>
        </dl>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-mute">{event.organiser}</span>
          {!event.verified ? <SampleBadge /> : null}
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------- RouteCard */

export function RouteCard({
  route,
  priority = false,
}: {
  route: CoastalRoute;
  priority?: boolean;
}) {
  return (
    <article className="lift group relative flex h-full flex-col border border-line bg-ink-800 hover:border-red/70">
      <CardArt src={route.image} alt={route.imageAlt} priority={priority} />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Tag tone="red">{route.difficulty}</Tag>
          <Tag>{route.loop ? 'Loop' : 'Point to point'}</Tag>
        </div>

        <h3 className="mt-4 text-xl">
          <Link href={`/routes/${route.slug}`} className="hover:text-red-bright">
            <span className="absolute inset-0" aria-hidden="true" />
            {route.name}
          </Link>
        </h3>

        <p className="mt-2 text-sm text-mute">{route.region}</p>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-mute">
          {route.summary}
        </p>

        <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4">
          <div>
            <dt className="label text-mute">Distance</dt>
            <dd className="mt-1 font-mono text-sm">
              {formatDistance(route.distanceKm)}
            </dd>
          </div>
          <div>
            <dt className="label text-mute">Ascent</dt>
            <dd className="mt-1 font-mono text-sm">
              {formatElevation(route.elevationM)}
            </dd>
          </div>
          <div>
            <dt className="label text-mute">Time</dt>
            <dd className="mt-1 font-mono text-sm">{route.estimatedTime}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------ ArticleCard */

export function ArticleCard({
  article,
  priority = false,
}: {
  article: Article;
  priority?: boolean;
}) {
  return (
    <article className="lift group relative flex h-full flex-col border border-line bg-ink-800 hover:border-red/70">
      <CardArt src={article.image} alt={article.imageAlt} priority={priority} />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Tag tone="red">{article.category}</Tag>
          <span className="label text-mute">
            {article.readingMinutes} min read
          </span>
          {article.source ? (
            <Tag tone="quiet">↗ From {article.source.name}</Tag>
          ) : null}
        </div>

        <h3 className="mt-4 text-xl">
          <Link
            href={`/stories/${article.slug}`}
            className="hover:text-red-bright"
          >
            <span className="absolute inset-0" aria-hidden="true" />
            {article.title}
          </Link>
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-mute">
          {article.excerpt}
        </p>

        <p className="mt-5 border-t border-line pt-4 font-mono text-xs text-mute">
          {article.author} · {formatDate(article.date)}
        </p>
      </div>
    </article>
  );
}
