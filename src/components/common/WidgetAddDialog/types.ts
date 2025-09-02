export type WidgetAddDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddWidget: (widgetType: "chart" | "table") => void;
};
