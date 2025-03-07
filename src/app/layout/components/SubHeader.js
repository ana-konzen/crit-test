export default function SubHeader({ text }) {
  return (
    <h4 className="font-sans font-bold md:text-lg mb-2">
      {text.map((item) => {
        if (item.annotations.color === "gray") {
          return null;
        }
        return item.plain_text;
      })}
    </h4>
  );
}
