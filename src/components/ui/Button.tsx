import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowRight, ArrowUpRight } from "./Icons";

type Variant = "primary" | "ink" | "outline-light" | "outline-dark";

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  ink: "btn-ink",
  "outline-light": "btn-outline-light",
  "outline-dark": "btn-outline-dark",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external,
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  arrow?: boolean;
}) {
  const content = (
    <>
      <span>{children}</span>
      {arrow && (external ? <ArrowUpRight className="btn-arrow" /> : <ArrowRight className="btn-arrow" />)}
    </>
  );
  const cls = cn("btn", variants[variant], className);
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {content}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

/** Text link with a hairline underline that turns gold on hover. */
export function LineLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn("link-line", className)}>
        <span>{children}</span>
        <ArrowUpRight className="btn-arrow" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cn("link-line", className)}>
      <span>{children}</span>
      <ArrowRight className="btn-arrow" />
    </Link>
  );
}
