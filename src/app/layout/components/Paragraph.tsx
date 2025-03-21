import RichText from "@/app/layout/components/RichText";
import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export default function Paragraph({ text }: { text: RichTextItemResponse[] }) {
  return (
    <p className="font-serif text-sm mb-4">
      <RichText richText={text} />
    </p>
  );
}
