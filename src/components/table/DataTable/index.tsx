import { ChevronUp, ChevronDown } from 'lucide-react';

import { dataTableCss } from './styles';
import type { DataTableProps } from './types';

export const DataTable = (props: DataTableProps) => {
  const { selectedColumns, paginatedData, sortConfig, onSort } = props;

  return (
    <table css={dataTableCss.container}>
      <thead css={dataTableCss.thead}>
        <tr>
          {selectedColumns.map((header, index) => (
            <th key={index} css={dataTableCss.th} onClick={() => onSort(header)}>
              {header}
              <span css={dataTableCss.sortIcon} aria-hidden>
                <ChevronUp
                  size={12}
                  css={[
                    dataTableCss.sortArrow,
                    sortConfig.key === header &&
                      sortConfig.direction === 'asc' &&
                      dataTableCss.sortActive,
                  ]}
                />
                <ChevronDown
                  size={12}
                  css={[
                    dataTableCss.sortArrow,
                    sortConfig.key === header &&
                      sortConfig.direction === 'desc' &&
                      dataTableCss.sortActive,
                  ]}
                />
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody css={dataTableCss.tbody}>
        {paginatedData.map((row, rowIndex) => {
          return (
            <tr key={rowIndex} css={dataTableCss.tr}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} css={dataTableCss.td}>
                  {cell !== null && cell !== undefined ? String(cell) : ''}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
