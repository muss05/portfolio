import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { about, site } from "@/data/portfolio";
import { themeInitScript } from "@/components/layout/ThemeToggle";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.name, url: site.socials.linkedin }],
  creator: site.name,
  keywords: ["Muskan Gupta", "Frontend Developer", "React", "Next.js", "TypeScript", "AI Engineer", "LLM agents", "Portfolio"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${site.name} Portfolio`,
    title: site.title,
    description: site.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07070d" },
    { media: "(prefers-color-scheme: light)", color: "#f7f7fb" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Associate Web Developer",
  worksFor: { "@type": "Organization", name: "Amla Commerce" },
  url: site.url,
  image: `${site.url}${about.photo.src}`,
  sameAs: [site.socials.github, site.socials.linkedin],
  knowsAbout: ["React", "Next.js", "TypeScript", "Accessibility", "Machine Learning", "LLM agents"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // Dark is the default; the init script applies the saved theme before paint, hence suppressHydrationWarning.
    <html lang="en" className={`dark ${inter.variable} ${grotesk.variable}`} suppressHydrationWarning>
      <head>
        {/* Static strings only: no user data reaches these script tags. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-dvh overflow-x-hidden">{children}</body>
    </html>
  );
}
