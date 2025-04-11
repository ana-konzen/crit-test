import classNames from "classnames";
import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export default function RichText({
  richText,
  modifyStyles = () => ({}),
}: {
  richText: RichTextItemResponse[];
  modifyStyles?: (item: RichTextItemResponse) => Record<string, boolean>;
}) {
  return (
    <>
      {richText
        .filter((item) => item.annotations.color !== "gray")
        .map((item, index) => {
          const styleModifications = modifyStyles(item);
          const itemClass = classNames({
            "font-bold": item.annotations.bold,
            "font-semibold text-red mx-1": item.annotations.code,
            "italic": item.annotations.italic,
            "underline": item.annotations.underline || item.href,
            "bg-highlight": item.annotations.color === "yellow_background",
            "strike-through": item.annotations.strikethrough,
            ...styleModifications,
          });
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
