import classNames from "classnames";
import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

// modifyStyles is a call back that receives each item and can add/override styles
// it returns an object with class names as keys and boolean values, following the classNames style

export default function RichText({
  richText: richTextItems,
  modifyStyles = () => ({}),
}: {
  richText: RichTextItemResponse[];
  modifyStyles?: (item: RichTextItemResponse) => Record<string, boolean>;
}) {
  return (
    <>
      {richTextItems
        .filter((item) => item.annotations.color !== "gray") // remove "gray" items
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
