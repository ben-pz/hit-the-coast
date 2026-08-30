/**
 * Shared vocabulary for events and routes.
 *
 * Keep these lists in sync with the data files. When this seed data is later
 * replaced by a CMS, these become the CMS's select-field options.
 */

export const regions = [
  'Cornwall',
  'Devon',
  'Dorset & the Jurassic Coast',
  'Somerset & the Bristol Channel',
  'Sussex, Kent & the South East',
  'East Anglia',
  'Yorkshire & Lincolnshire',
  'Northumberland & the North East',
  'Cumbria & the North West',
] as const;

export type Region = (typeof regions)[number];

export const eventTypes = [
  'Trail race',
  'Ultramarathon',
  'Road race',
  'Club run',
  'Social run',
  'Multi-day',
] as const;

export type EventType = (typeof eventTypes)[number];

export const distanceCategories = [
  'Under 10K',
  '10K–Half',
  'Marathon-ish',
  'Ultra (50K+)',
] as const;

export type DistanceCategory = (typeof distanceCategories)[number];

export const difficulties = ['Gentle', 'Moderate', 'Hard', 'Serious'] as const;

export type Difficulty = (typeof difficulties)[number];

export const ticketStatuses = [
  'Entries open',
  'Entries not yet open',
  'Sold out',
  'Free to join',
  'Waiting list',
] as const;

export type TicketStatus = (typeof ticketStatuses)[number];

/** Rough helper so distance filters stay consistent with the numbers shown. */
export function distanceCategoryFor(km: number): DistanceCategory {
  if (km >= 50) return 'Ultra (50K+)';
  // 25km up, so an 18-mile coast-path race lands here rather than in
  // "10K–Half", which would badly undersell it.
  if (km >= 25) return 'Marathon-ish';
  if (km >= 10) return '10K–Half';
  return 'Under 10K';
}
