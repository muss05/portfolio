import { skillGroups } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Brain, Code, Server, Wrench } from "@/components/ui/Icons";

const icons = { Frontend: Code, "Backend / API": Server, Tools: Wrench, "AI / ML": Brain } as const;

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Technical skills"
      title="A frontend core, with AI on the rise"
      intro="What I use in production every day, and what I'm actively adding for AI engineering."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group, i) => {
          const Icon = icons[group.title as keyof typeof icons] ?? Code;
          const isAi = group.title === "AI / ML";
          return (
            <Reveal key={group.title} delay={i * 80} className={`card card-hover spotlight p-6 sm:p-7 ${isAi ? "border-purple/30" : ""}`}>
              <div className="flex items-start gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient text-white" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold">{group.title}</h3>
                  <p className="text-sm text-muted">{group.description}</p>
                </div>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${group.title} skills`}>
                {group.skills.map((skill) => (
                  <li key={skill} className="rounded-lg border border-border bg-surface/60 px-3 py-1.5 text-sm">
                    {skill}
                  </li>
                ))}
              </ul>
              {group.familiar && group.familiar.length > 0 && (
                <div className="mt-5 border-t border-dashed border-border pt-4">
                  <p className="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">Familiar with</p>
                  <ul className="flex flex-wrap gap-2" aria-label={`${group.title}: familiar with, not yet hands-on`}>
                    {group.familiar.map((skill) => (
                      <li key={skill} className="rounded-lg border border-dashed border-border px-3 py-1.5 text-sm text-muted">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
