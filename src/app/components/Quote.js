import RichText from "@/app/components/RichText";

export default function Quote({ text }) {
  if (text.length > 0) {
    return (
      <div className="font-serif text-red text-sm m-8 pl-8">
        <RichText richText={text} />
      </div>
    );
  }
  return <></>;
}
