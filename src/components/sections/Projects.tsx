"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";
import { projects, type Project, type ProjectStatus } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { StatusBadge, Tag } from "@/components/ui/Tag";
import { ArrowUpRight, Check, Github, Sparkles } from "@/components/ui/Icons";

type Filter = "all" | "ai" | "web" | ProjectStatus;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI" },
  { id: "web", label: "Web" },
  { id: "completed", label: "Completed" },
  { id: "in-progress", label: "In progress" },
  { id: "planned", label: "Planned" },
];

function matches(project: Project, filter: Filter) {
  if (filter === "all") return true;
  if (filter === "ai" || filter === "web") return project.categories.includes(filter);
  return project.status === filter;
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = useMemo(() => projects.filter((p) => matches(p, filter)), [filter]);
  const listId = useId();

  return (
    <Section
      id="projects"
      eyebrow="Featured projects"
      title="Things I've shipped, and things I'm building"
      intro="Each card says honestly where it stands: completed, in progress, or planned."
    >
      <div role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => {
          const count = projects.filter((p) => matches(p, f.id)).length;
          const selected = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={selected}
              aria-controls={listId}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                selected ? "border-transparent bg-gradient text-white" : "border-border text-muted hover:border-border-strong hover:text-fg"
              }`}
            >
              {f.label} <span className={selected ? "text-white/80" : "text-muted/80"}>({count})</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      <ul id={listId} className="grid gap-6 lg:grid-cols-2">
        {visible.map((project) => (
          <li key={project.slug} className={project.image ? "lg:col-span-2" : ""}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

      {visible.length === 0 && (
        <div className="card p-10 text-center text-muted">
          <p>No projects match this filter yet.</p>
          <button type="button" onClick={() => setFilter("all")} className="mt-3 text-sm font-medium text-purple underline-offset-4 hover:underline">
            Show all projects
          </button>
        </div>
      )}
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const featured = Boolean(project.image);
  return (
    <article
      className={`card card-hover spotlight group h-full overflow-hidden ${featured ? "gradient-border grid lg:grid-cols-[1.15fr_1fr]" : "flex flex-col"}`}
      aria-labelledby={`${project.slug}-title`}
    >
      <ProjectMedia project={project} />

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} />
          {project.categories.includes("ai") && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-purple">
              <Sparkles size={13} /> AI
            </span>
          )}
        </div>

        <h3 id={`${project.slug}-title`} className="mt-4 font-display text-2xl font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="mt-1 text-sm font-medium text-cyan">{project.tagline}</p>
        <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-5 space-y-2 text-sm">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2.5">
              <Check size={16} className="mt-0.5 shrink-0 text-success" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tech.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-gradient px-4 py-2 text-sm font-medium text-white">
              Live demo <ArrowUpRight size={15} />
              <span className="sr-only"> for {project.title} (opens in a new tab)</span>
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-4 py-2 text-sm font-medium hover:border-purple/60">
              <Github size={16} /> Source
              <span className="sr-only"> code for {project.title} on GitHub (opens in a new tab)</span>
            </a>
          )}
          {project.note && <p className="text-xs text-muted">{project.note}</p>}
        </div>
      </div>
    </article>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-surface lg:aspect-auto lg:min-h-full lg:border-r lg:border-b-0">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          style={{ objectPosition: project.image.position ?? "left top" }}
        />
      </div>
    );
  }
  // No screenshot yet: render nothing rather than a placeholder panel.
  return null;
}
