import { SKILLS } from "../../data/skills.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import Reveal from "../ui/Reveal.jsx";
import Section, { SectionTitle } from "../ui/Section.jsx";

export default function Skills() {
  const { t } = useLanguage();
  return (
    <Section id="skills" className="bg-header text-center">
      <SectionTitle className="text-white">{t("skills.heading")}</SectionTitle>
      <div className="mx-auto grid max-w-[1380px] grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-8">
        {SKILLS.map((skill, i) => (
          <Reveal key={skill.id} delay={Math.min(i * 70, 280)}>
            <article className="group relative h-full overflow-hidden rounded-2xl bg-surface px-6 py-8 text-start shadow-sm transition duration-300 hover:-translate-y-2 hover:bg-primary/5 hover:shadow-brand print:border print:border-[#ccc]">
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />
              <h3 className="mb-2 text-xl text-primary transition-colors group-hover:text-accent">{skill.title}</h3>
              <p className="text-[0.95rem] text-muted">{t(`skills.${skill.id}`)}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
