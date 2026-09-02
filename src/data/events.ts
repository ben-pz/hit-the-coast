import type {
  DistanceCategory,
  EventType,
  Region,
  TicketStatus,
} from './taxonomy';
import { distanceCategoryFor } from './taxonomy';

export type CoastalEvent = {
  id: string;
  name: string;
  /** ISO date. Multi-day events also set `endDate`. */
  date: string;
  endDate?: string;
  location: string;
  region: Region;
  type: EventType;
  /** Primary distance in kilometres. Used for filtering and sorting. */
  distanceKm: number;
  /** Human label — useful when an event offers several distances. */
  distanceLabel: string;
  /** Total ascent in metres, where known. Leave unset rather than guessing. */
  elevationM?: number;
  description: string;
  organiser: string;
  /** External entry / info page. */
  url: string;
  image: string;
  imageAlt: string;
  featured: boolean;
  ticketStatus: TicketStatus;
  /**
   * Standard entry price for the primary distance (see `distanceLabel`),
   * in GBP. Leave unset rather than guessing — several of these events price
   * by tier (early bird, multi-event discount, fundraiser) or don't publish
   * a price on their own page at all, and a wrong number in search results
   * is worse than a missing one.
   */
  priceGBP?: number;
  /** ISO date entries opened, where the organiser states one unambiguously. */
  offerValidFrom?: string;
  /**
   * VERIFICATION FLAG.
   *
   * Set to true only when the date, distance and entry link have been checked
   * against the organiser's own page — and note the date you checked in the
   * entry's comment. Anything false renders an "Unverified sample" badge.
   *
   * Entry status changes: races sell out, entries open. Re-check
   * `ticketStatus` a few times a year, or the site starts lying politely.
   */
  verified: boolean;
};

/**
 * Event data.
 *
 * Replace this array with a CMS or database query later; everything downstream
 * only depends on the `CoastalEvent` type.
 */
