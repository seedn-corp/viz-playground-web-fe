export type ConfirmDeleteDialogProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  disableClose?: boolean;
};
