import RichText from "@/app/layout/components/RichText";
import { RichTextItemResponse, BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export default function CritInfo({ blockChildren }: { blockChildren: BlockObjectResponse[] | undefined }) {
  if (!blockChildren) return null;
  return (
    <div className="top-0 w-auto border-gray ">
      {blockChildren
        .filter((item) => item.type === "paragraph")
        .map((item, index) => {
          return <InfoLine key={index} text={item.paragraph.rich_text} />;
        })}
    </div>
  );
}

function InfoLine({ text }: { text: RichTextItemResponse[] }) {
  return (
    <div className="font-sans flex mb-1">
      <RichText
        richText={text}
        modifyStyles={(item) => ({
          "mx-0": item.annotations.code,
        })}
      />
    </div>
  );
}
