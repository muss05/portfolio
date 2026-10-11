import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Learning } from "@/components/sections/Learning";
import { AiLab } from "@/components/sections/AiLab";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { Spotlight } from "@/components/ui/Spotlight";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Learning />
        <AiLab />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <Spotlight />
    </>
  );
}
