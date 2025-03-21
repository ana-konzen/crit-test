import RichText from "@/app/layout/components/RichText";
import { RichTextItemResponse, BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export default function StatBlock({ blockChildren }: { blockChildren: BlockObjectResponse[] | undefined }) {
  if (!blockChildren) return null;
  return (
    <div className="flex my-4 font-sans md:flex-row gap-4 md:gap-0 flex-col md:justify-between border-y-2 border-gray py-4">
      {blockChildren.map((block) => {
        const blockContent = block[block.type as keyof BlockObjectResponse];
        return (
          <StatBlockCol
            key={block.id}
            text={
              blockContent && typeof blockContent === "object" && "rich_text" in blockContent
                ? (blockContent.rich_text as RichTextItemResponse[])
                : []
            }
          />
        );
      })}
    </div>
  );
}

function StatBlockCol({ text }: { text: RichTextItemResponse[] }) {
  return (
    <div className="flex flex-col">
      <RichText
        richText={text}
        modifyStyles={(item) => ({
          "mb-1": item.plain_text !== "| ",
          "mx-0": item.annotations.code,
          "text-transparent border-b border-lightGray mt-[-1.5em] mb-1": item.plain_text === "| ",
        })}
      />
    </div>
  );
}
