import { SITE } from "../data/site.js";

function buildVCard() {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${SITE.name};;;`,
    `FN:${SITE.name}`,
    `TITLE:${SITE.title}`,
    `EMAIL;TYPE=INTERNET:${SITE.email}`,
    `URL:${SITE.github}`,
    "END:VCARD",
  ].join("\n");
}

export function downloadVCard() {
  const url = URL.createObjectURL(new Blob([buildVCard()], { type: "text/vcard" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "marwan-mostafa.vcf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
