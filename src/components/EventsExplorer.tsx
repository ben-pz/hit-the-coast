'use client';

import { useId, useMemo, useState } from 'react';
import { EventCard } from './cards';
import { buttonClass } from './ui';
import type { CoastalEvent } from '@/data/events';
import {
  distanceCategories,
  distanceCategoryFor,
  eventTypes,
  regions,
} from '@/data/taxonomy';
import { formatMonth, monthKey } from '@/lib/format';

const ANY = 'any';

type Filters = {
  region: string;
  type: string;
  distance: string;
  month: string;
};

const emptyFilters: Filters = {
  region: ANY,
  type: ANY,
  distance: ANY,
  month: ANY,
};

function Select({
  label,
  value,
  onChange,
  options,
  anyLabel,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  anyLabel: string;
}) {
  const id = useId();
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="label mb-2 text-mute">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none border border-line bg-ink-800 px-3 py-2.5 text-sm text-paper outline-none hover:border-mute"
      >
        <option value={ANY}>{anyLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function EventsExplorer({ events }: { events: CoastalEvent[] }) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);

  const months = useMemo(() => {
    const keys = Array.from(new Set(events.map((event) => monthKey(event.date))));
    keys.sort();
    return keys.map((key) => ({ value: key, label: formatMonth(key) }));
  }, [events]);

  const visible = useMemo(
    () =>
      events.filter((event) => {
        if (filters.region !== ANY && event.region !== filters.region)
          return false;
        if (filters.type !== ANY && event.type !== filters.type) return false;
        if (
          filters.distance !== ANY &&
          distanceCategoryFor(event.distanceKm) !== filters.distance
        )
          return false;
        if (filters.month !== ANY && monthKey(event.date) !== filters.month)
          return false;
        return true;
      }),
    [events, filters],
  );

  const isFiltered =
    filters.region !== ANY ||
    filters.type !== ANY ||
    filters.distance !== ANY ||
    filters.month !== ANY;

  // Only offer regions and types that actually appear in the data.
  const availableRegions = regions.filter((region) =>
    events.some((event) => event.region === region),
  );
  const availableTypes = eventTypes.filter((type) =>
    events.some((event) => event.type === type),
  );

  return (
    <div>
      <section
        aria-labelledby="filters-heading"
        className="border border-line bg-ink-800 p-5 sm:p-6"
      >
        <h2 id="filters-heading" className="label mb-5 text-red">
          Filter events
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Select
            label="Region"
            anyLabel="All regions"
            value={filters.region}
            onChange={(value) =>
              setFilters((current) => ({ ...current, region: value }))
            }
            options={availableRegions.map((region) => ({
              value: region,
              label: region,
            }))}
          />
          <Select
            label="Event type"
            anyLabel="All types"
            value={filters.type}
            onChange={(value) =>
              setFilters((current) => ({ ...current, type: value }))
            }
            options={availableTypes.map((type) => ({
              value: type,
              label: type,
            }))}
          />
          <Select
            label="Distance"
            anyLabel="Any distance"
            value={filters.distance}
            onChange={(value) =>
              setFilters((current) => ({ ...current, distance: value }))
            }
            options={distanceCategories.map((category) => ({
              value: category,
              label: category,
            }))}
          />
          <Select
            label="Month"
            anyLabel="Any month"
            value={filters.month}
            onChange={(value) =>
              setFilters((current) => ({ ...current, month: value }))
            }
            options={months}
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
          <p role="status" aria-live="polite" className="text-sm text-mute">
            Showing <span className="font-mono text-paper">{visible.length}</span>{' '}
            of {events.length} events
            {isFiltered ? ' matching your filters' : ''}.
          </p>
          {isFiltered ? (
            <button
              type="button"
              onClick={() => setFilters(emptyFilters)}
              className={buttonClass('secondary', 'md')}
            >
              Clear filters
            </button>
          ) : null}
        </div>
      </section>

      {visible.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((event, index) => (
            <EventCard key={event.id} event={event} priority={index < 2} />
          ))}
        </div>
      ) : (
        <div className="mt-10 border border-dashed border-line p-10 text-center">
          <h3 className="text-2xl">Nothing matches that combination.</h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mute">
            The directory is small while we verify listings. Try widening the
            filters — or tell us about an event we are missing.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setFilters(emptyFilters)}
              className={buttonClass('primary', 'md')}
            >
              Clear filters
            </button>
            <a href="/submit-event" className={buttonClass('secondary', 'md')}>
              Submit an event
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
