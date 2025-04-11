import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export default function Header3({ text }: { text: RichTextItemResponse[] }) {
  return (
    <h4 className="font-sans font-bold mb-2">
      {text.filter((item) => item.annotations.color !== "gray").map((item) => item.plain_text)}
    </h4>
  );
}
