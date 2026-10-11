"use client";

import { useEffect, useState } from "react";
import { navigation, site } from "@/data/portfolio";
import { Close, Download, Menu } from "@/components/ui/Icons";
import { buttonClasses } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { ScrollProgress } from "./ScrollProgress";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item for the section currently in view.
  useEffect(() => {
    const sections = navigation
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open ? "border-b border-border bg-bg/85 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight" aria-label={`${site.name}, back to top`}>
          Muskan <span className="text-gradient">Gupta</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={active === item.href ? "location" : undefined}
                className={`rounded-full px-3 py-2 text-sm transition-colors ${
                  active === item.href ? "bg-card text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={site.resume.href}
            download={site.resume.fileName}
            className={buttonClasses("primary", "!px-4 max-sm:hidden")}
          >
            <Download size={16} /> Resume
          </a>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted hover:text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      <div id="mobile-nav" hidden={!open} className="border-t border-border lg:hidden">
        <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 text-base text-muted hover:bg-card hover:text-fg"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-2 sm:hidden">
            <a href={site.resume.href} download={site.resume.fileName} className={buttonClasses("primary", "w-full")}>
              <Download size={16} /> Download resume
            </a>
          </li>
        </ul>
      </div>
      <ScrollProgress />
    </header>
  );
}
