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

export const getPageContent = async (pageId) => {
  const blocks = await fetchBlockChildren({
    block_id: pageId,
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
};

export async function getToc() {
  const blocks = await fetchBlockChildren({
    block_id: "1a75ae7ea4ba8030a2dcc88dafa1b27a", //toc page on notion
  });
  await Promise.all(
    blocks.map(async (block) => {
      if (block.type === "toggle" && block.has_children) {
        const blockChildren = await fetchBlockChildren({
          block_id: block.id,
        });
        await Promise.all(
          blockChildren.map(async (child) => {
            if (child.type === "link_to_page") {
              child.page_id = child.link_to_page.page_id;
              child.title = await fetchPageTitle({
                page_id: child.link_to_page.page_id,
              });
              child.slug = createSlug(child.title);
            }
          })
        );
        block.children = blockChildren;
      }
    })
  );
  return blocks;
}
