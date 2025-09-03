import type * as SelectPrimitive from '@radix-ui/react-select';
import type { ReactNode } from 'react';

export type SelectProps = SelectPrimitive.SelectProps & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export type SelectTriggerProps = SelectPrimitive.SelectTriggerProps & {
  leftAddon?: ReactNode;
};

export type SelectContextValue = {
  value?: string;
  onValueChange: (value: string) => void;
  triggerWidth?: number;
  onTriggerWidthChange: (width: number) => void;
};
