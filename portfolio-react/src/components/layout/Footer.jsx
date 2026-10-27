import { useLanguage } from "../../context/LanguageContext.jsx";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-header px-4 py-8 text-center text-[0.85rem] font-medium text-[#c4cbd6] print:hidden">
      <p>© {new Date().getFullYear()} {t("footer.rights")}</p>
    </footer>
  );
}
