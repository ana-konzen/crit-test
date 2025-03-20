export default function SubHeader({ text }) {
  return (
    <h4 className="font-sans font-bold md:text-lg mb-2">
      {text.filter((item) => item.annotations.color !== "gray").map((item) => item.plain_text)}
    </h4>
  );
}
