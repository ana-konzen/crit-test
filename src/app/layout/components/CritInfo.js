import RichText from "@/app/layout/components/RichText";

export default function CritInfo({ blockChildren }) {
  return (
    <div className="lg:border-l lg:-right-4 lg:translate-x-[100%] top-0 w-auto lg:w-[30%] xl:w-auto lg:absolute border-gray lg:py-1 lg:px-2">
      {blockChildren.map((item, index) => {
        return <InfoLine key={index} text={item.paragraph.rich_text} />;
      })}
    </div>
  );
}

function InfoLine({ text }) {
  return (
    <div className="font-sans flex lg:flex-col xl:flex-row mb-1 text-sm">
      <RichText
        richText={text}
        modifyStyles={(item) => ({
          "mx-0": item.annotations.code,
        })}
      />
    </div>
  );
}
