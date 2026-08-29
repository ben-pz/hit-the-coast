import type { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  /** `wide` for full-bleed grids, `narrow` for editorial reading columns. */
  width?: 'default' | 'wide' | 'narrow';
  className?: string;
};

const widths = {
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
  narrow: 'max-w-3xl',
} as const;

export function Container({
  children,
  width = 'default',
  className = '',
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 ${widths[width]} ${className}`}
    >
      {children}
    </div>
  );
}
