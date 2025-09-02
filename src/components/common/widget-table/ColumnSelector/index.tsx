import { Button, Text } from '@basiln/design-system';
import { columnSelectorCss } from './style';
import type { ColumnSelectorProps } from './types';

export const ColumnSelector = (props: ColumnSelectorProps) => {
  const { headers, selectedColumns, onToggleColumn, onSelectAll, onClearAll } =
    props;

  return (
    <div>
      <Text as="p" color="gray_080">
        컬럼:
      </Text>

      <div css={columnSelectorCss.checkboxContainer}>
        {headers.map((header, index) => (
          <label key={index} css={columnSelectorCss.label}>
            <input
              type="checkbox"
              css={columnSelectorCss.checkbox}
              checked={selectedColumns.includes(header)}
              onChange={() => onToggleColumn(header)}
            />
            <Text color="gray_080">{header}</Text>
          </label>
        ))}
      </div>

      {headers.length > 0 && (
        <div css={columnSelectorCss.buttonContainer}>
          <Button
            display="inline"
            size="regular-1"
            radius="small"
            onClick={onSelectAll}
            gutter="10px"
            css={columnSelectorCss.button}
          >
            전체 선택
          </Button>
          <Button
            display="inline"
            size="regular-1"
            radius="small"
            variant="stroke"
            onClick={onClearAll}
            gutter="10px"
            css={columnSelectorCss.button}
          >
            전체 해제
          </Button>
        </div>
      )}
    </div>
  );
};
