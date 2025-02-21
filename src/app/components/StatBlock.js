import { fetchBlockChildren } from "@/notion/notion";
import { useEffect, useState } from "react";
import classNames from "classnames";

export default function StatBlock({ blockId }) {
  const [block, setBlock] = useState([]);

  useEffect(() => {
    async function fetchBlock() {
      const response = await fetchBlockChildren({ block_id: blockId });
      setBlock(response);
    }
    fetchBlock();
  }, [blockId]);

  return (
    <div className="flex my-4 font-sans flex-row justify-between border-y-2 border-gray py-4">
      {block.map((block, index) => {
        return <StatBlockCol key={index} text={block[block.type].rich_text} />;
      })}
    </div>
  );
}

function StatBlockCol({ text }) {
  return (
    <div className="flex flex-col">
      {text.map((item, index) => {
        const itemClass = classNames({
          "mb-1": item.plain_text !== "| ",
          "font-bold": item.annotations.bold,
          "text-red font-semibold": item.annotations.code,
          "text-transparent border-b border-lightGray mt-[-1.5em] mb-1": item.plain_text === "| ",
          hidden: item.annotations.color === "gray",
        });

        return (
          <span className={itemClass} key={index}>
            {item.plain_text}
          </span>
        );
      })}
    </div>
  );
}
