import RichText from "@/app/layout/components/RichText";
import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export default function Quote({ text }: { text: RichTextItemResponse[] }) {
  return (
    <div className="font-serif text-red border-l-2 border-red text-sm m-8 pl-4 ml-12">
      <RichText richText={text} />
    </div>
  );
}
