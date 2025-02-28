export default function PageTitle({ text }) {
  return (
    <div className="font-serif text-3xl text-right absolute w-36 -left-36 italic">
      {text.map((item) => {
        if (item.annotations.color === "gray") {
          return null;
        }
        return item.plain_text;
      })}
    </div>
  );
}
