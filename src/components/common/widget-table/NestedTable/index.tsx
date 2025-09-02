import type { Group, DataRow } from '../../../../pages/widget-table/types';
import type { NestedTableProps } from './types';
import { nestedTableCss } from './styles';

export const NestedTable = (props: NestedTableProps) => {
  const { sortedData, selectedColumns, expandedGroups, onToggleGroup } = props;

  const renderNestedGroup = (
    group: Group,
    groupIndex: number,
    parentPath = ''
  ) => {
    if (
      Array.isArray(group.items) &&
      group.items.length === 1 &&
      typeof group.items[0] !== 'undefined' &&
      !(group.items[0] as Group).groupKey
    ) {
      const row = group.items[0] as DataRow;

      return (
        <div key={groupIndex} css={nestedTableCss.groupRowContainer}>
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} css={nestedTableCss.groupRow}>
              {cell !== null && cell !== undefined ? String(cell) : ''}
            </div>
          ))}
        </div>
      );
    }

    const groupId = `${parentPath}${group.groupValue}`;
    const isExpanded = expandedGroups.has(groupId);
    const hasSubGroups =
      Array.isArray(group.items) &&
      'isGroup' in group.items[0] &&
      group.items.length > 0 &&
      group.items[0]?.isGroup;

    return (
      <div
        key={groupIndex}
        css={{
          marginBottom: '0.5rem',
          ...(group.depth > 0 ? { marginLeft: '1.5rem' } : {}),
        }}
      >
        <div
          css={[
            nestedTableCss.groupDepthContainer,
            nestedTableCss.groupDepth[group.depth],
          ]}
          onClick={() => onToggleGroup(groupId)}
        >
          <span css={nestedTableCss.expandIcon}>{isExpanded ? '▼' : '▶'}</span>

          <div css={nestedTableCss.groupContentContainer}>
            <span>
              <span>{group.groupColumn}:</span> <span>{group.groupValue}</span>
            </span>
            <span
              css={[
                nestedTableCss.groupText,
                nestedTableCss.groupDepthText[group.depth],
              ]}
            >
              {hasSubGroups
                ? `${group.items.length}개 그룹`
                : `${group.totalItems || group.items.length}개 항목`}
            </span>
          </div>
        </div>

        {isExpanded && (
          <div
            css={{
              marginTop: '0.5rem',
              ...(group.depth > 0 ? { marginLeft: '1rem' } : {}),
            }}
          >
            {hasSubGroups ? (
              <div css={nestedTableCss.subGroupContainer}>
                {(group.items as Group[]).map((subGroup, subIndex) =>
                  renderNestedGroup(subGroup, subIndex, `${groupId}_`)
                )}
              </div>
            ) : (
              <div css={nestedTableCss.notSubGroupContainer}>
                <table css={nestedTableCss.notSubGroupTable}>
                  <thead css={nestedTableCss.notSubGroupTableHeader}>
                    <tr>
                      {selectedColumns.map((header, index) => (
                        <th key={index} css={nestedTableCss.notSubGroupTh}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody css={nestedTableCss.notSubGroupTbody}>
                    {(group.items as DataRow[]).map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>
                            {cell !== null && cell !== undefined
                              ? String(cell)
                              : ''}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div css={nestedTableCss.self}>
      {sortedData.map((group, groupIndex) =>
        renderNestedGroup(group, groupIndex)
      )}
    </div>
  );
};
