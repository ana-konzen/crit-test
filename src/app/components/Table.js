import { useEffect, useState } from "react";
import { fetchBlockChildren } from "@/notion/notion";
import Paragraph from "@/app/components/Paragraph";

export default function Table({ data, id }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function fetchTable() {
      const fetchedRows = await fetchBlockChildren({ block_id: id });
      console.log("fetchedRows", fetchedRows);
      setRows(fetchedRows);
    }
    fetchTable();
  }, [id]);

  let headerRow;
  let bodyRows = rows;
  if (data.has_column_header) {
    headerRow = rows[0];
    bodyRows = rows.slice(1);
  }

  return (
    <div className="border-2 border-gray px-2 py-1">
      <table className="table-auto w-full">
        {headerRow && (
          <thead className="border-b-2 border-gray">
            <Row row={headerRow} />
          </thead>
        )}
        <tbody>
          {bodyRows.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Row({ row }) {
  return (
    <tr>
      {row.table_row.cells.map((cell, index) => (
        <Cell key={index} cell={cell} />
      ))}
    </tr>
  );
}

function Cell({ cell }) {
  //   return <td>{cell[0]?.text.content}</td>;

  return (
    <td>
      <Paragraph text={cell} />
    </td>
  );
}
