export default function SubHeader({ text }) {
  return (
    <h4 className="font-sans font-bold text-lg my-2">
      {text.map((text) => {
        if (text.annotations.color === "gray") {
          return "";
        }
        return text.plain_text;
      })}
    </h4>
  );
}
