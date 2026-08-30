import Image from 'next/image';
import { siteConfig } from '@/config/site';

/**
 * Text-based wordmark plus the supplied PZ×RC mark.
 *
 * The mark lives at /public/images/brand/pzx-wasters-logo.png. Swap that file
 * for a vector version when one exists; nothing else needs to change.
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
      <Image
        src="/images/brand/pzx-wasters-logo.png"
        alt=""
        width={dimensions}
        height={dimensions}
        className="shrink-0 border border-line"
        priority
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
