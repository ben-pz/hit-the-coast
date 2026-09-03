import Image from 'next/image';
import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { ButtonLink, Callout, DataList } from '@/components/ui';
import { NewsletterForm } from '@/components/NewsletterForm';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About Hit the Coast',
  description:
    'Built by Ben Hearn, who grew up near Land’s End and now lives in Amsterdam. Why this site exists, and what it is for.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: `About | ${siteConfig.titleSuffix}`,
    description: 'One runner, a long way from Cornwall, mapping the coast he grew up on.',
    url: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Keeping a line open to home"
        intro="For runners, walkers and anyone who loves the coast, near or far."
      />

      <section className="py-12 sm:py-16">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div className="measure space-y-6 text-lg leading-relaxed text-paper/90">
              <p>
                I’m Ben. I grew up near Sennen, just outside Land’s End, and
                now live in Amsterdam: a city with no cliffs and very few
                hills. Hit the Coast is my way of staying connected to
                Cornwall and sharing the landscape I only fully appreciated
                once it was no longer on my doorstep.
              </p>
              <p>
                The aim is simple: help people explore the England Coast Path
                one stretch at a time. Run it, walk it, track your progress or
                find a coastal event that gives you a reason to get outside.
              </p>

              <h2 className="pt-6 text-3xl">Why I built it</h2>
              <p>
                Finding coastal races and reliable route information is harder
                than it should be. Details are scattered across organiser
                websites, while shorter, more accessible adventures are often
                overshadowed by ultramarathons.
              </p>
              <p>
                Hit the Coast brings them together. A four-mile walk with a
                friend belongs alongside a hundred-mile race; both are worth
                doing.
              </p>

              <h2 className="pt-6 text-3xl">What comes next</h2>
              <p>
                Cornwall comes first, then we will work our way around
                England’s 2,700-mile coast path, one region at a time.
              </p>
              <p>
                I want every guide to include genuine local knowledge: parking,
                water stops, terrain and the weather conditions to watch out
                for.
              </p>
              <p>
                Know your stretch of coast? Organise an event?{' '}
                <a
                  href={`mailto:${siteConfig.email.general}`}
                  className="underline underline-offset-4 hover:text-paper"
                >
                  Get in touch.
                </a>
              </p>
            </div>

            <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
              <div className="relative aspect-[4/5] border border-line">
                <Image
                  src="/images/brand/about-club-portrait.webp"
                  alt="Three PZ×RC runners climbing coast-path steps in fancy dress \u2014 one in a Santa suit, one in a three-piece suit"
                  fill
                  priority
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className="object-cover"
                />
              </div>

              <div>
                <h2 className="label mb-4 text-red">The club, in numbers</h2>
                <DataList
                  items={[
                    { label: 'Based', value: siteConfig.basedIn },
                    { label: 'Coast covered', value: 'Cornwall, 45 segments' },
                    { label: 'Runs', value: 'Whenever the weather allows' },
                    { label: 'Cost', value: 'Free' },
                  ]}
                />
                <p className="mt-4 text-xs leading-relaxed text-mute">
                  There is no fixed club night. We go when we go — the tracker is
                  how you join in.
                </p>
              </div>

              <ButtonLink
                href={`mailto:${siteConfig.email.general}`}
                className="w-full"
              >
                Say hello
              </ButtonLink>
            </aside>
          </div>

          <div className="mt-20 border-t border-line pt-16">
            <Callout title="What this site is not, yet">
              <p>
                There is no ticketing, no membership system and no shop. Events,
                routes and some articles are clearly marked sample entries while
                we verify listings with organisers. The newsletter form is
                wired but no mailing list is connected yet, so it cannot store
                your address — and it says so rather than pretending.
              </p>
            </Callout>
          </div>

          <div className="mt-16 grid gap-10 border border-line bg-ink-800 p-6 sm:p-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-3xl">Come with us, roughly monthly</h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-mute">
                New coastal events as we verify them, new routes as we write them
                up, and the occasional strong opinion about a waterproof.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </Container>
      </section>
    </>
  );
}
