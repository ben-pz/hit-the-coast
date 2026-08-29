import { Container } from '@/components/Container';
import { ButtonLink } from '@/components/ui';

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="contours pointer-events-none absolute inset-0 opacity-50"
        aria-hidden="true"
      />
      <Container width="default">
        <div className="relative py-28 text-center sm:py-40">
          <p className="label text-red">Error 404</p>
          <h1 className="mt-6 text-[clamp(2.5rem,8vw,5rem)]">
            Path closed. Or never existed.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-mute">
            Happens on the coast too. Head back to somewhere with a waymarker.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/" size="lg">
              Back to the start
            </ButtonLink>
            <ButtonLink href="/events" variant="secondary" size="lg">
              Find an event
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
