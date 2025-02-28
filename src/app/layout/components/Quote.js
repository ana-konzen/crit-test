import RichText from "@/app/layout/components/RichText";

export default function Quote({ text }) {
  return (
    <div className="font-serif text-red text-sm m-8 pl-8">
      <RichText richText={text} />
    </div>
  );
}
