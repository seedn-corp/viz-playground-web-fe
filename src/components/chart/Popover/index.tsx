import * as Primitive from '@radix-ui/react-popover';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

import { selectCss } from '@/components/chart/Select/styles';

const Popover = ({ children, ...restProps }: Primitive.PopoverProps) => {
  return <Primitive.Root {...restProps}>{children}</Primitive.Root>;
};

const PopoverTrigger = ({ children, ...restProps }: Primitive.PopoverTriggerProps) => {
  return (
    <Primitive.Trigger asChild {...restProps}>
      {children}
    </Primitive.Trigger>
  );
};

const PopoverContent = forwardRef<HTMLDivElement, Primitive.PopoverContentProps>(
  ({ children, ...restProps }, ref) => {
    return (
      <Primitive.Portal>
        <Primitive.Content
          ref={ref}
          css={selectCss.content}
          onWheel={(e) => e.stopPropagation()}
          {...restProps}
        >
          {children}
        </Primitive.Content>
      </Primitive.Portal>
    );
  },
);
PopoverContent.displayName = 'PopoverContent';

const PopoverItem = forwardRef<
  HTMLButtonElement,
  { autoClose?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>
>(({ autoClose = true, children, ...restProps }, ref) => {
  return autoClose ? (
    <Primitive.Close asChild>
      <button ref={ref} css={selectCss.item} {...restProps}>
        {children}
      </button>
    </Primitive.Close>
  ) : (
    <button
      ref={ref}
      css={[selectCss.item, restProps.disabled && selectCss.disabledItem]}
      {...restProps}
    >
      {children}
    </button>
  );
});
PopoverItem.displayName = 'PopoverItem';

const PopoverClose = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  (props, ref) => {
    return <Primitive.Close ref={ref} {...props} />;
  },
);
PopoverClose.displayName = 'PopoverClose';

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
Popover.Item = PopoverItem;
Popover.Close = PopoverClose;

export default Popover;
