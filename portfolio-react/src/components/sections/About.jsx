import { useLanguage } from "../../context/LanguageContext.jsx";
import Button from "../ui/Button.jsx";
import Reveal from "../ui/Reveal.jsx";
import Section, { SectionTitle } from "../ui/Section.jsx";

export default function About() {
  const { t } = useLanguage();
  return (
    <Section id="about" className="bg-surface text-center">
      <SectionTitle>{t("about.heading")}</SectionTitle>
      <Reveal>
        <p className="mx-auto mb-8 max-w-[700px] text-[1.05rem] leading-[1.8] text-muted max-sm:text-[0.95rem]">{t("about.text")}</p>
        <Button variant="outline" href="#projects">{t("about.cta")}</Button>
      </Reveal>
    </Section>
  );
}
