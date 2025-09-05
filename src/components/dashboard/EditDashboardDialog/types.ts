export type BaseProps = {
  open: boolean;
  onClose: () => void;
};

export type CreateProps = {
  mode: 'create';
  id?: never;
  initialName?: string;
  initialDescription?: string | null;
  onCreated?: (payload: { id: string; name: string }) => void;
};

export type EditProps = {
  mode: 'edit';
  id: string;
  initialName: string;
  initialDescription?: string | null;
  onUpdated?: () => void;
};

export type EditDashboardDialogProps = BaseProps & (CreateProps | EditProps);
