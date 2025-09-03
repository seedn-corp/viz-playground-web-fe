export type WidgetType =
  | 'bar_chart'
  | 'line_chart'
  | 'pie_chart'
  | 'table'
  | 'metric'
  | 'scatter_plot';

export type WidgetDetailResponse = {
  id: string;
  dashboard_id: string;

  name: string;
  type: WidgetType;
  processed_data: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  config: string;
  created_at: string;
  updated_at: string;
};

export type CreateWidgetParams = {
  dashboardId: string;

  name: string;
  type: WidgetType;
  processed_data: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  config?: string;
};

export type UpdateWidgetParams = {
  id: number;

  name?: string;
  type?: string;
  processed_data?: string;
  position?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  config?: string;
};
