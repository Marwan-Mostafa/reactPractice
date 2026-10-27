import { useEffect, useRef, useState } from "react";
import { SITE } from "../../data/site.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { downloadVCard } from "../../lib/vcard.js";
import Button from "../ui/Button.jsx";
import Section, { SectionTitle } from "../ui/Section.jsx";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const inputClass =
  "w-full rounded-lg border-2 border-line bg-surface-alt px-4 py-3.5 text-[0.95rem] text-ink transition focus:border-primary focus:ring-4 focus:ring-primary/15 focus:outline-none";

export default function Contact() {
  const { t } = useLanguage();
  // status: idle | sending | success | error
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const emailRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    clearTimeout(timer.current);
    const { name, email, message } = values;

    if (!name.trim() || !email.trim() || !message.trim()) return setStatus({ state: "error", message: t("contact.fillAll") });
    if (!EMAIL_PATTERN.test(email.trim())) {
      emailRef.current?.focus();
      return setStatus({ state: "error", message: t("contact.invalidEmail") });
    }
    if (!SITE.formEndpoint) return setStatus({ state: "error", message: t("contact.notConfigured") });

    setStatus({ state: "sending", message: "" });
    try {
      const res = await fetch(SITE.formEndpoint, {
        method: "POST",
        body: new FormData(e.target),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Form endpoint responded with ${res.status}`);
      setValues({ name: "", email: "", message: "" });
      setStatus({ state: "success", message: t("contact.success") });
      timer.current = setTimeout(() => setStatus((s) => ({ ...s, state: "idle" })), 3000);
    } catch {
      setStatus({ state: "error", message: t("contact.error") });
    }
  }

  const label = { idle: t("contact.send"), sending: t("contact.sending"), success: t("contact.sent"), error: t("contact.send") }[status.state];
  const btnColor = status.state === "success" ? "bg-success" : status.state === "error" ? "bg-danger" : "bg-brand";

  return (
    <Section id="contact" className="bg-brand text-center text-white">
      <SectionTitle>{t("contact.heading")}</SectionTitle>
      <div className="mx-auto mt-8 grid max-w-[1380px] grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] items-start gap-8 text-start">
        <form onSubmit={onSubmit} noValidate className="rounded-2xl bg-surface p-8 text-ink shadow-[0_20px_45px_rgba(0,0,0,0.3)] max-sm:p-6 print:hidden">
          {[
            { name: "name", type: "text", autoComplete: "name" },
            { name: "email", type: "email", autoComplete: "email" },
          ].map((f) => (
            <div key={f.name} className="mb-6">
              <label htmlFor={f.name} className="mb-2 block text-[0.9rem] font-semibold">{t(`contact.${f.name}`)}</label>
              <input id={f.name} ref={f.name === "email" ? emailRef : null} className={inputClass} placeholder={t(`contact.${f.name}Ph`)} value={values[f.name]} onChange={onChange} required {...f} />
            </div>
          ))}
          <div className="mb-6">
            <label htmlFor="message" className="mb-2 block text-[0.9rem] font-semibold">{t("contact.message")}</label>
            <textarea id="message" name="message" rows="5" className={inputClass} placeholder={t("contact.messagePh")} value={values.message} onChange={onChange} required />
          </div>
          <button
            type="submit"
            disabled={status.state === "sending"}
            className={`w-full cursor-pointer rounded-full ${btnColor} p-3.5 font-semibold text-white transition hover:enabled:-translate-y-0.5 hover:enabled:shadow-brand active:enabled:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-75`}
          >
            {label}
          </button>
          <p role="status" aria-live="polite" className={`mt-4 min-h-[1.2em] text-[0.9rem] ${status.state === "error" ? "text-danger" : status.state === "success" ? "text-success" : "text-muted"}`}>
            {status.message}
          </p>
        </form>

        <div className="rounded-2xl bg-white/12 p-8 shadow-sm max-sm:p-6">
          <p className="mb-4 font-medium">{t("contact.reach")}</p>
          <ul className="m-0 list-none p-0">
            {[
              { label: SITE.email, href: `mailto:${SITE.email}` },
              { label: "GitHub", href: SITE.github },
              { label: "LinkedIn", href: SITE.linkedin },
            ].map((l) => (
              <li key={l.label} className="mb-4">
                <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="font-semibold text-white no-underline transition-colors hover:text-header">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t border-white/15 pt-8 print:hidden">
            <p className="mb-4 text-[0.9rem] font-medium">{t("vcard.label")}</p>
            <div className="flex flex-wrap items-center gap-6">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=8&data=${encodeURIComponent("mailto:" + SITE.email)}`}
                alt="QR code for email"
                width="160"
                height="160"
                className="rounded-lg bg-white p-1"
              />
              <Button as="button" size="sm" onClick={downloadVCard}>{t("vcard.button")}</Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
