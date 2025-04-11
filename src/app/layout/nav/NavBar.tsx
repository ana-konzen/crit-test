import { getToc, TocItem } from "@/notion/notion";
import ToggleBlock from "@/app/layout/nav/ToggleBlock";
import Link from "next/link";

const romanNumbers = ["I", "II", "III", "IV", "V"];

export default async function NavBar() {
  const toc = await getToc();
  return (
    <div className="bg-red z-10 font-serif hidden md:block left-menu-margin top-menu-margin w-menu-min-w text-cream h-menu-h fixed p-8 xl:w-menu-max-w rounded-menu-r">
      <Link href="/">
        <h1 className="text-xl font-display mb-10">
          Designing
          <br />
          Design
          <br />
          Crits
        </h1>
      </Link>
      <div className="flex flex-col mt-4">
        <Toc content={toc} />
      </div>
    </div>
  );
}

function Toc({ content }: { content: TocItem[] }) {
  return (
    <>
      {content.map((block, index) => {
        return (
          <ToggleBlock
            key={block.id}
            title={`${romanNumbers[index]}. ${block.title}`}
            slug={block.slug}
            blockChildren={block.children}
          />
        );
      })}
    </>
  );
}
