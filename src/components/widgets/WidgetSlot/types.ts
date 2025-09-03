import type { JSX } from 'react';

import type { WidgetType } from '@/atoms/dashboard';

export type WidgetRenderer = (p: { onRemove: () => void }) => JSX.Element;

export type WidgetSlotProps = {
  type: WidgetType;
  onRemove: () => void;
  props?: Record<string, unknown>;
};
