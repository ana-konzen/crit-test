import { getPageContent } from "@/notion/notion";

import PageLayout from "@/app/layout/PageLayout";

// not sure what to do about this?
export function generateStaticParams() {
  return [{ slug: "the-framework", id: "1985ae7e-a4ba-8033-9126-c847c294a062" }]; // Pre-generates these pages at build time
}

export default async function Page({ params }) {
  const pageParams = await params;
  // console.log("JB Page", pageParams);
  const pageContent = await getPageContent(pageParams.id);
  return <PageLayout pageContent={pageContent} />;
}
