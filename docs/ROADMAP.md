# Roadmap — beyond the MVP

Ideas captured for later, with the research already done on the parts that
turn out to have constraints. Nothing here is built. The MVP deliberately
stops at content and an email list.

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

### Open questions

- Where do segment boundaries go? Car parks and villages, most likely, so that
  each segment is a runnable outing with somewhere to leave a car.
- Does a segment count if you walked part of it? (Suggest: yes. It is about
  covering the coast, not about proving you ran every step.)
- One coast, or should Wales and Scotland follow? "Run the edge of England" is
  a cleaner promise, but the ambition will come up.
- Does this stay part of the site, or become its own brand?

---

## Smaller things, easier wins

- **Event JSON-LD** once listings carry `verified: true` — real search
  visibility for the directory.
- **GPX downloads** on route pages. The container and the `gpxUrl` field are
  already in place.
- **A real map** on route detail pages. The container is built and sized;
  OS Maps, Mapbox and MapLibre all drop straight in.
- **Filter state in the URL** on `/events`, so people can share a filtered view
  ("all Cornish ultras next spring").
- **An events iCal feed**, so people can subscribe to the calendar.
- **Newsletter archive** as pages on the site — good for search, and it shows
  new visitors what they would be signing up for.
