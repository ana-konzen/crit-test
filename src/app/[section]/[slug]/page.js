import { getPageContent, getToc, getContentParams } from "@/notion/notion";

import PageLayout from "@/app/layout/PageLayout";

// not sure if this is the best way to do this?

// Pre-generates these pages at build time: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export async function generateStaticParams() {
  const toc = await getToc();
  const pageParams = [];

  toc.forEach((block) => {
    block.children.map((child) => {
      pageParams.push({ section: block.slug, slug: child.slug });
    });
  });

  return pageParams;
}

export default async function Page({ params }) {
  const pageParams = await params;
  const contentParams = await getContentParams();
  const pageId = contentParams.find((param) => param.slug === pageParams.slug).page_id;

  const pageContent = await getPageContent(pageId);

  return <PageLayout pageContent={pageContent} />;
}
