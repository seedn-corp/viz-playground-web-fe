import { NoteWidget } from "../NoteWidget";
import { ChartWidget } from "../ChartWidget";
import type { WidgetType } from "@/store/dashboard";
import type { JSX } from "react";

export const WidgetRegistry: Record<
  WidgetType,
  (p: { onRemove: () => void }) => JSX.Element
> = {
  note: (p) => <NoteWidget {...p} />,
  chart: (p) => <ChartWidget {...p} />,
};
