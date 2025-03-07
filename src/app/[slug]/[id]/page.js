import { getPageContent, getToc } from "@/notion/notion";

import PageLayout from "@/app/layout/PageLayout";

// Pre-generates these pages at build time: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
// not sure if this is the best way to do this?
export async function generateStaticParams() {
  const toc = await getToc();
  const pageParams = [];

  toc.forEach((block) => {
    if (block.type === "toggle" && block.has_children) {
      block.children.map((child) => {
        if (child.type === "link_to_page") {
          // console.log(child);
          pageParams.push({ slug: block.slug, id: child.page_id });
        }
      });
    }
  });

  return pageParams;
  // return [{ slug: "the-framework", id: "1985ae7e-a4ba-8033-9126-c847c294a062" }];
}

export default async function Page({ params }) {
  const pageParams = await params;
  console.log(pageParams);
  const pageContent = await getPageContent(pageParams.id);
  return <PageLayout pageContent={pageContent} />;
}
