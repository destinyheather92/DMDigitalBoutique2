type IconProps = { className?: string };

export function ArrowRight({ className }: IconProps) {
  return (
    <svg className={className} width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true">
      <path d="M0 5h16.5M12.5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg className={className} width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <path d="M1 10L10 1M3 1h7v7" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/** A small four-point star used as a typographic separator (the business card's ornament). */
export function Diamond({ className }: IconProps) {
  return (
    <svg className={className} width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
      <path d="M4 0L5 3 8 4 5 5 4 8 3 5 0 4 3 3Z" fill="currentColor" />
    </svg>
  );
}
