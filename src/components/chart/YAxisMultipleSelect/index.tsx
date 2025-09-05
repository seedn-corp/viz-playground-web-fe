import { Text } from '@basiln/design-system';
import { ellipsis, Spacing } from '@basiln/utils';
import { useTheme } from '@emotion/react';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

import Popover from '@/components/chart/Popover';
import { selectCss } from '@/components/chart/Select/styles';

import type { YAxisMultipleSelectProps } from './types';

const YAxisMultipleSelect = ({
  name,
  onChange,
  items,
  disabledItem,
  placeholder,
}: YAxisMultipleSelectProps) => {
  const theme = useTheme();

  const onToggleItem = (item: string) => {
    if (name.includes(item)) {
      onChange(name.filter((selectedItem) => selectedItem !== item));
    } else {
      onChange([...name, item]);
    }
  };

  return (
    <Popover>
      <Popover.Trigger asChild={false} css={[selectCss.trigger, { width: '100%' }]}>
        <Text color={name.length ? 'black' : 'gray_060'} css={ellipsis}>
          {name.length ? name.join(', ') : placeholder || 'Y축 항목을 선택하세요.'}
        </Text>
        <Spacing size="auto" css={{ flex: 1 }} />
        <ChevronDownIcon width={18} />
      </Popover.Trigger>
      <Popover.Content sideOffset={4} css={[selectCss.content, { width: 240 - 32 }]}>
        {items.map((item) => {
          const isChecked = name.includes(item);
          return (
            <Popover.Item
              key={item}
              value={item}
              autoClose={false}
              onClick={() => onToggleItem(item)}
              disabled={item === disabledItem}
              css={{
                justifyContent: 'space-between',
                color: isChecked ? theme.colors.seedn_key : theme.colors.black,
              }}
            >
              {item}
              <CheckIcon
                color={isChecked ? theme.colors.seedn_key : theme.colors.gray_060}
                width={16}
                css={{ minWidth: 16 }}
              />
            </Popover.Item>
          );
        })}
      </Popover.Content>
    </Popover>
  );
};

export default YAxisMultipleSelect;
