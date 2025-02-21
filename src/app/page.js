"use client";

import { fetchBlockChildren } from "@/notion/notion";
import { useEffect, useState } from "react";
import Paragraph from "@/app/components/Paragraph";
import Header from "@/app/components/Header";
import SubHeader from "@/app/components/SubHeader";
import StatBlock from "@/app/components/StatBlock";
import Schedule from "@/app/components/Schedule";
import CritInfo from "@/app/components/CritInfo";
import PageTitle from "@/app/components/PageTitle";
import Table from "@/app/components/Table";

const componentDict = {
  paragraph: Paragraph,
  heading_1: PageTitle,
  heading_2: Header,
  heading_3: SubHeader,
  table: Table,
};

export default function MainPage() {
  const [page, setPage] = useState([]);
  useEffect(() => {
    async function fetchPage() {
      // const response = await fetchBlockChildren({
      //   block_id: "1985ae7ea4ba807aa462fd25997909d7",
      // });
      const response = await fetchBlockChildren({
        block_id: "1a15ae7ea4ba804385b8d1048e3bc3d4",
      });
      console.log(response);
      setPage(response);
    }
    fetchPage();
  }, []);

  return (
    <>
      <div className="flex flex-col mt-4">
        {page.map((block, index) => {
          if (
            block.type === "callout" &&
            block.callout.rich_text[0].plain_text === "Crit Info"
          ) {
            return <CritInfo key={block.id} blockId={block.id} />;
          }

          if (
            block.type === "callout" &&
            block.callout.rich_text[0].plain_text === "Statblock"
          ) {
            return <StatBlock key={block.id} blockId={block.id} />;
          }

          if (
            block.type === "callout" &&
            block.callout.rich_text[0].plain_text === "Schedule"
          ) {
            return <Schedule key={block.id} blockId={block.id} />;
          }

          const Component = componentDict[block.type];
          if (Component) {
            return (
              <Component
                key={block.id}
                text={block[block.type].rich_text}
                id={block.id}
                data={block[block.type]}
              />
            );
          }
        })}
      </div>
    </>
  );
}
