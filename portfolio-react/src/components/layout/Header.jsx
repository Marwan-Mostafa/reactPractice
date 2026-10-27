import { useState } from "react";
import { SECTIONS, SITE } from "../../data/site.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useRecruiter } from "../../context/RecruiterContext.jsx";
import { useScrollSpy } from "../../hooks/useScrollSpy.js";
import { useScrolled } from "../../hooks/useScrolled.js";
import HeaderButton from "../ui/HeaderButton.jsx";
import { MoonIcon, SearchIcon, SunIcon, UserIcon } from "../ui/icons.jsx";

const MOBILE = "max-[1100px]:";

export default function Header({ onOpenPalette }) {
  const { t, lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const recruiter = useRecruiter();
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useScrollSpy(SECTIONS);
  const scrolled = useScrolled();

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-1000 h-[76px] bg-header/90 px-[6%] backdrop-blur transition-shadow print:hidden ${scrolled ? "shadow-[0_8px_24px_rgba(0,0,0,0.25)]" : ""}`}
        onKeyDown={(e) => e.key === "Escape" && closeMenu()}
      >
        <div className="mx-auto flex h-full max-w-[1380px] items-center gap-6">
          <a href="#hero" className="font-display text-[clamp(0.95rem,2.6vw,1.25rem)] font-bold whitespace-nowrap text-white no-underline transition-colors hover:text-accent max-[400px]:text-[0.85rem]">
            {SITE.name}
            <span className="text-accent">.</span>
          </a>

          <div className="flex min-w-0 flex-1 items-center gap-4">
            <nav aria-label="Primary" className="flex min-w-0 flex-1 justify-center">
              <ul
                id="nav-menu"
                className={`m-0 flex list-none gap-[clamp(0.75rem,1.6vw,1.5rem)] p-0 whitespace-nowrap ${MOBILE}fixed ${MOBILE}inset-x-0 ${MOBILE}top-[76px] ${MOBILE}flex-col ${MOBILE}items-center ${MOBILE}gap-6 ${MOBILE}bg-header ${MOBILE}py-8 ${MOBILE}transition ${menuOpen ? "" : `${MOBILE}pointer-events-none ${MOBILE}-translate-y-3 ${MOBILE}opacity-0`}`}
              >
                {SECTIONS.map((id) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={closeMenu}
                      aria-current={active === id ? "true" : undefined}
                      className={`group relative inline-block pt-2 pb-1 text-[0.95rem] font-medium no-underline transition-colors hover:text-white ${MOBILE}text-[1.1rem] ${active === id ? "text-white" : "text-[#c4cbd6]"}`}
                    >
                      {t(`nav.${id}`)}
                      <span className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-accent transition-transform group-hover:scale-x-100 ${active === id ? "scale-x-100" : "scale-x-0"}`} />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-2 max-[1100px]:gap-1">
              <HeaderButton onClick={onOpenPalette} aria-label={t("palette.open")} title={t("palette.open")}>
                <SearchIcon />
              </HeaderButton>
              <HeaderButton pressed={recruiter.on} onClick={recruiter.toggle} aria-label={t("recruiter.toggle")} title={t("recruiter.toggle")}>
                <UserIcon />
              </HeaderButton>
              <HeaderButton
                onClick={toggleLang}
                aria-label={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
                className="w-auto px-4 text-[0.85rem] font-semibold"
              >
                {lang === "ar" ? "EN" : "عربي"}
              </HeaderButton>
              <HeaderButton onClick={toggleTheme} aria-label={t(theme === "dark" ? "theme.toLight" : "theme.toDark")}>
                {theme === "dark" ? <MoonIcon /> : <SunIcon />}
              </HeaderButton>
              <HeaderButton
                onClick={() => setMenuOpen((o) => !o)}
                aria-expanded={menuOpen}
                aria-controls="nav-menu"
                aria-label={t(menuOpen ? "nav.closeMenu" : "nav.openMenu")}
                className="hidden max-[1100px]:flex"
              >
                <span className="flex flex-col gap-[5px]" aria-hidden="true">
                  <span className={`h-0.5 w-[22px] rounded-full bg-white transition ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                  <span className={`h-0.5 w-[22px] rounded-full bg-white transition ${menuOpen ? "opacity-0" : ""}`} />
                  <span className={`h-0.5 w-[22px] rounded-full bg-white transition ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
                </span>
              </HeaderButton>
            </div>
          </div>
        </div>
      </header>
      {menuOpen && <div className="fixed inset-x-0 top-[76px] bottom-0 z-[900] bg-black/40" onClick={closeMenu} />}
    </>
  );
}
