# Roadmap — beyond the MVP

Ideas captured for later, with the research already done on the parts that
turn out to have constraints.

**The coast tracker is the site's main feature.** It leads the homepage, it is
first in the navigation, and signing up to the newsletter is how someone gets an
account on it when accounts exist. Events, routes and editorial sit underneath
it — they are what makes the site worth finding, but the tracker is what makes
it worth returning to.

---

## The big one: coast completion tracking

**Benjamin's idea, as described (August 2026):**

> People map and track which parts of the coast they have completed. They add
> their own data, verified somehow by Strava. Point-to-point routes they can
> time and tick off one by one — and if they do more than one in a session,
> that gets tracked too. Leaderboards. This could be an app.

### Why it's a strong idea

The King Charles III England Coast Path is ~2,700 miles of continuous,
waymarked, legally secured route around an entire country. Nothing else in
England has that shape. "I have run 340 of the 2,700 miles" is a number people
will genuinely chase for years — the same instinct that drives Munro bagging,
county collecting and the Wainwrights, none of which are about speed.

It also fixes the site's retention problem. A directory gives someone a reason
to visit twice. A progress map gives them a reason to come back every week for
a decade, and a reason to tell other runners about it.

And it is defensible in a way the directory is not. Anyone can list races.
Nobody else holds the map of who has run which bits of the English coast.

### Two constraints found before building

**1. Strava's API will not let you build the leaderboard.**

From Strava's API Agreement, which is unambiguous:

> "Strava Data provided by a specific user can only be displayed or disclosed
> in your Developer Application to that user. Strava Data related to other
> users, even if such data is publicly viewable on the Strava Platform, may not
> be displayed or disclosed."

And separately:

> "You may not create applications that compete with or replicate Strava
> functionality."

A leaderboard is, by definition, showing one athlete's data to another. Timed
point-to-point segments with rankings is close to a description of Strava
segments. Strava also tightened these rules sharply in late 2024 and broke a
lot of existing apps in the process, so building the core of a business on
their API is strategically risky even where it is permitted.

**The way round it is better than the original plan anyway:** do not treat
Strava as the data source. Take a **GPX file** — which the runner can export
from Strava, Garmin, Coros, Suunto, a phone app, anything — and verify it
yourself. A GPX the user hands you directly is their own file, not Strava Data
pulled through Strava's API, and what you derive from it is yours to display
with their consent.

That also means the app works for the substantial number of runners who do not
use Strava, and you are never one policy change away from losing the product.
Strava OAuth can still exist as an optional convenience for importing a
runner's own activities into their own private view — that use is permitted.

**2. A speed leaderboard on cliff paths is the wrong incentive.**

Strava has removed leaderboards from specific dangerous descents, and was sued
(unsuccessfully, but it happened) over a cyclist who died chasing a KOM. The
South West Coast Path between St Ives and Zennor is unfenced granite scrambling
above the sea. A "fastest time" board on that section actively rewards running
it fast, in the wet, in poor light.

That also flatly contradicts the responsible-running note the site already
carries, which would make it look like the safety copy is decoration.

### The design that solves both

Make it **completion-first, not speed-first**. This is a better product, not a
compromised one.

- The headline number is **coverage**: miles of the English coast run, as a
  percentage of ~2,700, with a map that fills in as you go.
- Collect **regions and counties** the way people collect Munros. Finishing all
  of Cornwall is an achievement worth a badge.
- Leaderboards rank by **distance covered, regions completed, or streaks** —
  never by speed on a given stretch. Nobody dies from being beaten on total
  miles.
- **Timing is opt-in per route, set by whoever writes the route up.** The route
  data already carries a `difficulty` field; add `timedSegment: boolean` and
  only ever set it true for genuinely safe ground — promenades, the Cinder
  Track, beach miles, disused railway lines. Never a cliff path, never
  technical terrain, never anything tidal.
- Multi-route sessions fall out naturally: one GPX can satisfy several adjacent
  segments at once. Match the track against every segment it covers.

