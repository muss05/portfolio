import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, eyebrow, title, intro, children, className = "" }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`relative py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-12 max-w-2xl">
          <p className="mb-3 font-display text-sm font-medium tracking-wide text-gradient uppercase">{eyebrow}</p>
          <h2 id={headingId} className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
