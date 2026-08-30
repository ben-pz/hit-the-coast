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
