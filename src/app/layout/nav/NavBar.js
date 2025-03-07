import { getToc } from "@/notion/notion";
import ToggleBlock from "@/app/layout/nav/ToggleBlock";
import Link from "next/link";

const romanNumbers = ["I", "II", "III", "IV", "V"];

export default async function NavBar() {
  const toc = await getToc();
  return (
    <div className="bg-red z-10 font-serif hidden md:block left-[var(--menu-margin)] top-[var(--menu-margin)] max-w-[var(--menu-max-width)]  min-w-[var(--menu-min-width)] text-cream h-[90vh] fixed p-8 w-menu rounded-[25px]">
      <Link href="/">
        <h1 className="text-xl mb-10">
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

function Toc({ content }) {
  return (
    <>
      {content.map((block, index) => {
        if (block.type === "toggle" && block.has_children) {
          return (
            <ToggleBlock
              key={block.id}
              title={`${romanNumbers[index]}. ${block.toggle.rich_text[0].plain_text}`}
              slug={createSlug(block.toggle.rich_text[0].plain_text)}
              blockChildren={block.children}
            />
          );
        }
      })}
    </>
  );
}

function createSlug(title) {
  return title.toLowerCase().replaceAll(" ", "-");
}
