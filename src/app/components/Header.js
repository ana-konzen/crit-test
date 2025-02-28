export default function Header({ text }) {
  return (
    <div className="font-serif text-xl text-right relative w-28 -left-32 translate-y-[100%] mt-4 italic">
      {text.map((item) => {
        if (item.annotations.color === "gray") {
          return null;
        }
        return item.plain_text;
      })}
    </div>
  );
}
