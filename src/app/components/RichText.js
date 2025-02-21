import classNames from "classnames";

export default function RichText({ richText }) {
  return (
    <>
      {richText.map((item, index) => {
        const itemClass = classNames({
          "font-bold": item.annotations.bold,
          "font-semibold text-red mr-2": item.annotations.code,
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
    </>
  );
}
