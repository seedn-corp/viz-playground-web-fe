import type { WidgetType } from '@/atoms/dashboard';

import type { WidgetRenderer } from './types';

const REGISTRY = new Map<WidgetType, WidgetRenderer>();

export const registerWidget = (type: WidgetType, render: WidgetRenderer): void => {
  REGISTRY.set(type, render);
};

export const unregisterWidget = (type: WidgetType): void => {
  REGISTRY.delete(type);
};

export const getWidgetRenderer = (type: WidgetType): WidgetRenderer | null => {
  return REGISTRY.get(type) ?? null;
};

export const listRegisteredWidgets = (): WidgetType[] => {
  return Array.from(REGISTRY.keys());
};
