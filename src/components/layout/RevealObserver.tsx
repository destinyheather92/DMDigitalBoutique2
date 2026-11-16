"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    __dmReveal?: boolean;
  }
}

/**
 * One observer for every `[data-reveal]` element on the page. Elements fade
 * and rise into place once, as they enter the viewport. Without JavaScript
 * (or if this never runs) content simply stays visible.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    window.__dmReveal = true;
    const root = document.documentElement;
    if (!root.classList.contains("js")) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)"));
    if (reduced || !("IntersectionObserver" in window)) {
      pending.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    pending.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

/** Inline, render-blocking snippet: enables reveal styles only when JS runs. */
export const revealBootScript = `(function(){var d=document.documentElement;d.classList.add('js');setTimeout(function(){if(!window.__dmReveal){d.classList.remove('js');}},3000);})();`;
