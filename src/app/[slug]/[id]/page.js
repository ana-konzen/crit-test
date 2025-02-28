import { getPageContent } from "@/notion/notion";

import Paragraph from "@/app/components/Paragraph";
import Header from "@/app/components/Header";
import SubHeader from "@/app/components/SubHeader";
import PageTitle from "@/app/components/PageTitle";
import Callout from "@/app/components/Callout";
import Quote from "@/app/components/Quote";
import Table from "@/app/components/Table";
import StatBlock from "@/app/components/StatBlock";
import CritInfo from "@/app/components/CritInfo";

const componentDict = {
  paragraph: Paragraph,
  heading_1: PageTitle,
  heading_2: Header,
  heading_3: SubHeader,
  table: Table,
  callout: Callout,
  quote: Quote,
};

export function generateStaticParams() {
  return [
    { slug: "the-framework", id: "1985ae7e-a4ba-8033-9126-c847c294a062" },
  ]; // Pre-generates these pages at build time
}

export default async function Page({ params }) {
  const pageParams = await params;
  console.log("JB Page", pageParams);
  const pageContent = await getPageContent(pageParams.id);
  return (
    <div className="flex flex-col mt-4">
      {pageContent.map((block) => {
        if (
          block.type === "callout" &&
          block.callout.rich_text[0].plain_text === "Crit Info"
        ) {
          return <CritInfo key={block.id} blockChildren={block.children} />;
        }
        if (
          block.type === "callout" &&
          block.callout.rich_text[0].plain_text === "Statblock"
        ) {
          return <StatBlock key={block.id} blockChildren={block.children} />;
        }
        const Component = componentDict[block.type];
        if (Component) {
          return (
            <Component
              key={block.id}
              text={block[block.type].rich_text}
              id={block.id}
              content={block[block.type]}
              blockChildren={block.children}
            />
          );
        }
      })}
    </div>
  );
}
