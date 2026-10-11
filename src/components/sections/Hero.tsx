import { hero, now, site } from "@/data/portfolio";
import { ArrowRight, Download, Github, Linkedin, Sparkles } from "@/components/ui/Icons";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TypedRoles } from "@/components/ui/TypedRoles";
import { CountUp } from "@/components/ui/CountUp";

const codeLines = [
  { k: "const", v: " muskan = {" },
  { k: "  role", v: ': "Frontend Developer",' },
  { k: "  stack", v: ': ["React", "Next.js", "TypeScript"],' },
  { k: "  learning", v: ': ["Python", "ML", "LLM agents"],' },
  { k: "  principle", v: ': "human in the loop",' },
  { k: "}", v: ";" },
];

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="grid-backdrop pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--glow-purple), transparent), radial-gradient(closest-side at 70% 60%, var(--glow-cyan), transparent)" }}
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              {hero.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 id="hero-heading" className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {hero.headline[0]} <span className="text-gradient">{hero.headline[1]}</span>
            </h1>
            <TypedRoles prefix={hero.rolesPrefix} phrases={hero.roles} />
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty">{hero.intro}</p>
          </Reveal>

          <Reveal delay={240} className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="#projects">
              View projects <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink href={site.resume.href} download={site.resume.fileName} variant="secondary">
              <Download size={16} /> Download resume
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost">
              Get in touch
            </ButtonLink>
          </Reveal>

          <Reveal delay={320} className="mt-8 flex items-center gap-4 text-sm text-muted">
            <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-fg">
              <Github /> GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <span aria-hidden="true" className="h-4 w-px bg-border" />
            <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-fg">
              <Linkedin /> LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="animate-float">
            <div className="glass card overflow-hidden shadow-2xl shadow-purple/10">
              <div className="flex items-center gap-1.5 border-b border-border px-4 py-3" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-danger/70" />
                <span className="size-2.5 rounded-full bg-warning/70" />
                <span className="size-2.5 rounded-full bg-success/70" />
                <span className="ml-3 font-mono text-xs text-muted">profile.ts</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7 sm:text-sm" aria-label="Profile summary as code">
                <code>
                  {codeLines.map((line, i) => (
                    <span key={i} className="block">
                      <span className="text-purple">{line.k}</span>
                      <span className="text-fg/80">{line.v}</span>
                    </span>
                  ))}
                </code>
              </pre>
              <div className="flex items-center gap-2 border-t border-border px-5 py-3 text-xs text-muted">
                <Sparkles size={14} className="text-cyan" /> Currently building LLM agents in Python &amp; TypeScript
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <dl className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-3 sm:px-6">
        {hero.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 80} className="card spotlight flex flex-col px-6 py-5">
            <dt className="text-sm text-muted">{stat.label}</dt>
            <dd className="order-first font-display text-3xl font-semibold text-gradient">
              <CountUp value={stat.value} />
            </dd>
          </Reveal>
        ))}
      </dl>

      <Reveal className="mx-auto mt-4 max-w-6xl px-4 sm:px-6">
        <div className="card flex flex-col gap-3 px-6 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
          <p className="inline-flex shrink-0 items-center gap-2 font-mono text-xs font-semibold tracking-wider text-cyan uppercase">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-cyan" />
            </span>
            Now
          </p>
          <ul className="flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
            {now.map((item) => (
              <li key={item.label}>
                <span className="text-muted">{item.label}:</span> <span className="font-medium">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
