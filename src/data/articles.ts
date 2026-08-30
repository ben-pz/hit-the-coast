export const articleCategories = [
  'Club story',
  'Route guide',
  'Race report',
  'Beginner advice',
  'Gear review',
] as const;

export type ArticleCategory = (typeof articleCategories)[number];

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'note'; title: string; text: string }
  /**
   * Product blocks are where affiliate links will eventually live. `link` is
   * intentionally null in the MVP — no affiliate programme is in place, and we
   * are not shipping placeholder tracking links that look real.
   */
  | {
      type: 'product';
      name: string;
      verdict: string;
      bestFor: string;
      watchOut: string;
      link: null;
    };

export type Article = {
  slug: string;
  title: string;
  category: ArticleCategory;
  excerpt: string;
  author: string;
  /** ISO date. */
  date: string;
  readingMinutes: number;
  image: string;
  imageAlt: string;
  featured: boolean;
  /** Renders the affiliate-disclosure banner above the article body. */
  containsAffiliateLinks: boolean;
  body: ArticleBlock[];
};

export const articles: Article[] = [
  {
    slug: 'england-coast-path-what-it-means-for-runners',
    title:
      'The King Charles III England Coast Path is open. Here’s what that actually means for runners',
    category: 'Route guide',
    excerpt:
      'A 2,700-mile National Trail around the edge of the country, inaugurated in March 2026. Not all of it is finished. Here is the honest version.',
    author: 'Hit the Coast',
    date: '2026-08-14',
    readingMinutes: 6,
    image: '/images/stories/england-coast-path-what-it-means-for-runners.svg',
    imageAlt:
      'Placeholder artwork: a continuous line tracing the outline of England’s coast',
    featured: true,
    containsAffiliateLinks: false,
    body: [
      {
        type: 'paragraph',
        text: 'On 19 March 2026 the King formally inaugurated the King Charles III England Coast Path at the Seven Sisters in Sussex. When it is complete it will run for around 2,700 miles — the longest managed coastal path in the world, and a continuous right of way around the edge of an entire country.',
      },
      {
        type: 'paragraph',
        text: 'That is a genuinely big deal, and it is worth being precise about it, because the headlines have been a bit loose. At the point of inauguration, Defra and Natural England said around 2,100 miles were open with full access rights in place, and that work continued on the remaining stretches. So: officially open, not entirely finished.',
      },
      {
        type: 'note',
        title: 'Check before you go',
        text: 'Sections still open and close for cliff falls, erosion and works. Always check the National Trails route pages and any local authority notices for the stretch you are running, on the day you are running it.',
      },
      { type: 'heading', text: 'Why runners should care' },
      {
        type: 'paragraph',
        text: 'Most of us already run bits of coast. What changes is the joining-up. A continuous, waymarked, legally secured route means point-to-point runs stop being a puzzle of permissive paths and dead ends. It means you can plan a long weekend around a stretch of coast you have never seen and reasonably expect to get through it.',
      },
      {
        type: 'paragraph',
        text: 'It also means a lot of coast that was previously fenced off, or diverted miles inland, is now runnable. The estuaries and the industrial stretches are the interesting ones here — not classically pretty, often completely empty, and a very different experience from the honeypot cliff sections.',
      },
      { type: 'heading', text: 'What it does not mean' },
      {
        type: 'list',
        items: [
          'It is not a finished, uniform surface. Some of it is engineered path, some of it is a line across a field, some of it is shingle.',
          'It is not all open. Check the section you want before you drive four hours to it.',
          'It is not a safe route by default. Cliff edges are cliff edges, and the tidal sections around estuaries are exactly as serious as they sound.',
          'It does not replace local knowledge. Coastal weather turns fast and the path rarely offers a quick way inland.',
        ],
      },
      { type: 'heading', text: 'Where we are starting' },
      {
        type: 'paragraph',
        text: 'We are Cornish, so we are starting in Cornwall and working outward. Our first routes cover Penwith and the Lizard. If you know a stretch of English coast properly — the parking, the tides, where the water is, which bit is horrible in February — we would like you to write it up. That is how this site gets useful.',
      },
      {
        type: 'note',
        title: 'Sources',
        text: 'Facts in this article come from GOV.UK (“King Charles III England Coast Path inaugurated with royal visit”, 19 March 2026) and the National Trails route pages. Where our summary and an official source disagree, believe the official source and tell us.',
      },
    ],
  },
  {
    slug: 'how-pzx-wasters-started',
    title: 'How PZ×RC started, more or less',
    category: 'Club story',
    excerpt:
      'Nobody set out to found a running club. It began with a group of mates in Penzance, a shared love of the coast path, and a need to put something in the space where the big nights used to be.',
    author: 'Hit the Coast',
    date: '2026-07-22',
    readingMinutes: 4,
    image: '/images/stories/how-pzx-wasters-started.webp',
    imageAlt:
      'Three PZ×RC runners in hooded jackets on the coast path in heavy rain, pulling faces at the camera',
    featured: true,
    containsAffiliateLinks: false,
    body: [
      {
        type: 'paragraph',
        text: 'There was no founding meeting. There was a group of mates in Penzance who had spent a long time being very good at Friday nights and rather less good at Saturday mornings, and who worked out \u2014 slowly, and not all at once \u2014 that running the coast path together was better than the alternative.',
      },
      {
        type: 'paragraph',
        text: 'That is genuinely the whole origin story. A shared love of the path, and a need to put something in the space where the big nights used to be. With the odd big night still chucked in, in fairness. Nobody has ever pretended otherwise.',
      },
      {
        type: 'quote',
        text: 'We started running for better mornings and stayed for the cliffs, the weather and the people.',
      },
      {
        type: 'paragraph',
        text: 'The coast did the rest. Once you have run out to Land’s End at seven in the morning with the sea doing something ridiculous below you, the pub is still fine, but it is no longer the best thing available on a weekend. That is not a moral position. It is just what happened.',
      },
      { type: 'heading', text: 'What we are now' },
      {
        type: 'paragraph',
        text: 'No fixed club night, no membership form, no subs. Some of us race ultras. Some of us have never run further than 5K and have no plans to. Both are entirely the point.',
      },
      {
        type: 'paragraph',
        text: 'The name is a joke about who we used to be. We have kept it because it stops anyone taking us too seriously, including us.',
      },
      { type: 'heading', text: 'Why we built this site' },
      {
        type: 'paragraph',
        text: 'Because finding a coastal race in England is still stupidly hard. The information is scattered across a dozen organiser sites, half of them last updated in 2019. And because the good beginner-friendly social runs — the ones that actually get people outdoors — are almost invisible next to the ultras.',
      },
      {
        type: 'paragraph',
        text: 'So: one place. Races, club runs, routes, and honest writing about the kit. Starting in Cornwall because that is where we know, and heading round the coast from there.',
      },
    ],
  },
  {
    slug: 'first-coast-path-run-nine-things',
    title: 'Your first coast path run: nine things nobody tells you',
    category: 'Beginner advice',
    excerpt:
      'Coastal running is not road running with a view. Here is what surprises people on their first go, and how not to have a miserable time.',
    author: 'Hit the Coast',
    date: '2026-08-02',
    readingMinutes: 5,
    image: '/images/stories/first-coast-path-run-nine-things.svg',
    imageAlt:
      'Placeholder artwork: a waymarker arrow over a stepped elevation profile',
    featured: true,
    containsAffiliateLinks: false,
    body: [
      {
        type: 'paragraph',
        text: 'If your normal run is 10K in fifty minutes, your first 10K on the coast path might take you an hour and a half. This is not a fitness problem. It is what the terrain does, and knowing that in advance is most of the battle.',
      },
      { type: 'heading', text: 'The nine things' },
      {
        type: 'list',
        items: [
          'Distance lies. Ascent tells you more. Ten kilometres with 500m of climbing is a completely different afternoon from ten flat ones.',
          'Walking the climbs is normal. Experienced ultrarunners walk the steep bits. You are allowed to as well.',
          'The wind is the weather. It will be stronger on the cliff top than it was in the car park, and a headwind on an exposed section is genuinely tiring.',
          'Steps are everywhere and they are never a consistent height. Shorten your stride and look two steps ahead, not at your feet.',
          'You will not get phone signal in the dips. Tell someone where you are going and when you expect to be back.',
          'Take more water than you think. There is often nothing between villages, and sea air is dehydrating.',
          'Wet rock, wet grass and wet chalk are all much more slippery than wet tarmac. Slow down on descents before you have to.',
          'The tide closes beaches and low paths. Check it. It is a thirty-second job and it has ended a lot of otherwise nice days out.',
          'Carry a light jacket even when it looks fine. Coastal weather turns quickly and the path rarely offers a fast way inland.',
        ],
      },
      { type: 'heading', text: 'A sensible first route' },
      {
        type: 'paragraph',
        text: 'Pick something short, out-and-back and near a car park, so you can turn round whenever you want. Land’s End to Sennen is our standard recommendation in west Cornwall: under 10K, a clear path, and a beach and a café at the end of it.',
      },
      {
        type: 'note',
        title: 'On feeling out of place',
        text: 'You do not need a club, a coach, a vest or a race entry to run on the coast path. If you are moving, outdoors, and enjoying about sixty per cent of it, you are doing it right.',
      },
    ],
  },
  {
    slug: 'the-ultra-i-did-not-run',
    title: 'The ultra I didn\u2019t run',
    category: 'Club story',
    excerpt:
      'The Classic Quarter was going to be my first ultra. Six weeks out, my back went. Four months later I am starting again from close to nothing \u2014 and building this thing in the meantime.',
    author: 'Benjamin',
    date: '2026-08-30',
    readingMinutes: 4,
    image: '/images/stories/the-ultra-i-did-not-run.webp',
    imageAlt:
      'A runner sitting against a granite South West Coast Path waymarker, sea and cliffs behind, stretching out one leg',
    featured: true,
    containsAffiliateLinks: false,
    body: [
      {
        type: 'paragraph',
        text: 'The Classic Quarter 2026 was going to be my first ultra. Lizard Point to Land\u2019s End, forty-four miles along the bottom edge of Cornwall. I had spent a couple of years building towards something like it without ever quite admitting that was what I was doing \u2014 a couple of marathons, more halves than I can be bothered to count, and a Cousin Jack, which is eighteen miles of the Penwith coast path and the first time I properly understood what this terrain does to a pace chart. The Quarter was the next step up. I had the training in. I was ready for it.',
      },
      {
        type: 'paragraph',
        text: 'Six weeks out, my back went.',
      },
      {
        type: 'paragraph',
        text: 'Not a niggle. Four months of not running at all. I pulled out of the race, and then I spent a summer doing rehab and watching other people\u2019s photos come through from the start line I should have been standing on.',
      },
      {
        type: 'heading',
        text: 'Starting again is its own thing',
      },
      {
        type: 'paragraph',
        text: 'I have tentatively started running again. Tentatively is the word. I am a few kilos heavier than I was in May and most of the fitness has quietly left the building, which is what four months off does whether you deserve it or not. The distances I was doing without thinking about them are now the distances I have to think about.',
      },
      {
        type: 'paragraph',
        text: 'It turns out this is a much less interesting story to tell than a race report, and a much more common one. Most runners spend more time coming back from something than they do on a start line. Nobody writes that bit down.',
      },
      {
        type: 'quote',
        text: 'The plan is not complicated. Get the weight back off, build very slowly through the winter, and be at Lizard Point in June 2027 in a state to enjoy it.',
      },
      {
        type: 'heading',
        text: 'The 2027 plan, and where this site came from',
      },
      {
        type: 'paragraph',
        text: 'I am signed up for the 2027 Classic Quarter. Between now and then the plan is to cover as much of the Cornish coast path as I possibly can \u2014 not as training blocks, but as a thing to tick off. Which is exactly how the tracker on this site came about. I wanted to know how much of it I had actually done, section by section, and there was no good way to find out. So we built one.',
      },
      {
        type: 'paragraph',
        text: 'I should say where I am writing this from, because it matters. I live in Amsterdam. I grew up near Land\u2019s End, just outside Sennen, and this site is unashamedly a way of keeping a line open to home. Building a map of the Cornish coast from a flat country with no cliffs in it is either very sensible or slightly ridiculous, and I have stopped trying to work out which.',
      },
      {
        type: 'paragraph',
        text: 'The other half of it is the friends. A lot of them are in PZ×RC, a group that formed out of a shared love of running the coast path and a need to fill the old party days with something new. With the odd party day still chucked in, in fairness. They are the reason a tracker is worth building at all \u2014 nobody ticks off two hundred and ninety-four miles on their own.',
      },
      {
        type: 'note',
        title: 'If you are coming back from something too',
        text: 'Four miles counts. That is not a consolation prize, it is the actual design of this site: every segment on the tracker is a real outing, and the shortest ones fill the map in exactly the same colour as the long ones.',
      },
    ],
  },
  {
    slug: 'trail-shoes-for-cornish-granite',
    title: 'Trail shoes for Cornish granite: what has actually survived',
    category: 'Gear review',
    excerpt:
      'Wet granite, bog and gorse destroy shoes in a specific way. Notes from the club on what has held up — and what has not.',
    author: 'Hit the Coast',
    date: '2026-08-19',
    readingMinutes: 6,
    image: '/images/stories/trail-shoes-for-cornish-granite.svg',
    imageAlt:
      'Placeholder artwork: an abstract lug pattern over a granite texture',
    featured: false,
    containsAffiliateLinks: false,
    body: [
      {
        type: 'note',
        title: 'How we review',
        text: 'We only write about kit that club members have actually worn out. We do not accept payment for a positive review. If a review ever contains an affiliate link, it will be labelled clearly at the top of the article and in the link itself — and today, none of them do, because we do not run any affiliate programmes yet.',
      },
      {
        type: 'paragraph',
        text: 'The west Cornwall coast path is unusually hard on shoes. It is not just mud: it is wet granite slabs, which need soft rubber, followed by gorse and bracken, which shred soft uppers, followed by long stretches of hard-packed path that eat aggressive lugs. Nothing is good at all three.',
      },
      {
        type: 'paragraph',
        text: 'Rather than pretend there is one answer, here is how we think about the choice. The product notes below are written as placeholders for the format — real named reviews will follow once we have enough mileage on each pair to say something useful.',
      },
      { type: 'heading', text: 'What matters here, in order' },
      {
        type: 'list',
        items: [
          'Wet-rock grip. A soft sticky compound matters more than lug depth on granite and serpentine.',
          'Upper durability. Gorse and bracken will find any thin mesh panel within about 200km.',
          'Drainage. You will go through streams and bog. Shoes that hold water get heavy and cause blisters.',
          'Rock protection. A rock plate or a firm midsole saves your feet on the boulder sections.',
          'Lug depth last. Deep lugs are miserable on the hard-packed and tarmac links between sections.',
        ],
      },
      {
        type: 'product',
        name: 'Soft-compound technical trail shoe — PLACEHOLDER',
        verdict:
          'Placeholder entry showing the review card format. Replace with a specific model once tested over a full winter.',
        bestFor: 'Wet granite, technical coast path, shorter fast runs',
        watchOut: 'Soft rubber wears quickly on hard-packed sections',
        link: null,
      },
      {
        type: 'product',
        name: 'Durable all-round trail shoe — PLACEHOLDER',
        verdict:
          'Placeholder entry showing the review card format. Replace with a specific model once tested over a full winter.',
        bestFor: 'Long days, mixed terrain, ultra distance',
        watchOut: 'Firmer rubber is noticeably less confident on wet rock',
        link: null,
      },
      { type: 'heading', text: 'The unglamorous conclusion' },
      {
        type: 'paragraph',
        text: 'Most people would be better served by one pair of well-fitting, durable, medium-lug trail shoes and a slower descent than by owning three specialist pairs. Buy from somewhere that lets you return them, and run the first few kilometres somewhere you can walk home from.',
      },
    ],
  },
  {
    slug: 'st-ives-to-zennor-route-guide',
    title: 'St Ives to Zennor: the hardest eleven kilometres in England',
    category: 'Route guide',
    excerpt:
      'Everybody underestimates this stretch. A practical guide to running it without hurting yourself or missing the last bus.',
    author: 'Hit the Coast',
    date: '2026-05-18',
    readingMinutes: 5,
    image: '/images/stories/st-ives-to-zennor-route-guide.svg',
    imageAlt:
      'Placeholder artwork: densely packed contour lines along an indented coast',
    featured: false,
    containsAffiliateLinks: false,
    body: [
      {
        type: 'paragraph',
        text: 'Eleven kilometres. Five hundred and twenty metres of climbing. Two and a half hours, if it has rained. This is the section of the South West Coast Path that turns confident road runners into careful hikers, and it is the best run in west Cornwall.',
      },
      { type: 'heading', text: 'What the ground is actually like' },
      {
        type: 'paragraph',
        text: 'Granite boulders, hidden steps, stream crossings, bracken tunnels and bog between the headlands. There is no rhythm to it. You will run for ninety seconds, scramble for thirty, and repeat that for two hours.',
      },
      { type: 'heading', text: 'Logistics' },
      {
        type: 'list',
        items: [
          'Run it one-way, west to east or east to west, and sort transport before you start. Bus services between Zennor and St Ives are limited — check the current timetable.',
          'Allow at least double your usual 11K time. Three hours is not a slow day on this section.',
          'Take water. There is nothing on the route.',
          'Phone signal is patchy. Leave your plan with someone.',
        ],
      },
      {
        type: 'note',
        title: 'Conditions change',
        text: 'Do not treat this or any route on the site as safe in all conditions. Cliff paths close, weather turns, and this section in particular is genuinely serious in the wet or the dark. Check current local guidance before you set off.',
      },
    ],
  },
];

export const featuredArticles = articles.filter((article) => article.featured);

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function sortedArticles(): Article[] {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date));
}
