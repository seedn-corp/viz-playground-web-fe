import type { GroupingSelectorProps } from './types';
import { groupingSelectorCss } from './styles';

export const GroupingSelector = (props: GroupingSelectorProps) => {
  const {
    selectedColumns,
    groupingColumns,
    onUpdateGrouping,
    onClearGrouping,
  } = props;

  console.log({ selectedColumns, groupingColumns });

  return (
    <div css={groupingSelectorCss.container}>
      <h4 css={groupingSelectorCss.title}>계층별 그룹핑 설정:</h4>

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
                    groupingColumns[level - 1] ? borderColor : '#e5e7eb'
                  }`,
                  background: groupingColumns[level - 1] ? bgColor : '#f3f4f6',
                  opacity: groupingColumns[level - 1] ? 1 : 0.5,
                },
              ]}
            >
              <div css={groupingSelectorCss.levelSelectContainer}>
                <span css={[groupingSelectorCss.label, { color }]}>
                  {level + 1}단계{level === 0 ? ' (최상위)' : ''}:
                </span>

                <select
                  value={groupingColumns[level] || ''}
                  onChange={(e) => onUpdateGrouping(level, e.target.value)}
                  disabled={disabled}
                  css={[
                    groupingSelectorCss.select,
                    {
                      border: `1px solid ${borderColor}`,
                      background: disabled ? '#f3f4f6' : '#fff',
                      color: disabled ? '#9ca3af' : '#374151',
                    },
                  ]}
                >
                  <option value="">선택 안함</option>

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
                <button
                  onClick={() => onUpdateGrouping(level, '')}
                  css={[
                    groupingSelectorCss.removeBtn,
                    {
                      color,
                      background: bgColor,
                      ':hover': {
                        color: '#1e293b',
                        background: borderColor,
                      },
                    },
                  ]}
                >
                  제거
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div css={groupingSelectorCss.bottom}>
        <button onClick={onClearGrouping} css={groupingSelectorCss.clearBtn}>
          모든 그룹핑 제거
        </button>
      </div>
    </div>
  );
};
