"use client";

import { useEffect, useRef } from "react";

const TYPE_MS = 55;
const DELETE_MS = 30;
const HOLD_MS = 1800;

/**
 * Types each phrase, holds, deletes, then moves to the next.
 * Screen readers get the full static list; with reduced motion the first phrase stays static.
 */
export function TypedRoles({ phrases, prefix }: { phrases: readonly string[]; prefix: string }) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el || phrases.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let phrase = 0;
    let chars = phrases[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = phrases[phrase];
      if (deleting) {
        chars -= 1;
        if (chars <= 0) {
          deleting = false;
          phrase = (phrase + 1) % phrases.length;
        }
      } else {
        chars += 1;
        if (chars >= phrases[phrase].length) {
          deleting = true;
          el.textContent = phrases[phrase];
          timer = setTimeout(tick, HOLD_MS);
          return;
        }
      }
      el.textContent = (deleting ? current : phrases[phrase]).slice(0, Math.max(chars, 0));
      timer = setTimeout(tick, deleting ? DELETE_MS : TYPE_MS);
    };

    // First phrase is already rendered on the server; hold it before deleting.
    timer = setTimeout(tick, HOLD_MS);
    return () => clearTimeout(timer);
  }, [phrases]);

  return (
    <p className="mt-5 font-mono text-sm text-muted sm:text-base">
      <span className="sr-only">
        {prefix} {phrases.join(", ")}
      </span>
      <span aria-hidden="true">
        <span className="text-cyan">{prefix}</span>{" "}
        <span ref={textRef} className="text-fg">
          {phrases[0]}
        </span>
        <span className="typed-caret ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-purple" />
      </span>
    </p>
  );
}
