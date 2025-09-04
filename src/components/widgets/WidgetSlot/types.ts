import type { JSX } from 'react';

import type { WidgetDetailResponse } from '@/types/widgets';

export type WidgetRenderer = (p: { onRemove: () => void }) => JSX.Element;

export type WidgetSlotProps = {
  onRemove: () => void;
  widget: WidgetDetailResponse;
};
