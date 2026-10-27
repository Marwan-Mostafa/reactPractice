export default function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`px-[8%] py-24 max-sm:px-[6%] max-sm:py-12 ${className}`}>
      {children}
    </section>
  );
}

export function SectionTitle({ children, className = "" }) {
  return (
    <h2
      className={`relative mb-12 inline-block text-[clamp(1.75rem,3vw,2.25rem)] after:mt-2 after:block after:h-1 after:w-12 after:rounded-full after:bg-brand after:content-[''] max-sm:mb-8 ${className}`}
    >
      {children}
    </h2>
  );
}
