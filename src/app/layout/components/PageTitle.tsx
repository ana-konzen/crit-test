import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export default function PageTitle({ text }: { text: RichTextItemResponse[] }) {
  return (
    <div className="font-serif text-2xl lg:text-right lg:absolute lg:mb-0 mb-8 w-28 lg:-left-28 lg:-ml-4 xl:-ml-8 italic">
      {text.filter((item) => item.annotations.color !== "gray").map((item) => item.plain_text)}
    </div>
  );
}
