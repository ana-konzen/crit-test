export default function Paragraph({ text }) {
  const styleDict = {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
  };

  if (text.length > 0) {
    return (
      <p className="font-serif text-sm mb-4">
        {text.map((text, index) => {
          return (
            <span
              key={index}
              className={`${text.annotations.bold ? styleDict.bold : ""} ${
                text.annotations.italic ? styleDict.italic : ""
              }  ${text.annotations.color === "gray" ? "hidden" : ""}`}
            >
              {text.plain_text}
            </span>
          );
        })}
      </p>
    );
  }
  return <></>;
}
