import { useState } from "react";
import { useLanguage } from "./context/LanguageContext.jsx";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import RecruiterBar from "./components/features/RecruiterBar.jsx";
import CommandPalette from "./components/features/CommandPalette.jsx";
import Hero from "./components/sections/Hero.jsx";
import About from "./components/sections/About.jsx";
import Skills from "./components/sections/Skills.jsx";
import Projects from "./components/sections/Projects.jsx";
import Activity from "./components/sections/Activity.jsx";
import Certificates from "./components/sections/Certificates.jsx";
import Contact from "./components/sections/Contact.jsx";

export default function App() {
  const { t } = useLanguage();
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <>
      <a href="#main" className="absolute start-4 -top-16 z-[2000] rounded-lg bg-primary px-6 py-2 font-semibold text-white no-underline transition-[top] focus:top-4 print:hidden">
        {t("skip")}
      </a>
      <Header onOpenPalette={() => setPaletteOpen(true)} />
      <RecruiterBar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Activity />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
    </>
  );
}