This keeps the ambitious runners (a leaderboard of total coast covered is a
serious thing to top) without telling beginners the point is to go fast, which
is the same balance the site's copy already tries to strike.

### Rough shape of the data

```
Segment        id, name, region, start/end points, polyline, distance,
               official (part of the Coast Path) | community-added,
               timedSegment: boolean

Completion     userId, segmentId, date, source ('gpx' | 'manual'),
               evidenceId, verified: boolean, elapsedSeconds (nullable)

Evidence       uploaded GPX, its checksum, computed coverage % per segment,
               plausibility flags

User           profile, consent flags (show me on leaderboards y/n),
               home region
```

Verification, in increasing order of effort — ship the first, add the rest only
if cheating actually becomes a problem:

1. Does the track geometrically cover the segment, within a tolerance?
2. Are the timestamps monotonic and the speeds plausible for the terrain?
3. Does the elevation profile roughly match the known profile?
4. Manual review for anything that lands in the top ten.

### Profiles, badges and sharing

**Benjamin's idea (August 2026):**

> Visitors have their own profile, mostly so they can see the % of the coast
> they have covered and share it with friends. They can also get Bronze
> (25%), Silver (50%) and Gold (100%) badges for completing counties of the
> coast, and the same three badges again for the whole coast. Each badge can
> have its own name representing the county. (Counties, not the site's
> internal areas — more counties are being added after Cornwall, working
> towards the full 2,700 miles.)

**Why it's worth building.** The coverage percentage is already the site's
headline number — this asks for two things on top of it: a page worth
linking to, and a reason to link to it. A private tracker only motivates the
person using it; a shareable one also markets the site every time someone
posts their progress. Badges give the percentage shape and stakes, the same
trick that makes Munro bagging, Park Run milestones and Duolingo streaks
work — a round number people chase for its own sake.

It also costs almost nothing extra to build, once accounts exist. A badge is
not a new kind of data — it is a threshold read off numbers the tracker
already computes: miles done in a county, divided by that county's total,
the same arithmetic behind the percentage already shown on `/coast` today.
There is no `Badge` table to design or keep in sync; a badge is derived at
request time from `Completion` rows plus the static county totals in
`coast-segments.ts`, so it can never drift the way a stored, cached badge
could.

**How the tiers work.**

- **Per county, not per area.** Bronze at 25% of that county's miles done,
  Silver at 50%, Gold at 100%. This is the `coastRegions` grouping already in
  `coast-segments.ts` — Cornwall, then Devon, Dorset & the Jurassic Coast,
  Somerset & the Bristol Channel, and on round the country — not the finer
  six-way split (North Cornwall, The Atlantic Coast, etc.) the tracker uses
  for browsing within a county. Counties are the unit the site is actually
  built to grow by: `coastRegions` already lists nine, one `'live'`
  (Cornwall) and eight `'planned'`, and going live is already just a status
  flip plus appending stages (see **Build order** item 1, above). A new
  county's badge set falls out of that same flip — nothing extra to build
  per county, beyond a `milesInRegion()` helper alongside the `milesInArea()`
  that already exists, grouping by `region` instead of `area`.
- **Whole coast:** the same three tiers again, against the full route —
  ~2,700 miles once every county is live. Today, with only Cornwall live,
  the whole-coast total and Cornwall's are the same number, so the
  whole-coast badges and Cornwall's are briefly identical until Devon ships;
  worth a note on the profile UI so that isn't confusing early on. Once
  there is more than one county, whole-coast Gold — the entire path,
  every county — is the big one, and should look visibly bigger than any
  single county's gold.
- **Naming:** the idea is that each badge carries a name of its own, rather
  than "Cornwall — Gold" repeated three times. That's branding work, not
  engineering — a deliberate naming pass, one name per county reused across
  its own bronze/silver/gold, is worth doing properly as each county goes
  live rather than inventing names on the fly, in keeping with the site's
  rule against anything that reads as more official or more established
  than it actually is. Nine counties, eventually, means nine names to find
  — no rush, since they only need to exist once a county is live.

