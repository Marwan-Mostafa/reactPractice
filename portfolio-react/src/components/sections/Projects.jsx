import { PROJECTS } from "../../data/projects.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useRecruiter } from "../../context/RecruiterContext.jsx";
import Button from "../ui/Button.jsx";
import Reveal from "../ui/Reveal.jsx";
import Section, { SectionTitle } from "../ui/Section.jsx";

function ProjectCard({ project }) {
  const { t } = useLanguage();
  const links = [
    { href: project.demo, label: t("projects.demo"), variant: "accent" },
    { href: project.github, label: t("projects.github"), variant: "dark" },
    { href: project.figma, label: t("projects.figma"), variant: "accent", className: "!bg-[#a259ff] !text-white" },
  ].filter((l) => l.href);

  return (
    <article className="group relative h-full overflow-hidden rounded-2xl bg-surface-alt p-8 text-start shadow-sm transition duration-300 hover:-translate-y-2 hover:bg-primary/5 hover:shadow-brand print:border print:border-[#ccc]">
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />
      {project.featured && (
        <span className="mb-4 inline-block rounded-full border border-highlight/45 bg-highlight/15 px-3 py-1 text-[0.72rem] font-bold tracking-wide text-amber-700 uppercase dark:text-highlight print:hidden">
          {t("projects.featured")}
        </span>
      )}
      <h3 className="mb-4 text-xl text-primary transition-colors group-hover:text-accent">{project.title}</h3>
      <p className="mb-6 min-h-[4.8em] text-[0.95rem] leading-relaxed text-muted">{t(`projects.${project.id}`)}</p>
      {links.length > 0 && (
        <div className="flex flex-wrap gap-4 print:hidden">
          {links.map((l) => (
            <Button key={l.label} size="sm" variant={l.variant} className={l.className} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </Button>
          ))}
        </div>
      )}
    </article>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const { on: recruiterOn } = useRecruiter();
  const visible = recruiterOn ? PROJECTS.filter((p) => p.tier === "primary") : PROJECTS;

  return (
    <Section id="projects" className="bg-surface text-center">
      <SectionTitle>{t("projects.heading")}</SectionTitle>
      <div className="mx-auto grid max-w-[1380px] grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-8">
        {visible.map((project, i) => (
          <Reveal key={project.id} delay={Math.min(i * 70, 280)}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
