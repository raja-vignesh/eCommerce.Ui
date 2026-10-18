import type { ReactNode, Key } from "react";

export type TableColumn<T> = {
  header: string;
  render: (item: T) => ReactNode;
};

type TableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  getRowKey: (item: T) => Key;
  emptyMessage?: string;
};

const Table = <T,>({
  data,
  columns,
  getRowKey,
  emptyMessage = "No records found",
}: TableProps<T>) => {
  return (
    <div className="w-full overflow-x-auto rounded-md border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-white">
          <tr className="border-b border-gray-200">
            {columns.map((column) => (
              <th
                key={column.header}
                scope="col"
                className="px-5 py-5 font-semibold text-gray-800"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-5 py-8 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={getRowKey(item)}
                className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
              >
                {columns.map((column) => (
                  <td key={column.header} className="px-5 py-3 text-gray-800">
                    {column.render(item)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
