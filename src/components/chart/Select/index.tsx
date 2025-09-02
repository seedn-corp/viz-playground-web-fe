'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { selectCss } from './styles';

function Root(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function Group(props: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function Value(props: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function Trigger({
  size = 'default',
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: 'sm' | 'default';
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      css={selectCss.trigger}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon css={selectCss.icon} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function Content({
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        css={selectCss.content}
        position={position}
        {...props}
      >
        <ScrollUpButton />
        <SelectPrimitive.Viewport css={selectCss.viewport}>
          {children}
        </SelectPrimitive.Viewport>
        <ScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function Label(props: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      css={selectCss.label}
      {...props}
    />
  );
}

function Item({
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      css={selectCss.item}
      {...props}
    >
      <span css={selectCss.itemIndicator}>
        <SelectPrimitive.ItemIndicator>
          <CheckIcon css={selectCss.icon} />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function Separator(
  props: React.ComponentProps<typeof SelectPrimitive.Separator>
) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      css={selectCss.separator}
      {...props}
    />
  );
}

function ScrollUpButton(
  props: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>
) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      css={selectCss.scrollButton}
      {...props}
    >
      <ChevronUpIcon css={selectCss.icon} />
    </SelectPrimitive.ScrollUpButton>
  );
}

function ScrollDownButton(
  props: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>
) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      css={selectCss.scrollButton}
      {...props}
    >
      <ChevronDownIcon css={selectCss.icon} />
    </SelectPrimitive.ScrollDownButton>
  );
}

/**
 * Compound Export
 */
export const Select = Object.assign(Root, {
  Group,
  Value,
  Trigger,
  Content,
  Label,
  Item,
  Separator,
  ScrollUpButton,
  ScrollDownButton,
});
