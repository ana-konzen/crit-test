import RichText from "@/app/layout/components/RichText";
import { RichTextItemResponse, BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export default function Callout({
  text,
  block,
}: {
  text: RichTextItemResponse[];
  block: BlockObjectResponse;
}) {
  if (block.type !== "callout") return null;
  const emoji = block.callout.icon?.type === "emoji" ? block.callout.icon.emoji : null;
  return (
    <div className="font-serif flex bg-light-red text-sm m-8 p-4">
      <div className="mr-4 text-xl">{emoji}</div>
      <div>
        <RichText richText={text} />
      </div>
    </div>
  );
}
