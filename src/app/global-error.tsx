'use client';

/**
 * Root error boundary. Replaces the framework's built-in global error page and
 * renders its own <html>/<body>, because the root layout is not applied here.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-GB">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0b0c0e',
          color: '#f4f1ec',
          fontFamily: 'Inter Variable, system-ui, sans-serif',
          padding: '2rem',
        }}
      >
        <div style={{ maxWidth: '32rem' }}>
          <p
            style={{
              color: '#e64a33',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontSize: '0.6875rem',
              fontFamily: 'JetBrains Mono Variable, monospace',
            }}
          >
            Something went wrong
          </p>
          <h1
            style={{
              fontFamily: 'Archivo Variable, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: '1.25rem 0 0',
            }}
          >
            We have taken a wrong turn.
          </h1>
          <p style={{ color: '#a7abb2', lineHeight: 1.7, marginTop: '1.25rem' }}>
            An unexpected error stopped the page loading. Try again, or head back
            to the start.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
            <button
              type="button"
              onClick={reset}
              style={{
                background: '#e64a33',
                color: '#0b0c0e',
                border: 0,
                padding: '0.875rem 1.75rem',
                fontFamily: 'Archivo Variable, sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
            {/*
              A plain anchor, not next/link: this boundary catches errors in the
              root layout itself, so a full page load is the reliable way out.
            */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                border: '1px solid #2b3038',
                color: '#f4f1ec',
                padding: '0.875rem 1.75rem',
                fontFamily: 'Archivo Variable, sans-serif',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Back to the start
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
