import client from '@/apis/client';
import type {
  CreateDashboardParams,
  CreateDashboardResponse,
  DeleteDashboardResponse,
  GetDashboardDetailResponse,
  GetDashboardsResponse,
  UpdateDashboardParams,
  UpdateDashboardResponse,
} from '@/types/dashboard';

export const listDashboards = async (): Promise<GetDashboardsResponse> => {
  const { data } = await client.get<GetDashboardsResponse>('/api/dashboards');
  return data;
};

export const createDashboard = async (
  params: CreateDashboardParams,
): Promise<CreateDashboardResponse> => {
  const { data } = await client.post<CreateDashboardResponse>('/api/dashboards', params);
  return data;
};

export const getDashboard = async (id: string): Promise<GetDashboardDetailResponse> => {
  const { data } = await client.get<GetDashboardDetailResponse>(`/api/dashboards/${id}`);
  return data;
};

export const updateDashboard = async (
  id: string,
  params: UpdateDashboardParams,
): Promise<UpdateDashboardResponse> => {
  const { data } = await client.put<UpdateDashboardResponse>(`/api/dashboards/${id}`, params);
  return data;
};

export const deleteDashboard = async (id: string): Promise<DeleteDashboardResponse> => {
  const { data } = await client.delete<DeleteDashboardResponse>(`/api/dashboards/${id}`);
  return data;
};
