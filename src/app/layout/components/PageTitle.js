export default function PageTitle({ text }) {
  return (
    <div className="font-serif text-2xl text-right absolute w-28 -left-28 -ml-4 xl:-ml-8 italic">
      {text.map((item) => {
        if (item.annotations.color === "gray") {
          return null;
        }
        return item.plain_text;
      })}
    </div>
  );
}
