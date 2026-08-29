import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /**
   * Static export: `next build` writes a plain folder of HTML, CSS, JS and
   * images to ./out with no Node server behind it.
   *
   * That makes the site free to host anywhere — Cloudflare Pages, Netlify,
   * GitHub Pages — with no commercial-use restrictions and no serverless
   * adapter. The newsletter form posts straight to Kit, so nothing here needs
   * a backend.
   *
   * If you later add something that genuinely needs a server (an API route,
   * on-demand revalidation, image optimisation), delete these two options and
   * deploy to a host that runs Next.js.
   */
  output: 'export',

  images: {
    // Vercel's image optimiser is a server feature; a static export ships the
    // source files as they are. Everything in /public/images is already an
    // appropriately sized SVG, so there is nothing to optimise.
    unoptimized: true,
  },

  // Emit /events/index.html rather than /events.html, so any static host
  // serves the routes correctly without custom rewrite rules.
  trailingSlash: false,
};

export default nextConfig;
