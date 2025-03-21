export default function PageTitle({ title }: { title: string }) {
  return (
    <div className="font-serif text-2xl lg:text-right lg:absolute lg:mb-0 mb-8 w-28 lg:-left-28 lg:-ml-8 italic">
      {title}
    </div>
  );
}
