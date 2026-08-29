/**
 * Central site configuration.
 *
 * Rename the site, change navigation, contact details or social links here —
 * nothing else in the codebase hard-codes these values.
 *
 * PLACEHOLDER values are marked. Replace them before launch.
 */

export const siteConfig = {
  /** Temporary site descriptor. Change this one value to rename the site. */
  name: 'Coastal Running',
  /** Club name. */
  clubName: 'PZX Wasters',
  /** Used in page titles: "<page> | Coastal Running by PZX Wasters" */
  titleSuffix: 'Coastal Running by PZX Wasters',
  tagline: 'Run the edge of England.',
  description:
    'Coastal races, ultras, club runs, routes and honest stories from England’s coast. Started in Cornwall by the PZX Wasters, heading everywhere the sea does.',
  /** PLACEHOLDER — replace with the real production domain before launch. */
  url: 'https://coastalrunning.example.com',
  locale: 'en_GB',
  /** PLACEHOLDER — replace with real contact addresses. */
  email: {
    general: 'hello@coastalrunning.example.com',
    events: 'events@coastalrunning.example.com',
    press: 'press@coastalrunning.example.com',
  },
  /** PLACEHOLDER — replace with real profiles, or delete the ones you don't use. */
  social: [
    { label: 'Instagram', href: 'https://instagram.com/', handle: '@pzxwasters' },
    { label: 'Strava', href: 'https://www.strava.com/', handle: 'PZX Wasters' },
    { label: 'Facebook', href: 'https://facebook.com/', handle: 'PZX Wasters' },
  ],
  basedIn: 'Penzance, Cornwall',
} as const;

export const mainNav = [
  { label: 'Events', href: '/events' },
  { label: 'Routes', href: '/routes' },
  { label: 'Stories & Gear', href: '/stories' },
  { label: 'About', href: '/about' },
] as const;

export const footerNav = [
  {
    heading: 'Discover',
    links: [
      { label: 'Coastal events', href: '/events' },
      { label: 'Cornish routes', href: '/routes' },
      { label: 'Stories & gear', href: '/stories' },
    ],
  },
  {
    heading: 'Get involved',
    links: [
      { label: 'Join the newsletter', href: '/newsletter' },
      { label: 'Submit an event', href: '/submit-event' },
      { label: 'About PZX Wasters', href: '/about' },
    ],
  },
] as const;

/**
 * Newsletter provider wiring.
 *
 * The form at /newsletter and the inline signup blocks post to the internal
 * route handler at `/api/newsletter`. That handler is deliberately honest: with
 * no provider configured it returns a 501 and the UI says the list is not live
 * yet. See `src/app/api/newsletter/route.ts` for the exact three lines to change
 * when you connect Mailchimp, Kit, Beehiiv or Brevo.
 */
export const newsletterConfig = {
  /** Flip to true only once a provider is actually connected. */
  providerConnected: false,
  /** Shown under the form so nobody is misled about where their address goes. */
  consentCopy:
    'One email a month or so: new coastal events, routes worth the drive, and the odd honest kit review. No spam, unsubscribe in one click.',
} as const;

export type SiteConfig = typeof siteConfig;
