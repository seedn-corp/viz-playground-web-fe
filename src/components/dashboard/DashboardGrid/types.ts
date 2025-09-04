import type { DashboardWidget } from '@/types/dashboard';

export type DashboardGridProps = {
  widgets: DashboardWidget[];
  onOpenDialog: () => void;
  renderEditModeControls?: (params: {
    isEditMode: boolean;
    pendingChanges: number;
    onEditToggle: () => void;
    onCancelEdit: () => void;
  }) => React.ReactNode;
};
