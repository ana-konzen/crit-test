import RichText from "@/app/layout/components/RichText";

export default function StatBlock({ blockChildren }) {
  return (
    <div className="flex my-4 font-sans flex-row justify-between border-y-2 border-gray py-4">
      {blockChildren.map((block, index) => {
        return <StatBlockCol key={index} text={block[block.type].rich_text} />;
      })}
    </div>
  );
}

function StatBlockCol({ text }) {
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
