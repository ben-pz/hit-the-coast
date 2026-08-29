import type { ReactNode } from 'react';
import { Container } from './Container';

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        className="contours pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      <Container width="wide">
        <div className="relative py-16 sm:py-20">
          <p className="label text-red">{eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)]">
            {title}
          </h1>
          {intro ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mute">
              {intro}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
