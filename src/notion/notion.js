// "use server";
import "dotenv/config";

import { Client } from "@notionhq/client";
import { createSlug } from "@/util";

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export async function fetchDatabase({ database_id, filter }) {
  const response = await notion.databases.query({
    database_id,
    filter,
  });
  return response.results;
}

export async function fetchPageTitle({ page_id }) {
  const response = await notion.pages.retrieve({ page_id });
  return response.properties.title.title[0].plain_text.trim();
}

export async function fetchBlockChildren({ block_id }) {
  const response = await notion.blocks.children.list({
    block_id,
    page_size: 100,
  });
  return response.results;
}

export async function getPageContent({ block_id }) {
  const blocks = await fetchBlockChildren({
    block_id,
  });
  await Promise.all(
    blocks.map(async (block) => {
      if (block.has_children) {
        const blockChildren = await fetchBlockChildren({
          block_id: block.id,
        });
        block.children = blockChildren;
      }
    })
  );
  return blocks;
}

export async function getToc() {
  const blocks = await fetchBlockChildren({ block_id: "1a75ae7ea4ba8030a2dcc88dafa1b27a" });

  await Promise.all(
    blocks
      .filter((block) => block.type === "toggle" && block.has_children)
      .map(async (block) => {
        const blockChildren = await fetchBlockChildren({ block_id: block.id });

        await Promise.all(
          blockChildren
            .filter((child) => child.type === "link_to_page")
            .map(async (child) => {
              child.page_id = child.link_to_page.page_id;
              child.title = await fetchPageTitle({ page_id: child.page_id });
              child.slug = createSlug(child.title);
            })
        );

        block.slug = createSlug(block.toggle.rich_text[0].plain_text);

        block.children = blockChildren;
      })
  );

  return blocks;
}

export async function getContentParams() {
  const toc = await getToc();

  return toc.flatMap((block) =>
    block.type === "toggle" && block.has_children
      ? block.children
          .filter((child) => child.type === "link_to_page")
          .map(({ page_id, title, slug }) => ({
            parent_slug: block.slug,
            page_id,
            title,
            slug,
          }))
      : []
  );
}