export const events: CoastalEvent[] = [
  {
    // Checked against arcofattrition.utmb.world, 30 August 2026.
    id: 'arc-of-attrition',
    name: 'Arc of Attrition by UTMB',
    date: '2027-01-22',
    endDate: '2027-01-24',
    location: 'Coverack to Porthtowan, Cornwall',
    region: 'Cornwall',
    type: 'Ultramarathon',
    distanceKm: 173,
    distanceLabel: '100M · 100K · 50K · 20K',
    elevationM: 5507,
    description:
      'The one everybody has heard of, and the reason a lot of people find the Cornish coast path in the first place. The 100-miler goes point to point from Coverack round to Porthtowan — 173km and 5,507m of climbing, most of it in the dark, in January. Shorter races follow over the weekend: 100K on the Saturday, then 50K and 20K on the Sunday. It has run since 2015 and grown from fifty starters to one of the biggest trail events in the country.',
    organiser: 'Mudcrew, UTMB World Series',
    url: 'https://arcofattrition.utmb.world/',
    image: '/images/events/arc-of-attrition.webp',
    imageAlt:
      'Two runners in front of the UTMB World Series backdrop in the Arc of Attrition event marquee, one still wearing an Arc 100 race number',
    featured: true,
    ticketStatus: 'Entries open',
    verified: true,
  },
  {
    // Checked against bysvykenevents.com/cousin-jack, 30 August 2026.
    id: 'cousin-jack',
    name: 'Cousin Jack',
    date: '2027-03-06',
    location: 'St Just to St Ives, Cornwall',
    region: 'Cornwall',
    type: 'Trail race',
    distanceKm: 29,
    distanceLabel: 'Classic Jack 18 miles · Ultra Jack 35 miles',
    description:
      'Eighteen miles point to point from the miners’ chapel at St Just to St Ives, over what is arguably the hardest and best stretch of the whole coast path. Muddy fields, rocky headlands, bog and a climb round most corners. The Ultra Jack doubles it — out from St Ives to Cape Cornwall and back, 35 miles with over 7,000 feet of climbing. Entries open on 1 November 2026.',
    organiser: 'Bys Vyken Events',
    url: 'https://www.bysvykenevents.com/cousin-jack',
    image: '/images/events/cousin-jack.webp',
    imageAlt:
      'A group of runners packed together on the start line at St Just before Classic Jack, in low winter sun',
    featured: true,
    ticketStatus: 'Entries not yet open',
    // No priceGBP: Classic Jack shows two prices (£40 and £43) with nothing
    // on the page explaining the difference, so we are not guessing which.
    offerValidFrom: '2026-11-01',
    verified: true,
  },
  {
    // Checked against endurancelife.com/classic-quarter, 30 August 2026.
    id: 'classic-quarter',
    name: 'Classic Quarter',
    date: '2027-06-05',
    location: 'Lizard Point to Land’s End, Cornwall',
    region: 'Cornwall',
    type: 'Ultramarathon',
    distanceKm: 71,
    distanceLabel: '44 miles — solo, pair or team of four',
    elevationM: 1686,
    description:
      'The southernmost point of England to the westernmost, in one go: 44 miles of the south Cornish coast path and 5,531 feet of climbing, covering ninety degrees of the compass — hence the name. Run it solo, as a relay pair or as a team of four. First held in 2007 and in its twenty-first running in 2027; solo places go early, so do not leave it.',
    organiser: 'Endurancelife',
    url: 'https://www.endurancelife.com/classic-quarter',
    image: '/images/events/classic-quarter.webp',
    imageAlt:
      'A runner adjusting a sleeve on an exposed cliff path, hair blown sideways, sea and headland behind',
    featured: true,
    ticketStatus: 'Entries open',
    // Standard solo entry — the flagship distance in distanceLabel. Pair and
    // team-of-four cost more, and there are separate multi-event-discount
    // and fundraiser rates; this is the plain single-race price everyone
    // else pays.
    priceGBP: 100,
    verified: true,
  },
  {
    // Checked against bysvykenevents.com/lighthouse, 31 August 2026.
    id: 'lighthouse',
    name: 'Lighthouse Marathon & Ultra',
    date: '2026-11-07',
    location: 'Land’s End to Godrevy, Cornwall (marathon starts at Pendeen)',
    region: 'Cornwall',
    type: 'Trail race',
    distanceKm: 42,
    distanceLabel: 'Marathon 26.2 miles · Ultra 35 miles',
    description:
      'Point to point along the far west of the coast path, stitching together three lighthouses: Longships, Pendeen and Godrevy. The marathon starts at Pendeen and covers 26.2 miles with nearly 4,000 feet of climbing; the ultra starts further back at Land’s End and runs 35 miles with over 6,000 feet. Both finish at Godrevy. Mud, sand, rock and tarmac, with a few dunes to finish on.',
    organiser: 'Bys Vyken Events',
    url: 'https://www.bysvykenevents.com/lighthouse',
    image: '/images/events/lighthouse.webp',
    imageAlt: 'A lighthouse on the Cornish coast, on the Lighthouse Marathon & Ultra route',
    featured: false,
    ticketStatus: 'Entries open',
    // £52, reduced from £65 — no date given for when that discount started
    // or ends, so no offerValidFrom.
    priceGBP: 52,
    verified: true,
  },
  {
    // Checked against bysvykenevents.com/fsm, 2 September 2026.
    id: 'fordh-sen-mighal',
    name: 'Fordh Sen Mighal',
    date: '2026-12-05',
    location: 'Lelant to Marazion, Cornwall',
    region: 'Cornwall',
    type: 'Trail race',
    distanceKm: 18,
    distanceLabel: '11 miles',
    description:
      'Point to point along the European cultural route from Lelant to Marazion, taking in Trencrom, Ludgvan and more along the way. Registration at St Uny’s Church in Lelant from 8am, 10am start, five-hour cutoff. Multi-terrain underfoot throughout.',
    organiser: 'Bys Vyken Events',
    url: 'https://www.bysvykenevents.com/fsm',
    image: '/images/events/fordh-sen-mighal.webp',
    imageAlt:
      'A knight in a black cloak raising a sword on granite rocks on the Cornish moor',
    featured: false,
    ticketStatus: 'Entries open',
    priceGBP: 32,
    offerValidFrom: '2026-09-01',
    verified: true,
  },
];

export function distanceCategoryOf(event: CoastalEvent): DistanceCategory {
  return distanceCategoryFor(event.distanceKm);
}

export const featuredEvents = events.filter((event) => event.featured);

/** Sorted soonest-first. */
export function sortByDate(list: CoastalEvent[]): CoastalEvent[] {
  return [...list].sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Featured events first (soonest-first among themselves), then everything
 * else (soonest-first). Keeps the checked, well-known races at the top of
 * the directory as the list grows, rather than a new event jumping ahead of
 * them purely because its date is sooner.
 */
export function sortForDisplay(list: CoastalEvent[]): CoastalEvent[] {
  const featured = sortByDate(list.filter((event) => event.featured));
  const rest = sortByDate(list.filter((event) => !event.featured));
  return [...featured, ...rest];
}
