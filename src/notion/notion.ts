// "use server";
import "dotenv/config";

import { Client } from "@notionhq/client";

// import types from notion
import type {
  GetPageParameters,
  PartialPageObjectResponse,
  PageObjectResponse,
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

import { createSlug } from "@/util";

type Id = string;

export type CustomBlock = BlockObjectResponse & { children?: BlockObjectResponse[] };

function isFullPage(
  response: PageObjectResponse | PartialPageObjectResponse
): response is PageObjectResponse {
  return "properties" in response;
}
function isFullBlock(block: BlockObjectResponse | PartialBlockObjectResponse): block is BlockObjectResponse {
  return "type" in block;
}

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export async function getBlockChildren(block_id: Id): Promise<BlockObjectResponse[]> {
  const response = await notion.blocks.children.list({
    block_id,
    page_size: 100,
  });

  return response.results.filter(isFullBlock);
}

export async function getPageContent(block_id: Id): Promise<CustomBlock[]> {
  const blocks = await getBlockChildren(block_id);
  const blocksWithChildren = await Promise.all(
    blocks.map(async (block: CustomBlock) => {
      if (block.has_children) {
        block.children = await getBlockChildren(block.id);
      }
      return block;
    })
  );
  return blocksWithChildren;
}

export async function getPageTitle(page_id: GetPageParameters | Id): Promise<string> {
  const params = typeof page_id === "string" ? { page_id } : page_id;
  const response = await notion.pages.retrieve(params);
  if (!isFullPage(response)) {
    throw new Error("Expected full page");
  }
  if (!(response.properties.title.type === "title")) {
    throw new Error("Expected title to be of type title");
  }
  return response.properties.title.title[0].plain_text.trim();
}

export interface TocItem {
  title: string;
  slug: string;
  id: string;
  children: TocChild[];
}

export interface TocChild {
  page_id: string;
  title: string;
  slug: string;
  id: string;
}

export async function getToc(): Promise<TocItem[]> {
  const blocks = await getBlockChildren("1a75ae7ea4ba8030a2dcc88dafa1b27a");
  const toc = [];

  for await (const block of blocks) {
    if (!block.has_children || block.type !== "toggle") continue;

    const blockChildren = await getBlockChildren(block.id);

    const extendedChildren = [];

    for await (const child of blockChildren) {
      if (child.type !== "link_to_page" || child.link_to_page.type !== "page_id") continue;
      const childTitle = await getPageTitle(child.link_to_page.page_id);

      extendedChildren.push({
        page_id: child.link_to_page.page_id,
        title: childTitle,
        slug: createSlug(childTitle),
        id: child.id,
      });
    }

    toc.push({
      title: block.toggle.rich_text[0].plain_text,
      slug: createSlug(block.toggle.rich_text[0].plain_text),
      id: block.id,
      children: extendedChildren,
    });
  }

  return toc;
}

export async function getContentParams() {
  const toc = await getToc();

  return toc.flatMap((block) =>
    block.children
      ? block.children.map((child) => {
          return {
            parent_slug: block.slug,
            page_id: child.page_id,
            title: child.title,
            slug: child.slug,
          };
        })
      : []
  );
}
