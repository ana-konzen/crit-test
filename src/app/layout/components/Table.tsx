import RichText from "@/app/layout/components/RichText";
import {
  RichTextItemResponse,
  BlockObjectResponse,
  TableRowBlockObjectResponse,
  TableBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

// Type guard to check if block is a TableBlockObjectResponse
function isTableBlock(block: BlockObjectResponse): block is TableBlockObjectResponse {
  return block.type === "table";
}

// Type guard to check if blocks are TableRowBlockObjectResponse[]
function areTableRowBlocks(blocks: BlockObjectResponse[]): blocks is TableRowBlockObjectResponse[] {
  return blocks.every((block) => block.type === "table_row");
}

export default function Table({
  block,
  blockChildren,
}: {
  block: BlockObjectResponse;
  blockChildren?: BlockObjectResponse[];
}) {
  if (!isTableBlock(block)) return null;
  if (!blockChildren || !areTableRowBlocks(blockChildren)) return null;

  const table = block.table;
  const rows = blockChildren;

  const headerRow = table.has_column_header ? rows[0] : null;
  const bodyRows = table.has_column_header ? rows.slice(1) : rows;

  return (
    <div className="font-sans text-sm">
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

function Row({ row }: { row: TableRowBlockObjectResponse }) {
  return (
    <tr className="border-x-2 border-background">
      {row.table_row.cells.map((cell, index) => (
        <Cell key={index} cell={cell} />
      ))}
    </tr>
  );
}

function Cell({ cell }: { cell: RichTextItemResponse[] }) {
  return (
    <td className="border-x align-top border-gray py-2 px-4">
      <RichText richText={cell} />
    </td>
  );
}
