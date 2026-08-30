import type { Metadata, Viewport } from 'next';

// Self-hosted variable fonts. No external font CDN, so the build works offline
// and there is no render-blocking third-party request in production.
import '@fontsource-variable/archivo';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import './globals.css';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StructuredData } from '@/components/StructuredData';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — coastal races, routes and club runs in England`,
    template: `%s | ${siteConfig.titleSuffix}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'coastal running',
    'coastal races England',
    'Cornish trail running',
    'trail running Cornwall',
    'coastal ultramarathon',
    'South West Coast Path running',
    'England Coast Path running',
    'running club Cornwall',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.titleSuffix,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: '/og/hit-the-coast-og.png',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ['/og/hit-the-coast-og.png'],
  },
  icons: {
    // Transparent line-art mark for the browser tab; a solid-background
    // version for the apple touch icon, since iOS renders that one on its
    // own rounded square with no control over what's behind it.
    icon: '/images/brand/coast-path-mark.png',
    apple: '/images/brand/apple-touch-icon.png',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0b0c0e',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body className="flex min-h-screen flex-col antialiased">
        <a
          href="#main"
          className="sr-only rounded-none focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:bg-red focus:px-4 focus:py-2 focus:font-display focus:font-bold focus:text-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <StructuredData />
      </body>
    </html>
  );
}
