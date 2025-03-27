export default function Header({ text }) {
  return (
    <div className="font-serif text-xl md:text-right mb-4 md:mb-0 relative w-28 md:-left-32 md:translate-y-[100%] mt-4 italic">
      {text.filter((item) => item.annotations.color !== "gray").map((item) => item.plain_text)}
    </div>
  );
}
