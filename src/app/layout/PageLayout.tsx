import Paragraph from "@/app/layout/components/Paragraph";
import Header from "@/app/layout/components/Header";
import SubHeader from "@/app/layout/components/SubHeader";
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
  heading_1: PageTitle,
  heading_2: Header,
  heading_3: SubHeader,
  table: Table,
  callout: Callout,
  quote: Quote,
};

export default async function PageLayout({ pageContent }: { pageContent: CustomBlock[] }) {
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
          content={blockContent}
          blockChildren={block.children}
        />
      );
    }

    // Return null if no component matches.
    return null;
  };

  return <>{pageContent.map(renderBlock)}</>;
}
