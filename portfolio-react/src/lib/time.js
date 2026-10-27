export function timeAgo(dateString, lang) {
  const ar = lang === "ar";
  const days = Math.floor((Date.now() - new Date(dateString).getTime()) / 86400000);
  if (days < 1) return ar ? "اليوم" : "today";
  if (days === 1) return ar ? "أمس" : "yesterday";
  if (days < 30) return days + (ar ? " يوم" : "d");
  return Math.floor(days / 30) + (ar ? " شهر" : "mo");
}
