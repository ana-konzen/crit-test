import classNames from "classnames";
import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export default function RichText({ richText }: { richText: RichTextItemResponse[] }) {
  return (
    <>
      {richText
        .filter((item) => item.annotations.color !== "gray")
        .map((item, index) => {
          const itemClass = classNames({
            "font-bold": item.annotations.bold,
            "font-semibold text-red mx-1": item.annotations.code,
            "italic": item.annotations.italic,
            "underline": item.annotations.underline || item.href,
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