**What it needs.** This sits directly on top of the accounts work the
tracker already calls for (Build order step 3, below) — it doesn't add a new
prerequisite, it's mostly what falls out once that step is done:

- **Accounts and synced progress**, so a percentage belongs to a person and
  not just a browser. Nothing here works before that.
- **A public profile page** (`/u/[handle]` or similar) showing the headline
  percentage, the per-county breakdown, and earned badges. Reuses the
  `visibility` field already sketched in the social layer's `User` model
  below — private by default, like everything else location-shaped on this
  site.
- **A shareable image, not just a link.** A badge someone can screenshot is
  fine; a badge the site generates as a clean image — name, percentage,
  badge — so it posts well to Instagram or WhatsApp without a screenshot is
  what actually gets shared. Cloudflare Workers can render this server-side
  reasonably cheaply — worth scoping properly once profiles exist, not
  before.

Open questions worth settling before building rather than during: whether
the whole-coast Gold gets a distinct name and look as the rarest badge
(probably yes); whether badges are public by default or only appear on a
share image the person explicitly generates, keeping the profile itself
private-by-default (leans towards the latter, consistent with the privacy
defaults in the social layer below); and whether badges carry the date
completed, the way a race medal would (a nice detail, not required for v1).

### Build order

Do not build the app first. The app is worth nothing without segments, and
segments are content.

1. ~~**Segment the coast.**~~ **DONE for Cornwall** — `src/data/coast-segments.ts`.
   45 point-to-point segments, 294.5 miles, from Marsland Mouth round to
   Cremyll. The backbone is the South West Coast Path Association's own
   published stage list; most stages are split once more at a real intermediate
   place with parking and a bus, giving 32 half days (4–7.5 miles) and 13 full
   days (8–10 miles). Stages left whole are the ones with no sensible way off
   in the middle, or that depend on a ferry — the ground decided the mixture.
   Each split pair still sums to the Association's published stage distance, so
   the totals stay sourced even where the split point is our estimate.

   Adding a region is additive: set its `status` to `'live'` in `coastRegions`
   and append its stages. Nothing else changes. Devon and the Jurassic Coast
   next, same method.
2. ~~**Manual ticking, no accounts.**~~ **DONE** — `/coast`. Ticks are stored in
   the visitor's browser, no backend, still on the free static host. This is
   the experiment: if people use it, build the rest. If they do not, nothing
   was wasted.
3. **Accounts and GPX upload.** ← you are here. Now you need a real backend and
   a database; Supabase or Cloudflare D1 both have usable free tiers. This is
   also where segment geometry becomes essential — see below.
4. **Verification and leaderboards** by coverage.
5. **Opt-in timing** on the small set of safe segments, if people ask for it.
6. **Native app**, only if the web version proves people use it on the move.
   A well-built responsive web app covers most of this, and skipping the app
   stores avoids review cycles and a second codebase for a long while.

### The next real blocker: geometry

`coast-segments.ts` carries names and distances but no coordinates and no route
line, because those cannot be estimated — a GPX either covers a segment or it
does not, and a guessed polyline would silently pass or fail people's runs.

Get the geometry from the National Trail GPX or OS Open Data, split it at the
segment boundaries, and store a simplified polyline per segment. That single
piece of work unlocks the map, the verification and everything downstream.

---

## The social layer: tips, ratings, reviews, friends

**Benjamin's idea (August 2026):**

> The ability for people to leave a rating and a review, or more importantly a
> tip, on the part of the coast they completed. And to add friends, so there is
> a social element. The coast tracker is the main feature.

### Tips are not the same product as ratings

These get lumped together and they should not be. The difference decides the
build order:

| | Useful when? | Needs accounts? | Moderation |
| --- | --- | --- | --- |
| **Tip** | Immediately, from one person | No | Read every one |
| **Rating** | Only at ~30+ per segment | Yes | Rate-limit, dedupe |
| **Review** | ~5+ per segment | Yes | Report + remove |

