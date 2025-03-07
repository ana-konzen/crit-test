import classNames from "classnames";

export default function RichText({ richText, modifyStyles = () => ({}) }) {
  return (
    <>
      {richText.map((item, index) => {
        const styleModifications = modifyStyles(item);

        const itemClass = classNames({
          "font-bold": item.annotations.bold,
          "font-semibold text-red mx-1": item.annotations.code,
          "italic": item.annotations.italic,
          "underline": item.annotations.underline || item.href,
          ...styleModifications,
        });
        if (item.annotations.color === "gray") {
          return null;
        }
        if (item.href) {
          return (
            <a key={index} href={item.href} className={itemClass} target="_blank">
              {item.plain_text}
            </a>
          );
        }
        return (
          <span key={index} className={itemClass}>
            {item.plain_text}
          </span>
        );
      })}
    </>
  );
}
