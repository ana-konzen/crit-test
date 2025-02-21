import { fetchBlockChildren } from "@/notion/notion";
import { useEffect, useState } from "react";
import classNames from "classnames";

export default function CritInfo({ blockId }) {
  const [block, setBlock] = useState([]);

  useEffect(() => {
    async function fetchBlock() {
      const response = await fetchBlockChildren({ block_id: blockId });
      setBlock(response);
    }
    fetchBlock();
  }, [blockId]);

  return (
    <div className="border-l-2 border-gray py-1 px-4 mt-4">
      {block.map((item, index) => {
        return <InfoLine key={index} text={item.paragraph.rich_text} />;
      })}
    </div>
  );
}

function InfoLine({ text }) {
  return (
    <div className="font-sans mb-1 text-sm">
      {text.map((item, index) => {
        const itemClass = classNames({
          "mr-0": true,
          "font-bold": item.annotations.bold,
          "font-semibold": item.annotations.code,
          hidden: item.annotations.color === "gray",
        });

        return (
          <span key={index} className={itemClass}>
            {item.plain_text}
          </span>
        );
      })}
    </div>
  );
}
