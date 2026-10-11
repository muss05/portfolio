import Image from "next/image";
import { about, site } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <Section id="about" eyebrow="About me" title="From pixels in production to models and agents">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Reveal className="mb-10 flex flex-col items-start gap-6 sm:flex-row sm:items-end">
            <div className="relative">
              <div
                className="absolute -inset-6 -z-10 rounded-full opacity-80 blur-3xl"
                style={{ background: "radial-gradient(closest-side, var(--glow-purple), transparent), radial-gradient(closest-side at 70% 80%, var(--glow-cyan), transparent)" }}
                aria-hidden="true"
              />
              <div className="bg-gradient w-48 rounded-[1.75rem] p-[2px] shadow-2xl shadow-purple/20 sm:w-56">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(1.75rem-2px)] bg-surface">
                  <Image
                    src={about.photo.src}
                    alt={about.photo.alt}
                    fill
                    sizes="(min-width: 640px) 224px, 192px"
                    className="object-cover"
                    style={{ objectPosition: "center 22%" }}
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold">{site.name}</p>
              <p className="mt-1 text-muted">Associate Web Developer · Amla Commerce</p>
              <p className="text-sm text-muted">{site.location}</p>
            </div>
          </Reveal>

          <Reveal className="space-y-5 text-lg leading-relaxed text-muted text-pretty">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
        </div>

        <ol className="relative space-y-8 self-start border-l border-border pl-8" aria-label="Career journey">
          {about.journey.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 90} className="relative">
              <span
                className="absolute -left-[37px] top-1.5 size-3 rounded-full border-2 border-bg bg-gradient ring-4 ring-bg"
                aria-hidden="true"
              />
              <p className="font-mono text-xs uppercase tracking-wider text-cyan">{step.year}</p>
              <h3 className="mt-1 font-display text-lg font-semibold">{step.title}</h3>
              <p className="mt-1 text-muted">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
