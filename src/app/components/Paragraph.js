import classNames from "classnames";

export default function Paragraph({ text }) {
  if (text.length > 0) {
    return (
      <p className="font-serif text-sm mb-4">
        {text.map((item, index) => {
          const itemClass = classNames({
            "font-bold": item.annotations.bold,
            italic: item.annotations.italic,
            underline: item.annotations.underline,
            hidden: item.annotations.color === "gray",
          });
          return (
            <span key={index} className={itemClass}>
              {item.plain_text}
            </span>
          );
        })}
      </p>
    );
  }
  return <></>;
}
