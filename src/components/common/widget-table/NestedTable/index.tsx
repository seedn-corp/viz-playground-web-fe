import { Text } from '@basiln/design-system';
import { ChevronRight, ChevronDown } from 'lucide-react';

import type { DataRow, Group } from '@/pages/widget-table/types';

import { DataTable } from '../DataTable';
import { nestedTableCss } from './styles';
import type { NestedTableProps } from './types';

export const NestedTable = (props: NestedTableProps) => {
  const { data, selectedColumns, expandedGroups, onToggleGroup } = props;

  const renderNestedGroup = (
    group: Group,
    groupIndex: number,
    parentPath: string = ''
  ) => {
    if (!group.isGroup) {
      return null;
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
          <div
            css={[
              { marginTop: '7px', marginLeft: group.depth > 0 ? '16px' : '0' },
            ]}
          >
            {hasSubGroups ? (
              <div className="space-y-2">
                {(group.items as Group[]).map((subGroup, subIndex) =>
                  renderNestedGroup(subGroup, subIndex, `${groupId}_`)
                )}
              </div>
            ) : (
              <div css={nestedTableCss.notSubGroupContainer}>
                <DataTable
                  selectedColumns={selectedColumns}
                  paginatedData={group.items as DataRow[]}
                  sortConfig={{ key: null, direction: 'asc' }}
                  onSort={() => {}}
                />
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
