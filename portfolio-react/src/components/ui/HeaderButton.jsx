// One shared look for every icon-only control in the header.
export default function HeaderButton({ className = "", pressed, children, ...props }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={`flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/15 active:scale-90 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent aria-pressed:border-accent/50 aria-pressed:bg-accent/15 aria-pressed:text-accent max-[400px]:h-9 max-[400px]:w-9 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
