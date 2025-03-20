export default function PageTitle({ text }) {
  return (
    <div className="font-serif text-2xl md:text-right md:absolute md:mb-0 mb-8 w-28 md:-left-28 md:-ml-4 xl:-ml-8 italic">
      {text.filter((item) => item.annotations.color !== "gray").map((item) => item.plain_text)}
    </div>
  );
}
