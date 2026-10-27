import { CERTIFICATES } from "../../data/certificates.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useRecruiter } from "../../context/RecruiterContext.jsx";
import Button from "../ui/Button.jsx";
import Reveal from "../ui/Reveal.jsx";
import Section, { SectionTitle } from "../ui/Section.jsx";

export default function Certificates() {
  const { t } = useLanguage();
  const { on: recruiterOn } = useRecruiter();
  const visible = recruiterOn ? CERTIFICATES.slice(0, 3) : CERTIFICATES;

  return (
    <Section id="certificates" className="bg-surface-alt text-center">
      <SectionTitle>{t("certificates.heading")}</SectionTitle>
      <div className="mx-auto grid max-w-[1380px] grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))] gap-8">
        {visible.map((cert, i) => (
          <Reveal key={cert.id} delay={Math.min(i * 70, 280)}>
            <article className="h-full rounded-2xl bg-surface p-6 text-start shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-brand-sm print:border print:border-[#ccc]">
              {cert.image && <img src={cert.image} alt="" loading="lazy" className="mb-4 aspect-[4/3] w-full rounded-lg object-cover print:hidden" />}
              <h3 className="mb-2 text-[1.1rem] text-primary">{cert.title}</h3>
              <p className="mb-4 text-[0.9rem] leading-relaxed text-muted">{t(`certificates.${cert.id}`)}</p>
              {cert.url && (
                <Button size="sm" variant="primary" className="!bg-primary hover:!bg-primary-hover print:hidden" href={cert.url} target="_blank" rel="noopener noreferrer">
                  {t("certificates.view")}
                </Button>
              )}
            </article>
          </Reveal>
        ))}
      </div>
      {recruiterOn && <p className="mt-6 text-[0.9rem] text-muted print:hidden">{t("recruiter.certs")}</p>}
    </Section>
  );
}
