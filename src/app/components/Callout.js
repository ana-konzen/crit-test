import RichText from "@/app/components/RichText";

export default function Callout({ text }) {
  if (text.length > 0) {
    return (
      <div className="font-serif bg-lightRed text-sm m-8 p-4">
        <RichText richText={text} />
      </div>
    );
  }
  return <></>;
}
