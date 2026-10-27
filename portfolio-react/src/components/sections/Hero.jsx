import { useState } from "react";
import { SITE } from "../../data/site.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import HeroTerminal from "../features/HeroTerminal.jsx";
import Button from "../ui/Button.jsx";

export default function Hero() {
  const { t } = useLanguage();
  const [imageOk, setImageOk] = useState(true);

  return (
    <section id="hero" className="flex min-h-[90vh] justify-center bg-brand px-[8%] text-white">
      <div className="flex w-full max-w-[1380px] items-center justify-between gap-24 pt-[calc(76px+4rem)] pb-24 max-[900px]:flex-col max-[900px]:gap-12 max-[900px]:pt-[calc(76px+3rem)] max-[900px]:text-center">
        <div className="max-w-[620px]">
          <h1 className="mb-2 text-[clamp(2.25rem,5vw,3.25rem)] font-bold">{t("hero.name")}</h1>
          <p className="mb-6 text-[1.15rem] font-medium text-white/85">{t("hero.role")}</p>
          <HeroTerminal />
          <p className="mb-8 text-[1.05rem] leading-[1.7] text-white/90 max-sm:text-[0.95rem]">
            {t("hero.ledeA")}
            <a href={SITE.alx} target="_blank" rel="noopener noreferrer" className="font-semibold text-white underline decoration-transparent underline-offset-4 transition hover:decoration-white">
              ALX Africa
            </a>
            {t("hero.ledeB")}
          </p>
          <Button href="#projects">{t("hero.cta")}</Button>
        </div>

        <div className="relative shrink-0 print:hidden">
          <div className="absolute -inset-6 bg-[radial-gradient(circle,rgba(255,255,255,0.28),transparent_70%)]" aria-hidden="true" />
          {imageOk ? (
            <img
              src="./public/images/maro.png"
              alt={SITE.name}
              width="280"
              height="280"
              onError={() => setImageOk(false)}
              className="relative z-[1] h-[280px] w-[280px] animate-[float_4s_ease-in-out_infinite] rounded-full border-4 border-white/30 object-cover shadow-[0_20px_45px_rgba(0,0,0,0.5)] max-[900px]:h-[220px] max-[900px]:w-[220px]"
            />
          ) : (
            <div className="relative z-[1] flex h-[280px] w-[280px] items-center justify-center rounded-full border-4 border-white/30 bg-white/10 font-display text-6xl font-bold max-[900px]:h-[220px] max-[900px]:w-[220px]" aria-hidden="true">
              MM
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
