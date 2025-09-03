import { Button, Text } from '@basiln/design-system';
import { X } from 'lucide-react';

import { groupingSelectorCss } from './styles';
import type { GroupingSelectorProps } from './types';

export const GroupingSelector = (props: GroupingSelectorProps) => {
  const {
    selectedColumns,
    groupingColumns,
    onUpdateGrouping,
    onClearGrouping,
  } = props;

  return (
    <div css={groupingSelectorCss.container}>
      <Text as="p" css={{ marginBottom: '6px' }}>
        계층별 그룹핑 설정
      </Text>

      <div css={groupingSelectorCss.levelContainer}>
        {[0, 1, 2, 3].map((level) => {
          const { color, bgColor, borderColor } =
            groupingSelectorCss.levels[level];

          const disabled = level > 0 && !groupingColumns[level - 1];

          return (
            <div
              key={level}
              css={[
                groupingSelectorCss.levelBox,
                {
                  border: `1px solid ${
                    groupingColumns[level] ? borderColor : '#e5e7eb'
                  }`,
                  background: groupingColumns[level] ? bgColor : '#f3f4f6',
                  opacity: groupingColumns[level] ? 1 : 0.5,
                },
              ]}
            >
              <div css={groupingSelectorCss.levelSelectContainer}>
                <Text css={[groupingSelectorCss.label, { color }]}>
                  {level + 1}단계
                </Text>

                <select
                  value={groupingColumns[level] || ''}
                  onChange={(e) => onUpdateGrouping(level, e.target.value)}
                  disabled={disabled}
                  css={[
                    groupingSelectorCss.select,
                    { color: disabled ? '#9ca3af' : '#374151' },
                  ]}
                >
                  <option value="">선택 안 함</option>

                  {selectedColumns
                    .filter(
                      (col) =>
                        !groupingColumns.includes(col) ||
                        col === groupingColumns[level]
                    )
                    .map((col, index) => (
                      <option key={`${col}-${index}-${level}`} value={col}>
                        {col}
                      </option>
                    ))}
                </select>
              </div>

              {groupingColumns[level] && (
                <Button
                  display="inline"
                  variant="ghost"
                  size="tiny"
                  radius="full"
                  onClick={() => onUpdateGrouping(level, '')}
                  css={[
                    {
                      color,
                      background: bgColor,
                      ':hover': {
                        color: '#313132',
                        background: borderColor,
                      },
                    },
                  ]}
                >
                  <X size="14px" />
                </Button>
              )}
            </div>
          );
        })}
      </div>

      <div css={groupingSelectorCss.bottom}>
        <Button
          size="regular-1"
          display="inline"
          radius="small"
          variant="stroke"
          onClick={onClearGrouping}
          gutter="10px"
        >
          전체 해제
        </Button>
      </div>
    </div>
  );
};
