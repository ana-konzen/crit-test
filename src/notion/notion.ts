// "use server";
import "dotenv/config";

import { Client } from "@notionhq/client";

// import types from notion
import type {
  GetPageParameters,
  PartialPageObjectResponse,
  PageObjectResponse,
  BlockObjectResponse,
  LinkToPageBlockObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

import { createSlug } from "@/util";

type Id = string;
// todo: remove slug when no longer needed
type CustomBlock = BlockObjectResponse & { children?: BlockObjectResponse[]; slug?: string };

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

export async function fetchBlockChildren(block_id: Id): Promise<BlockObjectResponse[]> {
  const response = await notion.blocks.children.list({
    block_id,
    page_size: 100,
  });

  return response.results.filter(isFullBlock);
}

export async function getPageContent(block_id: Id): Promise<CustomBlock[]> {
  const blocks = await fetchBlockChildren(block_id);
  const blocksWithChildren = await Promise.all(
    blocks.map(async (block: CustomBlock) => {
      if (block.has_children) {
        block.children = await fetchBlockChildren(block.id);
      }
      return block;
    })
  );
  return blocksWithChildren;
}

async function fetchPageTitle({ page_id }: GetPageParameters) {
  const response = await notion.pages.retrieve({ page_id });
  if (!isFullPage(response)) {
    throw new Error("Expected full page");
  }
  if (!(response.properties.title.type === "title")) {
    throw new Error("Expected title to be of type title");
  }
  return response.properties.title.title[0].plain_text.trim();
}

// todo: have getToc return a simple data structure instead of the notion stuff
interface ExtendedLinkToPageBlockObjectResponse extends LinkToPageBlockObjectResponse {
  page_id: string;
  title: string;
  slug: string;
}
export async function getToc(): Promise<CustomBlock[]> {
  const blocks = await fetchBlockChildren("1a75ae7ea4ba8030a2dcc88dafa1b27a");

  await Promise.all(
    blocks
      .filter((block) => block.type === "toggle" && block.has_children)
      .map(async (block: CustomBlock) => {
        const blockChildren = await fetchBlockChildren(block.id);

        await Promise.all(
          blockChildren
            .filter((child) => child.type === "link_to_page")
            .map(async (child) => {
              const extendedChild = child as ExtendedLinkToPageBlockObjectResponse;

              if (!(child.link_to_page.type === "page_id")) {
                throw new Error("Expected link_to_page to be of type page_id");
              }
              extendedChild.page_id = child.link_to_page.page_id;
              extendedChild.title = (await fetchPageTitle({ page_id: extendedChild.page_id })) ?? "";
              extendedChild.slug = createSlug(extendedChild.title);
            })
        );

        if (block.type === "toggle") {
          block.slug = createSlug(block.toggle.rich_text[0].plain_text);
        }

        block.children = blockChildren;
      })
  );

  return blocks;
}

export async function getContentParams() {
  const toc = await getToc();

  return toc.flatMap((block) =>
    block.type === "toggle" && block.has_children && block.children
      ? block.children
          .filter((child) => child.type === "link_to_page")
          .map((child) => {
            const { page_id, title, slug } = child as ExtendedLinkToPageBlockObjectResponse;
            return {
              parent_slug: block.slug,
              page_id,
              title,
              slug,
            };
          })
      : []
  );
}
