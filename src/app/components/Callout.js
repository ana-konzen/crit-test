import RichText from "@/app/components/RichText";

export default function Callout({ text }) {
  return (
    <div className="font-serif bg-lightRed text-sm m-8 p-4">
      <RichText richText={text} />
    </div>
  );
}
