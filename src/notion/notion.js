"use server";
import "dotenv/config";

import { Client } from "@notionhq/client";

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

export async function fetchBlockChildren({ block_id }) {
  const response = await notion.blocks.children.list({ block_id, page_size: 50 });
  return response.results;
}
