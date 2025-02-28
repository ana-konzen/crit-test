import RichText from "@/app/components/RichText";

export default function CritInfo({ blockChildren }) {
  return (
    <div className="border-l-2 right-0 translate-x-[100%] top-10 absolute border-gray py-1 px-4 mt-4">
      {blockChildren.map((item, index) => {
        return <InfoLine key={index} text={item.paragraph.rich_text} />;
      })}
    </div>
  );
}

function InfoLine({ text }) {
  return (
    <div className="font-sans mb-1 text-sm">
      <RichText richText={text} />
    </div>
  );
}
