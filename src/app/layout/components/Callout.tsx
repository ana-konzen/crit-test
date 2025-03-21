import RichText from "@/app/layout/components/RichText";
import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export default function Callout({ text }: { text: RichTextItemResponse[] }) {
  return (
    <div className="font-serif bg-lightRed text-sm m-8 p-4">
      <RichText richText={text} />
    </div>
  );
}
