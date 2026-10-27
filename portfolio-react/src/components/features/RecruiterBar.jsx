import { SITE } from "../../data/site.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useRecruiter } from "../../context/RecruiterContext.jsx";
import Button from "../ui/Button.jsx";

// Quick-scan strip for hiring managers: summary + CV + email, with secondary content hidden elsewhere.
export default function RecruiterBar() {
  const { t } = useLanguage();
  const { on } = useRecruiter();
  if (!on) return null;
  return (
    <div className="relative z-10 mt-[76px] flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-header px-[8%] py-6 text-white print:hidden">
      <p className="text-[0.95rem] text-[#c4cbd6]">
        <strong className="text-white">{SITE.name}</strong> — {SITE.title}
        {t("recruiter.note")}
      </p>
      <div className="flex flex-wrap gap-4">
        <Button as="button" size="sm" variant="outline" className="!border-accent !text-accent hover:!bg-accent hover:!text-header" onClick={() => window.print()}>
          {t("recruiter.cv")}
        </Button>
        <Button size="sm" variant="accent" href={`mailto:${SITE.email}`}>{t("recruiter.email")}</Button>
      </div>
    </div>
  );
}
