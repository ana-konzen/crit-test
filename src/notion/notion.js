"use server";
import "dotenv/config";
import { cache } from "react";

import { Client } from "@notionhq/client";

export const revalidate = 60;

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

export const getPageContent = cache(async (pageId) => {
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
});
