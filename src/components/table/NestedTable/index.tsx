import { Text } from '@basiln/design-system';
import { ChevronRight, ChevronDown } from 'lucide-react';

import type { DataRow, Group } from '@/pages/table/types';

import { DataTable } from '../DataTable';
import { nestedTableCss } from './styles';
import type { NestedTableProps } from './types';

export const NestedTable = (props: NestedTableProps) => {
  const { data, selectedColumns, expandedGroups, onToggleGroup } = props;

  const renderNestedGroup = (group: Group, groupIndex: number, parentPath: string = '') => {
    if (!group.isGroup) return null;

    const groupId = `${parentPath}${group.groupValue}`;
    const isExpanded = expandedGroups.has(groupId);
    const hasSubGroups =
      Array.isArray(group.items) &&
      group.items.length > 0 &&
      'isGroup' in group.items[0] &&
      group.items[0]?.isGroup;

    const renderSubGroups = (subGroups: Group[], parentGroupId: string) => {
      const subGroupHasSubGroups = (g: Group) =>
        Array.isArray(g.items) &&
        g.items.length > 0 &&
        'isGroup' in g.items[0] &&
        g.items[0]?.isGroup;

      const isLeafLevel = subGroups.length > 0 && !subGroups.some(subGroupHasSubGroups);

      if (isLeafLevel) {
        const combinedItems = subGroups.flatMap((sg) => (sg.items as DataRow[]) || []);
        return (
          <div css={nestedTableCss.notSubGroupContainer}>
            <div css={nestedTableCss.notSubGroupTableContainer}>
              <DataTable
                selectedColumns={selectedColumns}
                paginatedData={combinedItems}
                sortConfig={{ key: null, direction: 'asc' }}
                onSort={() => {}}
              />
            </div>
          </div>
        );
      }

      return (
        <div>
          {subGroups.map((subGroup, subIndex) =>
            renderNestedGroup(subGroup, subIndex, `${parentGroupId}_`),
          )}
        </div>
      );
    };

    return (
      <div
        key={groupIndex}
        css={{
          marginBottom: '0.5rem',
          ...(group.depth > 0 ? { marginLeft: '1.5rem' } : {}),
        }}
      >
        <div
          css={[nestedTableCss.groupDepthContainer, nestedTableCss.groupDepth[group.depth]]}
          onClick={() => onToggleGroup(groupId)}
        >
          {isExpanded ? (
            <ChevronDown css={nestedTableCss.expandIcon} />
          ) : (
            <ChevronRight css={nestedTableCss.expandIcon} />
          )}

          <div css={nestedTableCss.groupContentContainer}>
            <Text>{group.groupColumn}:</Text>
            <Text>{group.groupValue}</Text>
            <Text css={nestedTableCss.groupDepthText[group.depth]}>
              {hasSubGroups
                ? `${group.items.length}개 그룹`
                : `${group.totalItems || group.items.length}개 항목`}
            </Text>
          </div>
        </div>

        {isExpanded && (
          <div css={[{ marginTop: '7px', marginLeft: group.depth > 0 ? '16px' : '0' }]}>
            {hasSubGroups ? (
              renderSubGroups(group.items as Group[], groupId)
            ) : (
              <div css={nestedTableCss.notSubGroupContainer}>
                <div css={nestedTableCss.notSubGroupTableContainer}>
                  <DataTable
                    selectedColumns={selectedColumns}
                    paginatedData={group.items as DataRow[]}
                    sortConfig={{ key: null, direction: 'asc' }}
                    onSort={() => {}}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div css={nestedTableCss.self}>
      {data.map((group, groupIndex) => renderNestedGroup(group, groupIndex))}
    </div>
  );
};
