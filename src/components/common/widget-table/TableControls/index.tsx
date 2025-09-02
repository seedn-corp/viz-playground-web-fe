import type { TableControlsProps } from './types';
import { tableControlsCss } from './styles';

export const TableControls = (props: TableControlsProps) => {
  const {
    fileName,
    rowCount,
    colCount,
    searchTerm,
    onSearch,
    onReset,
    groupingColumns,
  } = props;

  return (
    <div css={tableControlsCss.container}>
      <span>{fileName}</span>
      <span>
        ({rowCount}개 행, {colCount}개 컬럼)
      </span>

      {groupingColumns.length > 0 && (
        <span>그룹핑: {groupingColumns.join(' → ')}</span>
      )}

      <div>
        <div>
          <input
            type="text"
            placeholder="데이터 검색..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <button onClick={onReset} css={tableControlsCss.resetButton}>
          초기화
        </button>
      </div>
    </div>
  );
};
