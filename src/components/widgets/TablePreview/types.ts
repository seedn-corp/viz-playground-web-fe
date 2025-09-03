import type { WidgetDetailResponse } from '@/types/widgets';

export type TablePreviewProps = {
  processed_data?: WidgetDetailResponse['processed_data'];
  config?: WidgetDetailResponse['config'];
};
