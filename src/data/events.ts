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
  /** Total ascent in metres, where known. */
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
   * SAMPLE DATA FLAG.
   *
   * Every entry below is illustrative sample content created to show the
   * layout. None of it has been checked against a real organiser. Set this to
   * true only for entries whose date, distance and entry link you have
   * confirmed with the organiser — the UI shows an "Unverified sample" badge
   * whenever it is false.
   */
  verified: boolean;
};

/**
 * Seed event data.
 *
 * Replace this array with a CMS or database query later; everything downstream
 * only depends on the `CoastalEvent` type.
 */
export const events: CoastalEvent[] = [
  {
    id: 'lizard-point-coastal-30',
    name: 'Lizard Point Coastal 30',
    date: '2026-09-19',
    location: 'Lizard, Cornwall',
    region: 'Cornwall',
    type: 'Trail race',
    distanceKm: 30,
    distanceLabel: '30K (10K option)',
    elevationM: 980,
    description:
      'Out to the most southerly point in England and back along the cliffs. Technical underfoot, wildly exposed, and worth every step for the coves on the return leg.',
    organiser: 'Sample organiser — to be confirmed',
    url: 'https://example.com/lizard-point-coastal-30',
    image: '/images/events/lizard-point-coastal-30.svg',
    imageAlt:
      'Placeholder artwork: layered contour lines suggesting the cliffs at Lizard Point',
    featured: true,
    ticketStatus: 'Entries open',
    verified: false,
  },
  {
    id: 'penwith-ultra-100k',
    name: 'Penwith Ultra 100K',
    date: '2026-10-10',
    location: 'Penzance to St Ives, Cornwall',
    region: 'Cornwall',
    type: 'Ultramarathon',
    distanceKm: 100,
    distanceLabel: '100K (60K option)',
    elevationM: 3200,
    description:
      'A full loop of the Penwith peninsula on the coast path. Granite, gorse, three thousand metres of climbing and a finish you will feel for a week.',
    organiser: 'Sample organiser — to be confirmed',
    url: 'https://example.com/penwith-ultra',
    image: '/images/events/penwith-ultra-100k.svg',
    imageAlt:
      'Placeholder artwork: an elevation profile rising over a granite headland',
    featured: true,
    ticketStatus: 'Waiting list',
    verified: false,
  },
  {
    id: 'pzx-thursday-harbour-loop',
    name: 'PZX Thursday Harbour Loop',
    date: '2026-09-03',
    location: 'Penzance seafront, Cornwall',
    region: 'Cornwall',
    type: 'Club run',
    distanceKm: 8,
    distanceLabel: '5K and 8K groups',
    elevationM: 60,
    description:
      'Our weekly club run. Two groups, nobody dropped, headtorches from October. Meet by the harbour car park at 6.30pm and stay for chips afterwards.',
    organiser: 'PZX Wasters',
    url: '/about',
    image: '/images/events/pzx-thursday-harbour-loop.svg',
    imageAlt:
      'Placeholder artwork: a harbour wall drawn as a simple contour map',
    featured: true,
    ticketStatus: 'Free to join',
    verified: false,
  },
  {
    id: 'st-agnes-sunrise-social',
    name: 'St Agnes Sunrise Social',
    date: '2026-09-27',
    location: 'St Agnes Head, Cornwall',
    region: 'Cornwall',
    type: 'Social run',
    distanceKm: 9,
    distanceLabel: '9K, no-drop',
    elevationM: 240,
    description:
      'An easy headland loop timed for first light, with a proper breakfast at the end. Walking the steep bits is not just allowed, it is encouraged.',
    organiser: 'Sample organiser — to be confirmed',
    url: 'https://example.com/st-agnes-sunrise-social',
    image: '/images/events/st-agnes-sunrise-social.svg',
    imageAlt:
      'Placeholder artwork: a low sun over the engine houses of St Agnes Head',
    featured: false,
    ticketStatus: 'Free to join',
    verified: false,
  },
  {
    id: 'jurassic-cliffs-marathon',
    name: 'Jurassic Cliffs Marathon',
    date: '2026-11-07',
    location: 'Lulworth, Dorset',
    region: 'Dorset & the Jurassic Coast',
    type: 'Trail race',
    distanceKm: 42,
    distanceLabel: 'Marathon (half option)',
    elevationM: 1750,
    description:
      'The rollercoaster section of the Jurassic Coast, run in the quiet months. Steep, relentless, and one of the most photogenic finish lines in England.',
    organiser: 'Sample organiser — to be confirmed',
    url: 'https://example.com/jurassic-cliffs-marathon',
    image: '/images/events/jurassic-cliffs-marathon.svg',
    imageAlt:
      'Placeholder artwork: a sawtooth elevation profile above chalk cliffs',
    featured: true,
    ticketStatus: 'Entries open',
    verified: false,
  },
  {
    id: 'exmoor-sea-to-sky-45k',
    name: 'Exmoor Sea to Sky 45K',
    date: '2026-10-24',
    location: 'Lynmouth, Devon',
    region: 'Devon',
    type: 'Trail race',
    distanceKm: 45,
    distanceLabel: '45K',
    elevationM: 2100,
    description:
      'Straight up from the harbour onto the highest sea cliffs in England, then a long moorland traverse before dropping back to the water.',
    organiser: 'Sample organiser — to be confirmed',
    url: 'https://example.com/exmoor-sea-to-sky',
    image: '/images/events/exmoor-sea-to-sky-45k.svg',
    imageAlt:
      'Placeholder artwork: contour lines climbing steeply from a river mouth',
    featured: false,
    ticketStatus: 'Entries open',
    verified: false,
  },
  {
    id: 'seven-sisters-half',
    name: 'Seven Sisters Half',
    date: '2027-03-20',
    location: 'Seaford, East Sussex',
    region: 'Sussex, Kent & the South East',
    type: 'Trail race',
    distanceKm: 21,
    distanceLabel: 'Half marathon',
    elevationM: 620,
    description:
      'Chalk, sky and seven very honest climbs, on the stretch of coast where the King Charles III England Coast Path was inaugurated in March 2026.',
    organiser: 'Sample organiser — to be confirmed',
    url: 'https://example.com/seven-sisters-half',
    image: '/images/events/seven-sisters-half.svg',
    imageAlt:
      'Placeholder artwork: the repeating humps of the Seven Sisters cliffs',
    featured: false,
    ticketStatus: 'Entries not yet open',
    verified: false,
  },
  {
    id: 'northumberland-castles-50',
    name: 'Northumberland Castles 50',
    date: '2027-05-15',
    location: 'Bamburgh, Northumberland',
    region: 'Northumberland & the North East',
    type: 'Ultramarathon',
    distanceKm: 50,
    distanceLabel: '50K',
    elevationM: 540,
    description:
      'Flat, fast and enormous. Beach miles between castles, with the wind deciding whether this is your best day out or your longest.',
    organiser: 'Sample organiser — to be confirmed',
    url: 'https://example.com/northumberland-castles-50',
    image: '/images/events/northumberland-castles-50.svg',
    imageAlt:
      'Placeholder artwork: a long flat shoreline with a castle silhouette',
    featured: false,
    ticketStatus: 'Entries not yet open',
    verified: false,
  },
  {
    id: 'norfolk-saltmarsh-20',
    name: 'Norfolk Saltmarsh 20',
    date: '2027-04-11',
    location: 'Cley-next-the-Sea, Norfolk',
    region: 'East Anglia',
    type: 'Trail race',
    distanceKm: 20,
    distanceLabel: '20K',
    elevationM: 90,
    description:
      'Big skies, shingle banks and birdlife. Almost no climbing, which does not mean it is easy — the shingle takes its cut.',
    organiser: 'Sample organiser — to be confirmed',
    url: 'https://example.com/norfolk-saltmarsh-20',
    image: '/images/events/norfolk-saltmarsh-20.svg',
    imageAlt: 'Placeholder artwork: flat saltmarsh channels seen from above',
    featured: false,
    ticketStatus: 'Entries open',
    verified: false,
  },
  {
    id: 'yorkshire-cinder-track-10k',
    name: 'Cinder Track Coastal 10K',
    date: '2026-12-06',
    location: 'Robin Hood’s Bay, North Yorkshire',
    region: 'Yorkshire & Lincolnshire',
    type: 'Road race',
    distanceKm: 10,
    distanceLabel: '10K',
    elevationM: 130,
    description:
      'An old railway line above the sea, run in midwinter. A good first coastal race: firm underfoot, easy to pace, no navigation.',
    organiser: 'Sample organiser — to be confirmed',
    url: 'https://example.com/cinder-track-10k',
    image: '/images/events/yorkshire-cinder-track-10k.svg',
    imageAlt:
      'Placeholder artwork: a straight former railway line tracing a coastline',
    featured: false,
    ticketStatus: 'Entries open',
    verified: false,
  },
  {
    id: 'cumbria-estuary-weekender',
    name: 'Cumbria Estuary Weekender',
    date: '2027-06-12',
    endDate: '2027-06-13',
    location: 'Arnside, Cumbria',
    region: 'Cumbria & the North West',
    type: 'Multi-day',
    distanceKm: 55,
    distanceLabel: '2 days, 55K total',
    elevationM: 900,
    description:
      'Two shortish days around the Kent estuary with a bunkhouse in between. Tide-dependent route; the organiser sets the start time late.',
    organiser: 'Sample organiser — to be confirmed',
    url: 'https://example.com/cumbria-estuary-weekender',
    image: '/images/events/cumbria-estuary-weekender.svg',
    imageAlt: 'Placeholder artwork: a tidal estuary with shifting sand channels',
    featured: false,
    ticketStatus: 'Entries not yet open',
    verified: false,
  },
  {
    id: 'somerset-levels-coastal-16k',
    name: 'Bristol Channel Coastal 16K',
    date: '2026-11-21',
    location: 'Brean Down, Somerset',
    region: 'Somerset & the Bristol Channel',
    type: 'Trail race',
    distanceKm: 16,
    distanceLabel: '16K',
    elevationM: 310,
    description:
      'A short, sharp headland race with one big climb and the second highest tidal range in the world doing its thing below you.',
    organiser: 'Sample organiser — to be confirmed',
    url: 'https://example.com/bristol-channel-coastal-16k',
    image: '/images/events/somerset-levels-coastal-16k.svg',
    imageAlt:
      'Placeholder artwork: a headland jutting into a wide tidal channel',
    featured: false,
    ticketStatus: 'Entries open',
    verified: false,
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
