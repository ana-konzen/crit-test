import { getPageContent, getPageTitle } from "@/notion/notion";

import PageLayout from "@/app/layout/PageLayout";

export default async function Page() {
  const pageContent = await getPageContent("1a15ae7ea4ba804385b8d1048e3bc3d4");
  const pageTitle = await getPageTitle("1a15ae7ea4ba804385b8d1048e3bc3d4");

  return <PageLayout pageContent={pageContent} pageTitle={pageTitle} />;
}
