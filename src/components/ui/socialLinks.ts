import { site } from "@/data/portfolio";
import { Github, Linkedin, Mail } from "./Icons";

export const socialLinks = [
  { label: "GitHub", href: site.socials.github, Icon: Github },
  { label: "LinkedIn", href: site.socials.linkedin, Icon: Linkedin },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
];
