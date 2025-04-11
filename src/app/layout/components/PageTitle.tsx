export default function PageTitle({ title }: { title: string }) {
  return (
    <div className="font-display text-2xl lg:text-right lg:absolute lg:mb-0 mb-8 w-28 lg:-left-28 italic lg:-ml-8">
      {title}
    </div>
  );
}
