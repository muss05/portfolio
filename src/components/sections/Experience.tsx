import { experience } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { Briefcase, Check } from "@/components/ui/Icons";

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Building enterprise storefronts at scale">
      <div className="space-y-6">
        {experience.map((job) => (
          <Reveal key={`${job.company}-${job.period}`} as="article" className="card spotlight p-6 sm:p-8">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient text-white" aria-hidden="true">
                  <Briefcase size={22} />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold">{job.role}</h3>
                  <p className="font-medium text-cyan">{job.company}</p>
                  <p className="mt-1 text-sm text-muted">{job.context}</p>
                </div>
              </div>
              <p className="shrink-0 rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">{job.period}</p>
            </header>

            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {job.achievements.map((a) => (
                <div key={a.label} className="flex flex-col rounded-xl border border-border bg-surface/60 px-5 py-4">
                  <dt className="text-sm text-muted">{a.label}</dt>
                  <dd className="order-first font-display text-2xl font-semibold text-gradient">{a.value}</dd>
                </div>
              ))}
            </dl>

            <h4 className="mt-8 text-sm font-semibold tracking-wide text-muted uppercase">What I do</h4>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {job.responsibilities.map((r) => (
                <li key={r} className="flex gap-2.5 leading-relaxed">
                  <Check size={16} className="mt-1 shrink-0 text-success" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>

            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies used">
              {job.tech.map((t) => (
                <li key={t}>
                  <Tag>{t}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
