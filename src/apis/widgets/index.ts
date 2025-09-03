import type { CreateWidgetParams, UpdateWidgetParams, WidgetDetailResponse } from '@/types/widgets';

import client from '../client';

export const getWidgetDetail = async (id: string): Promise<WidgetDetailResponse> => {
  const { data } = await client.get(`/api/widgets/${id}`);
  return data.widget;
};

export const createWidget = async ({ dashboardId, ...params }: CreateWidgetParams) => {
  const { data } = await client.post(`/api/dashboards/${dashboardId}/widgets`, params);
  return data;
};

export const updateWidget = async ({ id, ...params }: UpdateWidgetParams) => {
  const { data } = await client.put(`/api/widgets/${id}`, params);
  return data;
};

export const getAllWidget = async (dashboardId: string) => {
  const { data } = await client.get(`/api/dashboards/${dashboardId}/widgets`);

  return data.widgets;
};
