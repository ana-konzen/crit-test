import RichText from "@/app/layout/components/RichText";
import { RichTextItemResponse, BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const statBlockCats = ["Purpose", "Subject", "Structure", "Critic", "Participation"];

export default function StatBlock({ blockChildren }: { blockChildren: BlockObjectResponse[] | undefined }) {
  if (!blockChildren) return null;
  return (
    <div className="flex my-4 font-sans text-sm rounded-lg md:flex-row items-start gap-4 md:gap-4 flex-col md:justify-between">
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
    <div className="flex flex-col border-red border rounded-xl p-1 w-full">
      <RichText
        richText={text}
        modifyStyles={(item) => ({
          "mb-1 mx-0 text-center": item.plain_text !== "| ",
          "mx-0": item.annotations.code,
          "bg-red text-cream py-1 px-2 rounded-xl text-center": statBlockCats.includes(
            item.plain_text.trim()
          ),
          "text-transparent border-b border-lightGray mt-[-1.5em] mb-1": item.plain_text === "| ",
        })}
      />
    </div>
  );
}
