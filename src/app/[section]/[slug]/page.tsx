import { getPageContent, getToc, getContentParams, getPageTitle } from "@/notion/notion";
import { notFound } from "next/navigation";

import PageLayout from "@/app/layout/PageLayout";

// not sure if this is the best way to do this?

// Pre-generates these pages at build time: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export async function generateStaticParams() {
  const toc = await getToc();
  const pageParams: { section: string; slug: string }[] = [];

  toc.forEach((block) => {
    block.children.map((child) => {
      pageParams.push({ section: block.slug, slug: child.slug });
    });
  });

  return pageParams;
}

export default async function Page({ params }: { params: Promise<{ section: string; slug: string }> }) {
  const pageParams = await params;
  const contentParams = await getContentParams();
  const foundParam = contentParams.find((param) => param.slug === pageParams.slug);
  if (!foundParam) {
    notFound();
  }
  const pageId = foundParam.page_id;

  const pageContent = await getPageContent(pageId);
  const pageTitle = await getPageTitle(pageId);

  return <PageLayout pageContent={pageContent} pageTitle={pageTitle} />;
}
