import { dataTableCss } from './styles';
import type { DataTableProps } from './types';

export const DataTable = (props: DataTableProps) => {
  const { selectedColumns, paginatedData, sortConfig, onSort } = props;

  return (
    <table css={dataTableCss.container}>
      <thead css={dataTableCss.thead}>
        <tr>
          {selectedColumns.map((header, index) => (
            <th
              key={index}
              css={dataTableCss.th}
              onClick={() => onSort(header)}
            >
              {header}
              {sortConfig.key === header && (
                <span css={dataTableCss.sortIcon}>
                  {sortConfig.direction === 'asc' ? '▲' : '▼'}
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>

      <tbody css={dataTableCss.tbody}>
        {paginatedData.map((row, rowIndex) => (
          <tr key={rowIndex} css={dataTableCss.tr}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} css={dataTableCss.td}>
                {cell !== null && cell !== undefined ? String(cell) : ''}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
