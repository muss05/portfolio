import { articles, experiments } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { ArrowUpRight, FileText, Sparkles } from "@/components/ui/Icons";

export function AiLab() {
  return (
    <Section
      id="ai-lab"
      eyebrow="AI lab"
      title="Experiments, agents and writing"
      intro="Smaller prototypes where I test ideas before they become full projects, plus notes on what I learn."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {experiments.map((exp, i) => (
          <Reveal key={exp.title} as="article" delay={i * 80} className="card card-hover spotlight flex flex-col p-6">
            <Sparkles className="text-cyan" size={22} />
            <h3 className="mt-4 font-display text-lg font-semibold">{exp.title}</h3>
            <p className="mt-2 flex-1 leading-relaxed text-muted">{exp.description}</p>
            {exp.outcome && (
              <p className="mt-4 rounded-lg border border-border bg-surface/60 px-3 py-2 text-sm">
                <span className="font-semibold text-gradient">Result:</span> {exp.outcome}
              </p>
            )}
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
              {exp.tech.map((t) => (
                <li key={t}>
                  <Tag>{t}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <h3 className="mt-14 mb-4 font-display text-lg font-semibold">Technical articles</h3>
      <ul className="grid gap-4 md:grid-cols-2">
        {articles.map((article, i) => (
          <Reveal as="li" key={article.title} delay={i * 80}>
            {article.href && !article.placeholder ? (
              <a href={article.href} target="_blank" rel="noopener noreferrer" className="card card-hover group flex h-full gap-4 p-5">
                <ArticleBody title={article.title} summary={article.summary} />
                <ArrowUpRight className="shrink-0 text-muted group-hover:text-fg" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <div className="card flex h-full gap-4 border-dashed p-5">
                <ArticleBody title={article.title} summary={article.summary} />
                <span className="h-fit shrink-0 rounded-full border border-border px-2.5 py-1 text-xs text-muted">Draft · coming soon</span>
              </div>
            )}
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

function ArticleBody({ title, summary }: { title: string; summary: string }) {
  return (
    <div className="flex flex-1 gap-4">
      <FileText className="mt-0.5 shrink-0 text-purple" />
      <div>
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-sm text-muted">{summary}</p>
      </div>
    </div>
  );
}
