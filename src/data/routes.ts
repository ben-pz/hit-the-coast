import type { Difficulty, Region } from './taxonomy';

export type CoastalRoute = {
  slug: string;
  name: string;
  region: Region;
  start: string;
  finish: string;
  /** True when start and finish are the same place. */
  loop: boolean;
  distanceKm: number;
  elevationM: number;
  difficulty: Difficulty;
  /** Honest range rather than a single hero time. */
  estimatedTime: string;
  terrain: string[];
  summary: string;
  /** Long-form description, one string per paragraph. */
  description: string[];
  transport: string;
  parking: string;
  water: string[];
  food: string[];
  seasonal: string[];
  safety: string[];
  /** GPX placeholder — no file is shipped in the MVP. See /public/gpx/README. */
  gpxUrl: string | null;
  image: string;
  imageAlt: string;
  featured: boolean;
  /**
   * SAMPLE DATA FLAG — see the note on `CoastalEvent.verified`.
   * Distances, ascent and facilities below are indicative and have not been
   * re-surveyed. Check current conditions before you run.
   */
  verified: boolean;
};

export const routes: CoastalRoute[] = [
  {
    slug: 'lands-end-to-sennen-and-back',
    name: 'Land’s End to Sennen and back',
    region: 'Cornwall',
    start: 'Sennen Cove car park',
    finish: 'Sennen Cove car park',
    loop: true,
    distanceKm: 9.5,
    elevationM: 210,
    difficulty: 'Gentle',
    estimatedTime: '1h 10m – 2h',
    terrain: ['Coast path', 'Granite steps', 'Short beach section', 'Grass'],
    summary:
      'The best short introduction to Cornish coast running. Big views, a clear path and a beach and a café at the end of it.',
    description: [
      'If you have never run on the coast path before, start here. From Sennen the path climbs gently along the cliff edge to Land’s End, which is touristy and unapologetic about it, and then you turn round and get the better view on the way back — the whole sweep of Whitesand Bay with the surf lined up behind it.',
      'It is short enough that you can walk the climbs and still feel like you have done something. It is also exposed for almost its entire length, so it is a very different run in a westerly gale than it is on a still September evening. Both are worth doing. Only one of them needs a jacket you trust.',
      'Runners wanting more can continue north from Sennen towards Cape Cornwall, which turns this into a much harder day.',
    ],
    transport:
      'Bus services run to Sennen and Land’s End from Penzance; check current timetables, as winter frequency drops sharply.',
    parking:
      'Paid car park at Sennen Cove. It fills early on summer weekends — the overflow above the village is usually the better bet.',
    water: ['Taps and toilets at Sennen Cove', 'Facilities at Land’s End'],
    food: ['Cafés and a pub at Sennen Cove', 'Food outlets at Land’s End'],
    seasonal: [
      'Busy with walkers between May and September — expect to slow down and say hello a lot.',
      'Winter brings genuinely serious wind on this corner of the country. Waves overtop the Sennen slipway in a big swell.',
    ],
    safety: [
      'The path runs close to unfenced cliff edges. Keep well back, especially in wind or when passing.',
      'The beach section is only usable around low water — check tide times before you set off.',
    ],
    gpxUrl: null,
    image: '/images/routes/lands-end-to-sennen-and-back.svg',
    imageAlt:
      'Placeholder artwork: contour lines and a bay, representing Whitesand Bay',
    featured: true,
    verified: false,
  },
  {
    slug: 'st-ives-to-zennor',
    name: 'St Ives to Zennor',
    region: 'Cornwall',
    start: 'St Ives harbour',
    finish: 'Zennor village',
    loop: false,
    distanceKm: 11,
    elevationM: 520,
    difficulty: 'Hard',
    estimatedTime: '1h 45m – 3h',
    terrain: ['Rocky coast path', 'Boulder steps', 'Bog', 'Bracken'],
    summary:
      'Famously the most technical stretch of the South West Coast Path. Slow, brilliant and not a place to chase a time.',
    description: [
      'Everybody underestimates this one. Eleven kilometres sounds like an hour. It is not. The path between St Ives and Zennor is a continuous scramble of granite boulders, hidden steps, stream crossings and bracken tunnels, and it will take a competent trail runner well over two hours in the wet.',
      'It is also the most spectacular thing in west Cornwall. No roads, no phone signal in the dips, seals in the coves and the sense that the landscape has not been tidied up for anybody. Run it slowly. Look up often.',
      'Most people run this one-way and get a lift, taxi or bus back. Doing it as an out-and-back is a serious day.',
    ],
    transport:
      'Bus between Zennor and St Ives runs limited services; confirm the timetable before committing to a one-way run.',
    parking:
      'Park in St Ives (paid, busy) and travel back from Zennor, or leave a car at Zennor and start there.',
    water: ['Nothing on the route itself', 'Tap at the Zennor village hall area'],
    food: ['Pub and café at Zennor', 'Everything in St Ives'],
    seasonal: [
      'Bracken swallows the path in high summer — long socks help.',
      'After heavy rain the bog sections between headlands are ankle-deep and the granite is genuinely slippery.',
    ],
    safety: [
      'Patchy phone signal. Tell someone your plan and your expected finish time.',
      'Ankle injuries are the common failure here, not fitness. Grippy shoes and a slow first half.',
      'There are no easy escape routes back inland for long stretches.',
    ],
    gpxUrl: null,
    image: '/images/routes/st-ives-to-zennor.svg',
    imageAlt:
      'Placeholder artwork: tight contour lines above a rugged, indented coastline',
    featured: true,
    verified: false,
  },
  {
    slug: 'mounts-bay-marazion-loop',
    name: 'Mount’s Bay: Penzance to Marazion',
    region: 'Cornwall',
    start: 'Penzance harbour',
    finish: 'Penzance harbour',
    loop: true,
    distanceKm: 12,
    elevationM: 70,
    difficulty: 'Gentle',
    estimatedTime: '1h – 1h 30m',
    terrain: ['Promenade', 'Compacted path', 'Beach at low water'],
    summary:
      'Flat, obvious and beautiful. The route the club runs when the weather is filthy and everyone still wants to be outside.',
    description: [
      'This is our home run. Out along the promenade past the Jubilee Pool, onto the path behind the beach, and all the way to Marazion with St Michael’s Mount sitting there being unreasonably photogenic the entire way.',
      'It is the easiest route on the site and the one we send new runners to first. No navigation, no cliffs, a hard surface most of the way and a turnaround point with several places to buy a coffee.',
      'On a spring tide at low water you can run a good part of the return on firm sand, which is a completely different and much better run.',
    ],
    transport:
      'Penzance rail and bus stations are at the start. Marazion is served by buses from Penzance.',
    parking: 'Several paid car parks in Penzance; harbour car park is closest.',
    water: ['Taps and toilets in Penzance', 'Facilities at Marazion'],
    food: ['Plenty in Penzance', 'Cafés and pubs in Marazion'],
    seasonal: [
      'Storm surges can put waves over the promenade in winter — the seafront is sometimes closed and it is closed for a reason.',
      'The beach return is only there at lower states of the tide.',
    ],
    safety: [
      'Check the tide before planning to run back along the sand; the bay covers quickly.',
      'The promenade is shared with walkers, dogs and cyclists.',
    ],
    gpxUrl: null,
    image: '/images/routes/mounts-bay-marazion-loop.svg',
    imageAlt:
      'Placeholder artwork: a wide shallow bay with an island silhouette',
    featured: true,
    verified: false,
  },
  {
    slug: 'cape-cornwall-tin-coast-loop',
    name: 'Cape Cornwall & the Tin Coast loop',
    region: 'Cornwall',
    start: 'Cape Cornwall car park',
    finish: 'Cape Cornwall car park',
    loop: true,
    distanceKm: 17,
    elevationM: 640,
    difficulty: 'Moderate',
    estimatedTime: '2h – 3h 15m',
    terrain: ['Coast path', 'Mine tracks', 'Field paths', 'Lanes'],
    summary:
      'Engine houses, cliffs and old mine workings on a stretch of coast that looks like nowhere else in England.',
    description: [
      'North from Cape Cornwall past Botallack, where the engine houses cling to the cliff below the path, then inland on mine tracks and field paths to loop back. It is the route to bring visitors on if you want them to understand why people stay in west Cornwall.',
      'The ground is mixed: proper coast path on the way out, then rougher and boggier on the return. Navigation matters more than on the out-and-back routes here — it is worth having the line on your watch.',
    ],
    transport:
      'Buses serve St Just, about 1.5km from Cape Cornwall, from Penzance.',
    parking: 'Small paid car park at Cape Cornwall; larger options in St Just.',
    water: ['Nothing reliable on the route', 'Taps and shops in St Just'],
    food: ['Cafés, bakery and pubs in St Just', 'Seasonal café at Botallack'],
    seasonal: [
      'The inland return is very wet from November to March.',
      'Mining heritage areas are open ground — stay on marked paths.',
    ],
    safety: [
      'Old mine workings: unfenced shafts exist off-path in this landscape. Do not explore off the marked route.',
      'Exposed and often windy. Committing in poor visibility.',
    ],
    gpxUrl: null,
    image: '/images/routes/cape-cornwall-tin-coast-loop.svg',
    imageAlt:
      'Placeholder artwork: cliffs with engine-house shapes and mine tracks',
    featured: false,
    verified: false,
  },
  {
    slug: 'lizard-point-kynance-loop',
    name: 'Lizard Point & Kynance Cove loop',
    region: 'Cornwall',
    start: 'Lizard village green',
    finish: 'Lizard village green',
    loop: true,
    distanceKm: 13,
    elevationM: 380,
    difficulty: 'Moderate',
    estimatedTime: '1h 30m – 2h 30m',
    terrain: ['Coast path', 'Serpentine rock', 'Steps', 'Grass'],
    summary:
      'The southern tip of England, plus the best-looking cove on this coast. Short, steep steps and no shade.',
    description: [
      'A neat loop from the village out to Lizard Point, then north-west along the cliffs to Kynance Cove, and back across the fields. The serpentine rock underfoot goes glassy in the wet, which is the one thing to know before you commit.',
      'Kynance is at its best either very early or out of season. In August you will be dodging queues for the café, which rather breaks the spell.',
    ],
    transport: 'Buses run to Lizard village from Helston and Redruth.',
    parking: 'Paid parking in Lizard village and at Kynance Cove (seasonal).',
    water: ['Village shops and cafés in Lizard', 'Seasonal café at Kynance Cove'],
    food: ['Pasty shops and cafés in Lizard village'],
    seasonal: [
      'Kynance Cove café and facilities are seasonal.',
      'The lower Kynance beach is tidal and cut off around high water.',
    ],
    safety: [
      'Wet serpentine is genuinely slippery — take the steps carefully.',
      'Sheer, unfenced drops on the cliff sections.',
    ],
    gpxUrl: null,
    image: '/images/routes/lizard-point-kynance-loop.svg',
    imageAlt:
      'Placeholder artwork: a rounded headland with a deep cove cut into it',
    featured: false,
    verified: false,
  },
  {
    slug: 'seven-sisters-cuckmere-loop',
    name: 'Seven Sisters & Cuckmere Haven',
    region: 'Sussex, Kent & the South East',
    start: 'Seaford seafront',
    finish: 'Seaford seafront',
    loop: true,
    distanceKm: 16,
    elevationM: 480,
    difficulty: 'Moderate',
    estimatedTime: '1h 40m – 2h 45m',
    terrain: ['Chalk downland', 'Grass', 'Shingle', 'Hard track'],
    summary:
      'The first route outside Cornwall on the site, on the stretch of coast where the King Charles III England Coast Path was inaugurated.',
    description: [
      'Seven chalk hills in a row, each one steeper than it looks from the last. Out over Seaford Head, down to Cuckmere Haven and then the full switchback to Birling Gap before an easier inland return.',
      'The grass is fast when dry and treacherous when wet — chalk and grass on a slope is a bad combination. There is no water and no shade on the cliff section.',
      'We are adding routes outside Cornwall gradually. If you know a stretch of English coast well and want to write it up properly, get in touch.',
    ],
    transport:
      'Seaford is on the rail network with regular services from Lewes and Brighton.',
    parking: 'Paid parking in Seaford and at Exceat for the Cuckmere valley.',
    water: ['Seaford seafront facilities', 'Seasonal facilities at Birling Gap'],
    food: ['Cafés and pubs in Seaford', 'Café at Birling Gap'],
    seasonal: [
      'Very exposed to southerlies; the cliff top is no place to be in a storm.',
      'The Cuckmere river crossing point depends on the current route and any diversions — check locally.',
    ],
    safety: [
      'Chalk cliffs here collapse without warning. Keep a long way back from the edge, and never sit on the edge for a photograph.',
      'Wet chalk grass is extremely slippery on descents.',
    ],
    gpxUrl: null,
    image: '/images/routes/seven-sisters-cuckmere-loop.svg',
    imageAlt:
      'Placeholder artwork: seven repeating chalk-cliff humps above the sea',
    featured: false,
    verified: false,
  },
];

export const featuredRoutes = routes.filter((route) => route.featured);

export function getRoute(slug: string): CoastalRoute | undefined {
  return routes.find((route) => route.slug === slug);
}
