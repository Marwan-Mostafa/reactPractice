const variants = {
  primary: "bg-header text-white hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-brand active:translate-y-0 active:scale-[0.98]",
  outline: "border-primary text-primary hover:bg-primary hover:text-white hover:-translate-y-0.5",
  accent: "bg-accent text-header hover:-translate-y-0.5 hover:shadow-brand-sm",
  dark: "bg-header text-white hover:bg-black hover:-translate-y-0.5",
};
const sizes = { md: "px-8 py-3.5 text-[0.95rem]", sm: "px-5 py-2 text-[0.85rem]" };

// Polymorphic: <Button> renders an <a> by default, <Button as="button"> renders a <button>.
export default function Button({ as: Tag = "a", variant = "primary", size = "md", className = "", ...props }) {
  return (
    <Tag
      className={`inline-block cursor-pointer rounded-full border-2 border-transparent font-semibold no-underline transition duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
