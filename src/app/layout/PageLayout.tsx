import Paragraph from "@/app/layout/components/Paragraph";
import Header1 from "@/app/layout/components/Header1";
import Header2 from "@/app/layout/components/Header2";
import Header3 from "@/app/layout/components/Header3";
import PageTitle from "@/app/layout/components/PageTitle";
import Callout from "@/app/layout/components/Callout";
import Quote from "@/app/layout/components/Quote";
import Table from "@/app/layout/components/Table";
import StatBlock from "@/app/layout/components/StatBlock";
import CritInfo from "@/app/layout/components/CritInfo";
import { CustomBlock } from "@/notion/notion";
import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

const componentDict = {
  paragraph: Paragraph,
  heading_1: Header1,
  heading_2: Header2,
  heading_3: Header3,
  table: Table,
  callout: Callout,
  quote: Quote,
};

export default async function PageLayout({
  pageContent,
  pageTitle,
}: {
  pageContent: CustomBlock[];
  pageTitle: string;
}) {
  // Function to render each block based on its type.
  const renderBlock = (block: CustomBlock) => {
    // Handle special "callout" blocks based on their first rich text content.

    if (block.type === "callout") {
      const calloutText = block.callout.rich_text[0]?.plain_text;
      if (calloutText === "Crit Info") {
        return <CritInfo key={block.id} blockChildren={block.children} />;
      }
      if (calloutText === "Statblock") {
        return <StatBlock key={block.id} blockChildren={block.children} />;
      }
    }

    // For other block types, check the component dictionary.
    const Component = componentDict[block.type as keyof typeof componentDict];
    if (Component) {
      const blockContent = block[block.type as keyof CustomBlock];
      if (!blockContent) return null;
      return (
        <Component
          key={block.id}
          text={
            blockContent && typeof blockContent === "object" && "rich_text" in blockContent
              ? (blockContent.rich_text as RichTextItemResponse[])
              : []
          }
          block={block}
          blockChildren={block.children}
        />
      );
    }

    // Return null if no component matches.
    return null;
  };

  return (
    <>
      <PageTitle title={pageTitle} />
      {pageContent.map(renderBlock)}
    </>
  );
}
