export type DashboardEditTarget = {
  id: string;
  name: string;
  description: string | null;
};

export type DashboardSidebarProps = {
  onRequestEdit: (target: DashboardEditTarget) => void;
};
