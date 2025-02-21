import RichText from "@/app/components/RichText";

export default function Paragraph({ text }) {
  if (text.length > 0) {
    return (
      <p className="font-serif text-sm mb-4">
        <RichText richText={text} />
      </p>
    );
  }
  return <></>;
}