A tip — "the lower car park floods on a spring tide, use the one at the top" —
is worth the whole page on its own, forever, to everyone who reads it. A single
rating is noise. So tips ship first, and they shipped: `src/data/segment-tips.ts`,
shown on each segment page, submitted by email and read by a human before going
up. Manual is a feature at this size, not a shortcut — the value of the page is
that everything on it is true.

Ratings and reviews wait for accounts, because without an identity you cannot
rate-limit, dedupe or remove anything.

### Data model for when accounts land

```
User          id, displayName, avatar, homeRegion, createdAt,
              visibility ('private' | 'friends' | 'public')

Friendship    requesterId, addresseeId, status ('pending'|'accepted'|'blocked'),
              createdAt, respondedAt
              -- one row per pair, ordered ids, so it cannot duplicate

Completion    userId, segmentId, date, source ('manual'|'gpx'), verified

Tip           id, segmentId, userId, category, text, status
              ('pending'|'published'|'rejected'), publishedAt
              -- keep the moderation queue even when it is self-serve

Review        id, segmentId, userId, rating 1-5, text, createdAt,
              editedAt, reportCount
              -- one per user per segment, editable, never anonymous

SegmentStats  segmentId, ratingCount, ratingMean, tipCount
              -- denormalised, recomputed on write; never aggregate on read
```

Three constraints worth designing in from the start:

1. **One review per person per segment**, editable. Stops the obvious gaming and
   means the average actually means something.
2. **Ratings hidden until a threshold** (say 5). Showing "5.0 from one review"
   is worse than showing nothing.
3. **Friendship is mutual and requires acceptance.** A follow model would be
   simpler, but this is a small community of people who actually know each other
   — mutual is the right shape and avoids one-way surveillance.

### Friends: the privacy decisions to make before writing any of it

This is the part that is easy to get wrong and hard to undo, because it is
inherently about location history. Somebody's completed segments plus dates is a
map of where they run and when.

- **Default to private.** A new account shows nothing to anyone until the person
  chooses otherwise. Never default to public on a location product.
- **Three visibility levels, set by the user:** private, friends only, public.
  Applied per account, with a per-completion override if it is ever needed.
- **Friends see completions, not timestamps to the minute.** "Ran this in
  March" is sociable; "Tuesday 07:14 every week" is a pattern somebody could
  use.
- **Leaderboards are opt-in**, separately from profile visibility. Wanting to
  compare with your mates is not the same as wanting to be on a public board.
- **Blocking must actually block** — no completions, no profile, no appearing in
  the same friend list view.
- **Deletion means deletion.** One button that removes the account and its
  completions. Cheap to build now, expensive to retrofit.

None of this is legal advice, and if the site ever holds accounts for people in
the UK it is worth half an hour reading the ICO's guidance on personal data —
location history for identifiable people is squarely in scope.

### The build order this implies

1. ~~**Tips, manually curated.**~~ **DONE** — no backend, useful immediately.
2. **Accounts.** Everything social is blocked on this. Supabase or Cloudflare D1;
   both have free tiers that comfortably cover a few hundred friends-and-family
   users.
3. **Progress syncing.** Move `lib/coast-progress.ts` from localStorage to the
   API. Deliberately the only file that needs to change.
4. **Friends**, with the privacy defaults above.
5. **Self-serve tips**, still with a moderation queue.
6. **Reviews**, then ratings once there is enough volume for an average to mean
   something.

### Open questions

- Where do segment boundaries go? Car parks and villages, most likely, so that
  each segment is a runnable outing with somewhere to leave a car.
- Does a segment count if you walked part of it? (Suggest: yes. It is about
  covering the coast, not about proving you ran every step.)
- One coast, or should Wales and Scotland follow? "Run the edge of England" is
  a cleaner promise, but the ambition will come up.
- Does this stay part of the site, or become its own brand?

---

## Segment photos

**Benjamin's idea (August 2026):**

> The ability for users to post photos of each section. Would need content
> moderation, I guess. But it would help motivate people to run.

