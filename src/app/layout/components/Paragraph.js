import RichText from "@/app/layout/components/RichText";

export default function Paragraph({ text }) {
  return (
    <p className="font-serif text-sm mb-4">
      <RichText richText={text} />
    </p>
  );
}
