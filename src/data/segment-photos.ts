/**
 * Photos submitted from coast segments.
 *
 * ── WHY THIS STARTS EMPTY, UNLIKE segment-tips.ts ───────────────────────────
 *
 * Sample tips are fine because a tip is generic, checkable advice — "the lower
 * car park floods on a spring tide" is either true or it is not, and it is
 * clearly badged as an unverified sample either way. A photo makes a much more
 * specific claim: "this is what this exact stretch of coast looks like, and
 * somebody was really there." Faking one — stock art, an AI image, anything not
 * actually taken on that segment — would be exactly the kind of dishonesty this
 * site's rules exist to rule out. So there are no placeholder photos below.
 * Real ones only, added by hand as they arrive.
 *
 * ── HOW A PHOTO GETS HERE ───────────────────────────────────────────────────
 *
 * Same loop as tips: someone sends one from a segment page (a mailto, photo
 * attached), you check it is genuinely of that stretch, save the file into
 * `public/images/segments/` (keep it under ~500KB — WebP or compressed JPEG,
 * roughly 1600px on the long edge is plenty), and add an entry below crediting
 * their first name. Manual on purpose, at this size: it is the only moderation
 * this needs. See docs/ROADMAP.md → "Segment photos" for the plan once
 * self-serve upload is worth building.
 */

export type SegmentPhoto = {
  id: string;
  /** Matches a `CoastSegment.id` in coast-segments.ts. */
  segmentId: string;
  /** Path under /public/images/segments/. */
  image: string;
  /** Plain description of what is in the shot — required, since these are real photographs, not decoration. */
  alt: string;
  /** First name only, as submitted. No accounts yet, so no profiles to link. */
  credit: string;
  /** ISO date the photo was added to the site. */
  added: string;
};

export const segmentPhotos: SegmentPhoto[] = [
  // Empty until real photos come in from people who have actually run these
  // segments. Add one entry per photo — see the comment above for the loop.
];

export function photosForSegment(segmentId: string): SegmentPhoto[] {
  return segmentPhotos.filter((photo) => photo.segmentId === segmentId);
}

export function photoCountFor(segmentId: string): number {
  return photosForSegment(segmentId).length;
}

export const totalPhotos = segmentPhotos.length;
