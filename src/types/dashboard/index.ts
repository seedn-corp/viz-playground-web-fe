export type DashboardSummary = {
  id: string;
  name: string;
  description: string | null;
  widget_count: number;
  created_at: string;
  updated_at: string;
};

export type GridPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type DashboardWidget = {
  id: string;
  dashboard_id: string;
  name: string;
  type: string;
  position: GridPosition;
  config?: unknown | null;
  data_source_id?: string | null;
  processed_data?: string | null;
  created_at: string;
  updated_at: string;
};

export type DashboardDetail = {
  id: string;
  user_id?: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  widgets: DashboardWidget[];
};

export type GetDashboardsResponse = {
  success: boolean;
  dashboards: DashboardSummary[];
};

export type CreateDashboardParams = {
  name: string;
  description?: string;
};
export type CreateDashboardResponse = {
  success: boolean;
  dashboard: DashboardDetail | DashboardSummary;
};

export type GetDashboardDetailResponse = {
  success: boolean;
  dashboard: DashboardDetail;
};

export type UpdateDashboardParams = {
  name?: string;
  description?: string | null;
  layouts?: unknown;
};
export type UpdateDashboardResponse = {
  success: boolean;
  dashboard: DashboardDetail;
};

export type DeleteDashboardResponse = {
  success: boolean;
  message?: string;
};

export type DashboardWidgetUI<C = unknown, D = unknown> = Omit<
  DashboardWidget,
  'config' | 'processed_data'
> & {
  configObj: C | null;
  processedData: D | null;
};

export type DashboardDetailUI<C = unknown, D = unknown> = Omit<DashboardDetail, 'widgets'> & {
  widgets: DashboardWidgetUI<C, D>[];
};
