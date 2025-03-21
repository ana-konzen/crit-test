import RichText from "@/app/layout/components/RichText";
import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export default function Quote({ text }: { text: RichTextItemResponse[] }) {
  return (
    <div className="font-serif text-red text-sm m-8 pl-8">
      <RichText richText={text} />
    </div>
  );
}
