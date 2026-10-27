import { SITE } from "../../data/site.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useGithubRepos } from "../../hooks/useGithubRepos.js";
import { timeAgo } from "../../lib/time.js";
import Button from "../ui/Button.jsx";
import Section, { SectionTitle } from "../ui/Section.jsx";

export default function Activity() {
  const { t, lang } = useLanguage();
  const { status, repos } = useGithubRepos(SITE.githubUser);

  return (
    <Section id="activity" className="bg-surface text-center print:hidden">
      <SectionTitle className="!mb-4">{t("activity.heading")}</SectionTitle>
      <p className="mx-auto mb-12 max-w-[560px] text-[0.95rem] text-muted">{t("activity.subtitle")}</p>

      <div className="mx-auto mb-12 grid max-w-[1380px] grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-8" aria-busy={status === "loading"}>
        {status === "loading" && <p className="col-span-full p-6 text-[0.9rem] text-muted">{t("activity.loading")}</p>}
        {status === "error" && <p className="col-span-full p-6 text-[0.9rem] text-muted">{t("activity.error")}</p>}
        {repos.map((repo) => (
          <div key={repo.id} className="rounded-2xl bg-surface-alt p-6 text-start shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-brand-sm">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="mb-2 block font-display text-[1.05rem] font-bold text-primary no-underline">
              {repo.name}
            </a>
            <p className="mb-4 min-h-[2.6em] text-[0.85rem] leading-relaxed text-muted">{repo.description || t("activity.noDesc")}</p>
            <div className="flex items-center gap-4 text-[0.78rem] text-muted">
              <span className="before:me-1.5 before:inline-block before:h-2 before:w-2 before:rounded-full before:bg-accent before:content-['']">{repo.language || "—"}</span>
              <span>{t("activity.updated") + timeAgo(repo.updated_at, lang)}</span>
              <span>★ {repo.stargazers_count || 0}</span>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" href={SITE.github} target="_blank" rel="noopener noreferrer">{t("activity.view")}</Button>
    </Section>
  );
}
