import { siteConfig } from '@/config/site';
import { CoastLogoMark } from './CoastLogoMark';

/**
 * The coastline mark plus a thin, tracked-out capitals wordmark — the lockup
 * Benjamin supplied (August 2026), rebuilt as live text and vector rather
 * than the reference PNGs themselves: real text stays crisp and selectable
 * at any size, and the icon keeps the site's actual traced coastline data
 * (see `CoastLogoMark`) rather than an image model's redrawing of it.
 *
 * Inter at a light weight with wide letter-spacing was the closest match
 * to the reference type among the faces already self-hosted here, so nothing
 * new had to be added just for the logo.
 */
export function Wordmark({
  size = 'md',
  showSuffix = true,
}: {
  size?: 'sm' | 'md' | 'lg';
  showSuffix?: boolean;
}) {
  const dimensions = { sm: 28, md: 34, lg: 46 }[size];
  const titleSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-xl',
  }[size];

  return (
    <span className="flex items-center gap-3">
      <CoastLogoMark
        className="shrink-0"
        style={{ width: dimensions, height: dimensions }}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-sans font-light uppercase tracking-[0.35em] ${titleSize}`}
        >
          {siteConfig.name}
        </span>
        {showSuffix ? (
          <span className="label mt-1.5 hidden whitespace-nowrap text-[0.62rem] text-mute sm:inline sm:text-[0.7rem]">
            {siteConfig.clubRelation} {siteConfig.clubName}
          </span>
        ) : null}
      </span>
    </span>
  );
}