It is a good idea, and for the same reason tips are: a car park and a distance
tell you nothing about a segment. A photo of the actual headland tells you
whether it is worth getting up for. "See what you are running towards" is a
stronger motivator than a mileage counter on its own, and it is exactly the
kind of content a directory site cannot fake — it has to come from someone who
was actually there.

### Ship the useful version now; the automated version waits on accounts

This splits the same way tips did, and for the same reason: self-serve upload
needs somewhere to put the moderation queue, which needs accounts, which are
not built yet. But the *value* of "see the segment before you commit to it"
does not need self-serve upload to exist — it needs photos on the page.

**Now, no backend — the tips playbook again:**
Add a "Send us a photo from this section" mailto link next to the existing
"Add a tip" one (`src/data/segment-tips.ts` already carries the pattern).
Someone sends a photo from their run; Benjamin looks at it, and if it is a
genuine shot of that stretch it goes into a new `segment-photos.ts` with the
file committed under `public/images/segments/`. Zero backend, zero moderation
risk — Benjamin *is* the moderation, the same trust model the site already
runs on for tips — and it ships today rather than waiting on the accounts
work below. At "a base of friends" volume this is a handful of emails a week,
which is not a queue, it is an inbox.

**Later, self-serve — once accounts and a backend exist anyway:**
True in-browser upload needs three things the tracker's own next stage
(*Accounts and GPX upload*, above) already requires, so it should not be
built before that: an identity to attribute a photo to and rate-limit;
storage (Cloudflare Images or R2 — R2 has no egress fee, Images' free tier
covers 5,000 transforms a month, comfortably enough at this scale); and a
moderation step before anything goes public.

On moderation specifically: Cloudflare Workers AI does not currently ship a
purpose-built moderation model — the image classifier available there
(ResNet-50) sorts into the standard 1,000 ImageNet categories (dog breeds,
household objects), not moderation categories. Dedicated moderation APIs exist
(AWS Rekognition Moderation, Google Cloud Vision SafeSearch, Sightengine) at
roughly $1 per 1,000 images, which is genuinely cheap even at real volume —
but it is also more than this site needs on day one.

Follow the same escalating-effort rule the GPX verification above already
uses — ship the cheap version, add the expensive one only once volume makes it
necessary:

1. **Everything lands in a private "pending" queue.** Nothing is public until
   an admin approves it. This alone is a real backstop, and for a
   friends-and-club site it will likely stay sufficient for a long time —
   manual review only becomes the bottleneck once submissions are constant,
   which is a good problem to have.
2. **An automated pre-filter**, only once (1) is genuinely too slow — one of
   the moderation APIs above, run before anything reaches the queue, so a
   human only ever sees borderline cases.

A photo also fits naturally onto the `Completion` model already sketched
above — optional evidence attached when someone marks a segment done, not
necessarily a separate gallery feature. "Here is proof, and here is what it
looked like" is one upload, not two.

### Build order this implies

1. ~~**Photos, manually curated**~~ **DONE** — mailto plus a data file, same
   shape as tips; see `src/data/segment-photos.ts` and the Photos section on
   each segment page.
2. Everything else waits on **Accounts** (already the first blocker for the
   social layer above) and **storage** (Cloudflare Images or R2).
3. **Self-serve upload** into a private moderation queue.
4. **Automated pre-filtering**, only if queue volume actually demands it.

---

## Smaller things, easier wins

- ~~**Event JSON-LD**~~ **DONE** — shipped alongside the three verified
  events; see `StructuredData.tsx`.
- **GPX downloads** on route pages. The container and the `gpxUrl` field are
  already in place.
- **A real map** on route detail pages. The container is built and sized;
  OS Maps, Mapbox and MapLibre all drop straight in.
- **Filter state in the URL** on `/events`, so people can share a filtered view
  ("all Cornish ultras next spring").
- **An events iCal feed**, so people can subscribe to the calendar.
- **Newsletter archive** as pages on the site — good for search, and it shows
  new visitors what they would be signing up for.
