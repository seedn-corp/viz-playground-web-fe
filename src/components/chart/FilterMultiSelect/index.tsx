import { Text } from '@basiln/design-system';
import { ellipsis, Spacing } from '@basiln/utils';
import { useTheme } from '@emotion/react';
import { CheckIcon, ChevronDownIcon, Search, X } from 'lucide-react';
import { useState, useMemo } from 'react';

import Popover from '@/components/chart/Popover';
import { selectCss } from '@/components/chart/Select/styles';

import type { FilterMultiSelectProps } from './types';
import { filterMultiSelectCss } from './styles';

const FilterMultiSelect = ({ name, onChange, items, placeholder }: FilterMultiSelectProps) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    return items.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [items, searchTerm]);

  const onToggleItem = (item: string) => {
    if (name.includes(item)) {
      onChange(name.filter((selectedItem) => selectedItem !== item));
    } else {
      onChange([...name, item]);
    }
  };

  const onSelectAll = () => {
    onChange(filteredItems);
  };

  const onClearAll = () => {
    onChange([]);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSearchTerm('');
    }
  };

  return (
    <Popover onOpenChange={handleOpenChange}>
      <Popover.Trigger asChild={false} css={[selectCss.trigger, { width: '100%' }]}>
        <Text color={name.length ? 'black' : 'gray_060'} css={ellipsis}>
          {name.length > 0
            ? `${name.length}개 선택됨${
                name.length <= 3
                  ? `: ${name.slice(0, 3).join(', ')}${name.length > 3 ? '...' : ''}`
                  : ''
              }`
            : placeholder || '항목을 선택하세요.'}
        </Text>
        <Spacing size="auto" css={{ flex: 1 }} />
        <ChevronDownIcon width={18} />
      </Popover.Trigger>
      <Popover.Content
        sideOffset={4}
        align="start"
        avoidCollisions={false}
        css={[selectCss.content, filterMultiSelectCss.content]}
      >
        {/* 검색 입력 */}
        <div css={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
          <div css={filterMultiSelectCss.searchContainer}>
            <div css={filterMultiSelectCss.searchInputWrapper}>
              <Search width={14} color={theme.colors.gray_060} />
              <input
                type="text"
                placeholder="필터 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                css={filterMultiSelectCss.searchInput}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} css={filterMultiSelectCss.clearButton}>
                  <X width={14} color={theme.colors.gray_060} />
                </button>
              )}
            </div>
          </div>

          {/* 전체 선택/해제 버튼 */}
          <div css={filterMultiSelectCss.actionsContainer}>
            <button
              onClick={onSelectAll}
              disabled={filteredItems.length === 0}
              css={filterMultiSelectCss.selectAllButton({
                theme,
                disabled: filteredItems.length === 0,
              })}
            >
              전체 선택
            </button>
            <button
              onClick={onClearAll}
              disabled={name.length === 0}
              css={filterMultiSelectCss.clearAllButton({ theme, disabled: name.length === 0 })}
            >
              전체 해제
            </button>
          </div>
        </div>

        {/* 아이템 리스트 */}
        <div css={filterMultiSelectCss.itemsContainer}>
          {filteredItems.length === 0 ? (
            <div css={filterMultiSelectCss.emptyState}>
              {searchTerm ? '검색 결과가 없습니다.' : '선택 가능한 항목이 없습니다.'}
            </div>
          ) : (
            filteredItems.map((item) => {
              const isChecked = name.includes(item);
              return (
                <Popover.Item
                  key={item}
                  value={item}
                  autoClose={false}
                  onClick={() => onToggleItem(item)}
                  css={filterMultiSelectCss.item({ theme, isChecked })}
                >
                  <span css={filterMultiSelectCss.itemText}>{item}</span>
                  <CheckIcon
                    color={isChecked ? theme.colors.seedn_key : theme.colors.gray_060}
                    width={14}
                    css={filterMultiSelectCss.itemIcon}
                  />
                </Popover.Item>
              );
            })
          )}
        </div>

        {/* 선택된 아이템 개수 표시 */}
        {name.length > 0 && (
          <div css={filterMultiSelectCss.counter}>
            총 {items.length}개 중 {name.length}개 선택됨
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
};

export default FilterMultiSelect;
