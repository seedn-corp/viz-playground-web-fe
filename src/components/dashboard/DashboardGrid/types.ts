export type DashboardGridProps = {
  onOpenDialog: () => void;
  renderEditModeControls?: (params: {
    isEditMode: boolean;
    pendingChanges: number;
    onEditToggle: () => void;
    onCancelEdit: () => void;
  }) => React.ReactNode;
};
