import React from "react";

const Table = ({
  columns,
  data,
  emptyMessage = "No data available.",
  onRowClick,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-fixed bg-white rounded-lg shadow">
        <thead className="bg-primary text-white">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="py-2 px-4 text-left font-medium"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-6 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={row._id || rowIndex}
                onClick={() => onRowClick?.(row)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="py-3 px-4 truncate"
                  >
                    {col.render
                      ? col.render(row, rowIndex)
                      : row[col.key]}
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
