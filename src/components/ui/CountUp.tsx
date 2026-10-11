"use client";

import { useEffect, useRef } from "react";

const DURATION_MS = 1400;

/**
 * Counts a numeric value ("2+", "30+", "9.2") up from zero when it scrolls into view.
 * The final value is server-rendered, so it shows without JS, with reduced motion,
 * and to screen readers (the animated copy is aria-hidden).
 */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    const target = parseFloat(match[1]);
    const decimals = match[1].split(".")[1]?.length ?? 0;
    const suffix = match[2];
    const render = (n: number) => {
      el.textContent = `${n.toFixed(decimals)}${suffix}`;
    };

    // Only animate if it starts off-screen; otherwise the visitor already sees the final value.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    render(0);

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min((now - start) / DURATION_MS, 1);
          render(target * (1 - Math.pow(1 - t, 3))); // ease-out cubic
          if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      render(target);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- value is static content
  }, [value]);

  return (
    <>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true" className={`tabular-nums ${className}`}>
        {value}
      </span>
    </>
  );
}
