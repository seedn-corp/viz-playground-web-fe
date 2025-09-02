import { ChevronDownIcon as DownIcon } from 'lucide-react';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { Flex, useCombinedRefs, useControllableState } from '@basiln/utils';
import { useTheme } from '@emotion/react';
import {
  Root,
  Trigger,
  Icon,
  Content,
  Portal,
  type SelectContentProps,
  type SelectValueProps,
  type SelectItemProps,
  Value,
  Item,
} from '@radix-ui/react-select';

import { SelectProvider, useSelectContext } from './context';
import { selectCss } from './styles';
import type { SelectProps, SelectTriggerProps } from './types';

const SelectImpl = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const {
    children,
    value: valueFromProps,
    defaultValue,
    onValueChange,
    ...restProps
  } = props;

  const [value, setValue] = useControllableState({
    prop: valueFromProps,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });
  const [triggerWidth, setTriggerWidth] = useState<number>();

  return (
    <SelectProvider
      value={value}
      onValueChange={setValue}
      triggerWidth={triggerWidth}
      onTriggerWidthChange={setTriggerWidth}
    >
      <Root value={value} onValueChange={setValue} {...restProps}>
        <div ref={ref} css={{ width: '100%' }}>
          {children}
        </div>
      </Root>
    </SelectProvider>
  );
});

const SelectTrigger = forwardRef<
  HTMLButtonElement,
  SelectTriggerProps & {
    arrowIcon?: React.ReactNode;
    valueRightAddon?:
      | React.ReactNode
      | ((isHover: boolean, value?: string) => React.ReactNode);
  }
>((props, forwardedRef) => {
  const theme = useTheme();
  const { children, leftAddon, arrowIcon, valueRightAddon, ...restProps } =
    props;

  const ref = useRef<HTMLButtonElement>(null);
  const combinedRefs = useCombinedRefs(ref, forwardedRef);

  const { value, onTriggerWidthChange } = useSelectContext('Select.Trigger');

  // NOTE: Trigger의 width에 맞춰 Content의 width를 조정하기 위해 width를 계산
  useEffect(() => {
    if (ref.current) {
      onTriggerWidthChange(ref.current.offsetWidth);
    }
  }, [ref, onTriggerWidthChange]);

  const [isHover, setIsHover] = useState(false);

  return (
    <Trigger
      css={selectCss.trigger}
      ref={combinedRefs}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      {...restProps}
    >
      <Icon asChild>{leftAddon}</Icon>

      <Flex gap={3} justify="start" css={selectCss.value}>
        {children}
        {valueRightAddon && (
          <Icon
            asChild
            css={{ pointerEvents: 'auto' }}
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {typeof valueRightAddon === 'function'
              ? valueRightAddon(isHover, value)
              : isHover && !!value && valueRightAddon}
          </Icon>
        )}
      </Flex>

      {arrowIcon || (
        <Icon asChild>
          <DownIcon color={theme.colors.gray_080} />
        </Icon>
      )}
    </Trigger>
  );
});

const SelectContent = forwardRef<
  HTMLDivElement,
  SelectContentProps & { error?: boolean }
>((props, ref) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, position, error, ...restProps } = props;

  const { triggerWidth } = useSelectContext('Select.Content');

  return (
    <Portal>
      <Content
        ref={ref}
        align="end"
        position="popper"
        sideOffset={4}
        css={[selectCss.content, { width: triggerWidth, margin: 0 }]}
        {...restProps}
      >
        {error ? (
          <Select.Item value="error" disabled>
            오류가 발생했습니다.
          </Select.Item>
        ) : (
          children
        )}
      </Content>
    </Portal>
  );
});

const SelectValue = forwardRef<
  HTMLSpanElement,
  SelectValueProps & { canRemove?: boolean }
>((props, ref) => {
  const { children, ...restProps } = props;
  const { value } = useSelectContext('Select.Value');

  return (
    <Value ref={ref} {...restProps}>
      {children || value}
    </Value>
  );
});

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>((props, ref) => {
  const { children, value, ...restProps } = props;
  const { value: valueFromCtx } = useSelectContext('Select.Item');

  return (
    <Item
      ref={ref}
      value={value}
      data-selected={value === valueFromCtx}
      css={[selectCss.item, props.disabled && selectCss.disabledItem]}
      {...restProps}
    >
      {children}
    </Item>
  );
});

const Select = Object.assign(SelectImpl, {
  Trigger: SelectTrigger,
  Content: SelectContent,
  Value: SelectValue,
  Item: SelectItem,
});

export default Select;
