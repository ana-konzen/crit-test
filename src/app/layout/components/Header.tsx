import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export default function Header({ text }: { text: RichTextItemResponse[] }) {
  return (
    <div className="font-serif text-xl lg:text-right mb-4 lg:mb-0 relative lg:w-28 lg:-left-32 lg:translate-y-[100%] mt-4 italic">
      {text.filter((item) => item.annotations.color !== "gray").map((item) => item.plain_text)}
    </div>
  );
}
