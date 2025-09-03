import { Button } from '@basiln/design-system';
import { useTheme } from '@emotion/react';
import { Plus, Minus } from 'lucide-react';

import { viewModeSelectorCss } from './styles';
import type { ViewModeSelectorProps } from './types';

export const ViewModeSelector = (props: ViewModeSelectorProps) => {
  const theme = useTheme();

  const {
    type,
    onTypeChange,
    itemsPerPage,
    onItemsPerPageChange,
    groupingColumns,
    onCurrentPageChange,
    onExpandAllGroups,
    onCollapseAllGroups,
  } = props;

  return (
    <div css={viewModeSelectorCss.container}>
      <div>
        <select
          value={type}
          onChange={(e) => onTypeChange(e.target.value as 'group' | 'table')}
        >
          <option value={'table'}>테이블 형식으로 보기</option>
          {groupingColumns.length > 0 && (
            <option value={'group'}>그룹화 형식으로 보기</option>
          )}
        </select>
      </div>

      {type === 'table' && (
        <select
          value={itemsPerPage}
          onChange={(e) => {
            onItemsPerPageChange(Number(e.target.value));
            onCurrentPageChange(1);
          }}
        >
          <option value={10}>10개씩</option>
          <option value={25}>25개씩</option>
          <option value={50}>50개씩</option>
          <option value={100}>100개씩</option>
        </select>
      )}

      {type === 'group' && (
        <div css={viewModeSelectorCss.groupTypeButtonContainer}>
          <Button
            display="inline"
            size="regular-1"
            radius="small"
            variant="stroke"
            leftAddon={<Plus size={16} color={theme.colors.seedn_key} />}
            gutter="10px"
            onClick={onExpandAllGroups}
          >
            모두 펼치기
          </Button>
          <Button
            display="inline"
            size="regular-1"
            radius="small"
            variant="stroke"
            leftAddon={<Minus size={16} color={theme.colors.seedn_key} />}
            gutter="10px"
            onClick={onCollapseAllGroups}
          >
            모두 접기
          </Button>
        </div>
      )}
    </div>
  );
};
