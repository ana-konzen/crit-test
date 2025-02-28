import { fetchBlockChildren, fetchPageTitle } from "@/notion/notion";
import ToggleBlock from "@/app/components/nav/ToggleBlock";
import { cache } from "react";
import Link from "next/link";

const pages = ["Preface", "The Case", "The Framework", "Case Studies", "Interviews"];
const romanNumbers = ["I", "II", "III", "IV", "V"];

export const revalidate = 60;

export default async function NavBar() {
  const toc = await getToc();
  return (
    <div className="bg-red z-10 font-serif m-[5vh] text-cream h-[90vh] fixed p-8 w-menu rounded-[25px]">
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
        if (block.has_children) {
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

export const getToc = cache(async () => {
  const blocks = await fetchBlockChildren({
    block_id: "1a75ae7ea4ba8030a2dcc88dafa1b27a",
  });
  await Promise.all(
    blocks.map(async (block) => {
      if (block.has_children) {
        const blockChildren = await fetchBlockChildren({
          block_id: block.id,
        });
        await Promise.all(
          blockChildren.map(async (child) => {
            if (child.type === "link_to_page") {
              child.title = await fetchPageTitle({ page_id: child.link_to_page.page_id });
              child.page_id = child.link_to_page.page_id;
              child.slug = createSlug(child.title);
            }

            if (child.type === "toggle" && child.has_children) {
              const childBlockChildren = await fetchBlockChildren({
                block_id: child.id,
              });
              child.children = childBlockChildren;
              child.title = child.toggle.rich_text[0].plain_text;
            }
          })
        );
        block.children = blockChildren;
      }
    })
  );
  return blocks;
});

function createSlug(title) {
  return title.toLowerCase().replaceAll(" ", "-");
}
