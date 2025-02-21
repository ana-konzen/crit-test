export default function SubHeader({ text }) {
  return (
    <h4 className="font-sans font-bold text-lg my-2">
      {text.map((item) => {
        if (item.annotations.color === "gray") {
          return "";
        }
        return item.plain_text;
      })}
    </h4>
  );
}
