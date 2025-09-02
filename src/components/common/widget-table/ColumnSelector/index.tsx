import { columnSelectorCss } from './style';
import type { ColumnSelectorProps } from './types';

export const ColumnSelector = (props: ColumnSelectorProps) => {
  const { headers, selectedColumns, onToggleColumn, onSelectAll, onClearAll } =
    props;

  return (
    <div css={columnSelectorCss.container}>
      <h4 css={columnSelectorCss.title}>표시할 컬럼 선택:</h4>

      <div css={columnSelectorCss.checkboxContainer}>
        {headers.map((header, index) => (
          <label key={index} css={columnSelectorCss.label}>
            <input
              type="checkbox"
              css={columnSelectorCss.checkbox}
              checked={selectedColumns.includes(header)}
              onChange={() => onToggleColumn(header)}
            />
            <span css={columnSelectorCss.checkboxText}>{header}</span>
          </label>
        ))}
      </div>

      <div css={columnSelectorCss.buttonContainer}>
        <button onClick={onSelectAll} css={columnSelectorCss.button}>
          모두 선택
        </button>
        <button onClick={onClearAll} css={columnSelectorCss.button}>
          모두 해제
        </button>
      </div>
    </div>
  );
};
