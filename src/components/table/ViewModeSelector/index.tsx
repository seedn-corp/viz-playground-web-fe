import { Button } from '@basiln/design-system';
import { useTheme } from '@emotion/react';
import { Plus, Minus } from 'lucide-react';

import Select from '@/components/chart/Select';

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
    ...restProps
  } = props;

  return (
    <div css={viewModeSelectorCss.container} {...restProps}>
      <div css={viewModeSelectorCss.selectContainer}>
        <Select value={type} onValueChange={(value) => onTypeChange(value as 'group' | 'table')}>
          <Select.Trigger css={{ width: '150px' }}>
            {type === 'table' ? '테이블 형식으로 보기' : '그룹화 형식으로 보기'}
          </Select.Trigger>
          <Select.Content css={{ width: '150px' }}>
            <Select.Item value={'table'}>테이블 형식으로 보기</Select.Item>
            {groupingColumns.length > 0 && (
              <Select.Item value={'group'}>그룹화 형식으로 보기</Select.Item>
            )}
          </Select.Content>
        </Select>

        {type === 'table' && (
          <Select
            value={String(itemsPerPage)}
            onValueChange={(value) => {
              onItemsPerPageChange(Number(value));
              onCurrentPageChange(1);
            }}
          >
            <Select.Trigger css={{ width: '85px' }}>{itemsPerPage}개씩</Select.Trigger>
            <Select.Content css={{ width: '85px' }}>
              <Select.Item value={'10'}>10개씩</Select.Item>
              <Select.Item value={'25'}>25개씩</Select.Item>
              <Select.Item value={'50'}>50개씩</Select.Item>
              <Select.Item value={'100'}>100개씩</Select.Item>
            </Select.Content>
          </Select>
        )}
      </div>

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
