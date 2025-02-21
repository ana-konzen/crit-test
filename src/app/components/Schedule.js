import { fetchBlockChildren } from "@/notion/notion";
import { useEffect, useState } from "react";
import classNames from "classnames";

export default function Schedule({ blockId }) {
  const [block, setBlock] = useState([]);

  useEffect(() => {
    async function fetchTable() {
      const table = await fetchBlockChildren({ block_id: blockId });
      console.log(table);
      const response = await fetchBlockChildren({ block_id: table[0].id });
      console.log(response);

      setBlock(response);
    }
    fetchTable();
  }, [blockId]);

  return (
    <div className="my-4 grid grid-cols-3 gap-x-2 gap-y-0 font-sans">
      {block.map((row, rowIndex) => {
        return (
          <>
            {/* <div key={rowIndex} className="flex justify-between flex-row"> */}
            {row.table_row.cells.map((cell, cellIndex) => {
              return <ScheduleRow key={cellIndex} text={cell} />;
            })}
            {/* </div> */}
          </>
        );
      })}
    </div>
  );
}

function ScheduleRow({ text }) {
  console.log(text);

  return (
    <div className="border-l-2 px-2 py-1">
      {text.map((item, index) => {
        const itemClass = classNames({
          "font-bold": item.annotations.bold,
          "font-semibold text-red mr-2": item.annotations.code,
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
