export default function Header({ text }) {
  return (
    <h3 className="font-serif text-2xl mt-4 mb-2 italic">
      {text.map((text) => {
        if (text.annotations.color === "gray") {
          return "";
        }
        return text.plain_text;
      })}
    </h3>
  );
}
