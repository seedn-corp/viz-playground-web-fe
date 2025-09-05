export type ConfirmDeleteDialogProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  disableClose?: boolean;
  titleText?: string;
  descriptionText?: string;
  confirmLabel?: string;
  cancelLabel?: string;
};
