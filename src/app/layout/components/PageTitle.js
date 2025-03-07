export default function PageTitle({ text }) {
  return (
    <div className="font-serif text-2xl md:text-right md:absolute md:mb-0 mb-8 w-28 md:-left-28 md:-ml-4 xl:-ml-8 italic">
      {text.map((item) => {
        if (item.annotations.color === "gray") {
          return null;
        }
        return item.plain_text;
      })}
    </div>
  );
}
