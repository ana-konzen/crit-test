import RichText from "@/app/components/RichText";

export default function Table({ content: table, blockChildren }) {
  console.log(blockChildren);
  const rows = blockChildren;

  let headerRow;
  let bodyRows = rows;
  if (table.has_column_header) {
    headerRow = rows[0];
    bodyRows = rows.slice(1);
  }

  return (
    <div className="font-sans">
      <table className="table-auto w-full">
        {headerRow && (
          <thead className="border-b font-bold border-gray">
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
    <tr className="border-x-2 border-background">
      {row.table_row.cells.map((cell, index) => (
        <Cell key={index} cell={cell} />
      ))}
    </tr>
  );
}

function Cell({ cell }) {
  return (
    <td className="border-x  border-gray py-2 px-4">
      <RichText richText={cell} />
    </td>
  );
}
