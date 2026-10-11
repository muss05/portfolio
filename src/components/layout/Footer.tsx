import { navigation, site } from "@/data/portfolio";
import { socialLinks } from "@/components/ui/socialLinks";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <a href="#top" className="font-display text-lg font-semibold">
            Muskan <span className="text-gradient">Gupta</span>
          </a>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Frontend developer building accessible, fast interfaces, and learning to build the AI behind them.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-muted transition-colors hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex gap-2" aria-label="Social links">
          {socialLinks.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={label}
                className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-border-strong hover:text-fg"
              >
                <Icon />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-10 text-xs text-muted sm:px-6">
        © {new Date().getFullYear()} {site.name}. Built with Next.js and Tailwind CSS.
      </div>
    </footer>
  );
}
