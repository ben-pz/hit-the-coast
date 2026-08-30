import { siteConfig } from '@/config/site';
import { CoastLogoMark } from './CoastLogoMark';

/**
 * Text-based wordmark plus the site's mark.
 *
 * The mark is `CoastLogoMark` — the traced coast path, standing in for a
 * real club badge for now. See that component for where the shape comes
 * from.
 */
export function Wordmark({
  size = 'md',
  showSuffix = true,
}: {
  size?: 'sm' | 'md' | 'lg';
  showSuffix?: boolean;
}) {
  const dimensions = { sm: 26, md: 32, lg: 44 }[size];
  const titleSize = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-2xl',
  }[size];

  return (
    <span className="flex items-center gap-3">
      <CoastLogoMark
        className="shrink-0 border border-line"
        style={{ width: dimensions, height: dimensions }}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-extrabold tracking-tight ${titleSize}`}
        >
          {siteConfig.name}
        </span>
        {showSuffix ? (
          <span className="label mt-1 hidden whitespace-nowrap text-[0.62rem] text-mute sm:inline sm:text-[0.7rem]">
            {siteConfig.clubRelation} {siteConfig.clubName}
          </span>
        ) : null}
      </span>
    </span>
  );
}
