import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

import { dashboardQueries } from '@/queries/dashboard';
import type { DashboardWidget } from '@/types/dashboard';
import type { WidgetDetailResponse } from '@/types/widgets';

import { EditorPage } from '../editor/EditorPage';

const convertDashboardWidgetToWidgetDetail = (widget: DashboardWidget): WidgetDetailResponse => ({
  id: widget.id,
  dashboard_id: widget.dashboard_id,
  name: widget.name,
  type: widget.type as WidgetDetailResponse['type'],
  processed_data: widget.processed_data || '',
  config: (typeof widget.config === 'string' ? widget.config : JSON.stringify(widget.config)) || '',
  position: widget.position,
  created_at: widget.created_at,
  updated_at: widget.updated_at,
});

export const ExportPreviewPage = () => {
  const params = useParams();
  const dashboardId = params?.id;

  const { data: dashboard } = useQuery(dashboardQueries.detail(dashboardId ?? ''));

  return (
    <EditorPage availableWidgets={dashboard?.widgets?.map(convertDashboardWidgetToWidgetDetail)} />
  );
};
