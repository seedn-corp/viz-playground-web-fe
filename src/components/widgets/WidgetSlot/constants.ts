import type { WidgetType } from '@/types/widgets';

export const WIDGET_META: Record<WidgetType, { icon: string; label: string }> = {
  bar_chart: { icon: '📊', label: '막대 차트' },
  line_chart: { icon: '📈', label: '선형 차트' },
  pie_chart: { icon: '🥧', label: '원형 차트' },
  metric: { icon: '📋', label: '메트릭' },
  scatter_plot: { icon: '📉', label: '산점도' },
  table: { icon: '📄', label: '테이블' },
};