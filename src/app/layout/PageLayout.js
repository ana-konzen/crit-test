import Paragraph from "@/app/layout/components/Paragraph";
import Header from "@/app/layout/components/Header";
import SubHeader from "@/app/layout/components/SubHeader";
import PageTitle from "@/app/layout/components/PageTitle";
import Callout from "@/app/layout/components/Callout";
import Quote from "@/app/layout/components/Quote";
import Table from "@/app/layout/components/Table";
import StatBlock from "@/app/layout/components/StatBlock";
import CritInfo from "@/app/layout/components/CritInfo";

const componentDict = {
  paragraph: Paragraph,
  heading_1: PageTitle,
  heading_2: Header,
  heading_3: SubHeader,
  table: Table,
  callout: Callout,
  quote: Quote,
};

export default async function PageLayout({ pageContent }) {
  return (
    <div className="flex relative lg:w-[var(--block-width)] w-[75%] flex-col max-w-[var(--max-block-width)] mt-4">
      {pageContent.map((block) => {
        if (block.type === "callout" && block.callout.rich_text[0].plain_text === "Crit Info") {
          return <CritInfo key={block.id} blockChildren={block.children} />;
        }
        if (block.type === "callout" && block.callout.rich_text[0].plain_text === "Statblock") {
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
