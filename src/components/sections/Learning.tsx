import { certifications, learning } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight, Award } from "@/components/ui/Icons";

const statusLabel = {
  done: { text: "Done", className: "text-success" },
  learning: { text: "Learning now", className: "text-warning" },
  next: { text: "Up next", className: "text-cyan" },
} as const;

export function Learning() {
  return (
    <Section
      id="learning"
      eyebrow="Certifications & learning"
      title="Learning in public, one step at a time"
      intro="Certifications I hold, and the path I'm following from frontend into AI engineering."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <h3 className="mb-4 font-display text-lg font-semibold">Certifications</h3>
          <ul className="space-y-3">
            {certifications.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 70} className="card flex items-start gap-4 p-4">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border text-purple" aria-hidden="true">
                  <Award size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{c.title}</p>
                  <p className="text-sm text-muted">{c.issuer}</p>
                  {c.summary && <p className="mt-1 text-sm">{c.summary}</p>}
                  {c.credentialId && (
                    <p className="mt-1 font-mono text-xs break-all text-muted">Credential ID: {c.credentialId}</p>
                  )}
                </div>
                {c.certificateImage && (
                  <a href={c.certificateImage} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1 text-sm text-purple hover:underline">
                    View <ArrowUpRight size={14} />
                    <span className="sr-only"> {c.title} certificate (opens in a new tab)</span>
                  </a>
                )}
                {c.credentialUrl && (
                  <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-purple hover:underline">
                    Verify <ArrowUpRight size={14} />
                    <span className="sr-only"> {c.title} credential (opens in a new tab)</span>
                  </a>
                )}
              </Reveal>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg font-semibold">AI learning path</h3>
          <ol className="space-y-3">
            {learning.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 70} className="card flex gap-4 p-4">
                <span className="font-mono text-sm text-muted tabular-nums" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium">{item.title}</p>
                    <span className={`text-xs font-semibold ${statusLabel[item.status].className}`}>{statusLabel[item.status].text}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
