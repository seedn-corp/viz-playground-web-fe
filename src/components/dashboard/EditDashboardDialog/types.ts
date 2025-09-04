export type EditDashboardDialogProps = {
  open: boolean;
  id: string;
  initialName: string;
  initialDescription: string | null;
  onClose: () => void;
};
