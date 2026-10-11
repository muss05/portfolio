import { achievements, education } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Award, GraduationCap } from "@/components/ui/Icons";

export function Achievements() {
  return (
    <Section id="achievements" eyebrow="Achievements & education" title="Recognition and foundations">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Reveal as="article" className="glass card relative overflow-hidden p-7">
          <div
            className="pointer-events-none absolute -top-20 -right-20 size-60 rounded-full blur-3xl"
            style={{ background: "var(--glow-purple)" }}
            aria-hidden="true"
          />
          <GraduationCap size={28} className="text-purple" />
          <h3 className="mt-5 font-display text-xl font-semibold">{education.degree}</h3>
          <p className="mt-1 text-muted">{education.school}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-border px-3 py-1 font-mono">{education.year}</span>
            <span className="rounded-full bg-gradient px-3 py-1 font-medium text-white">{education.grade}</span>
          </div>
        </Reveal>

        <ul className="grid gap-4">
          {achievements.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 80} className="card flex items-center gap-4 p-5">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-border text-cyan" aria-hidden="true">
                <Award size={22} />
              </span>
              <div>
                <p className="font-display font-semibold">{a.title}</p>
                <p className="text-sm text-muted">{a.detail}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
