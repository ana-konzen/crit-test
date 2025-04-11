import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export default function Header2({ text }: { text: RichTextItemResponse[] }) {
  return (
    <h3 className="font-sans text-lg font-bold mb-2">
      {text.filter((item) => item.annotations.color !== "gray").map((item) => item.plain_text)}
    </h3>
  );
}
