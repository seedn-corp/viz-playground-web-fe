// src/widgets/WidgetSlot.tsx
import type { WidgetType } from "@/atoms/dashboard";
import { WidgetShell } from "../WidgetShell";

type Props = {
  type: WidgetType;
  onRemove: () => void;
  props?: Record<string, unknown>;
};

export const WidgetSlot = ({ type, onRemove, props }: Props) => {
  switch (type) {
    case "excel":
      return (
        <WidgetShell title="📊 Excel 위젯" onRemove={onRemove}>
          {/* TODO: 실제 Excel 렌더러로 교체 */}
          준비 중입니다. props: <pre>{JSON.stringify(props, null, 2)}</pre>
        </WidgetShell>
      );

    case "chart":
      return (
        <WidgetShell title="📈 차트 위젯" onRemove={onRemove}>
          {/* TODO: 실제 차트 렌더러로 교체 */}
          준비 중입니다. props: <pre>{JSON.stringify(props, null, 2)}</pre>
        </WidgetShell>
      );

    default:
      return (
        <WidgetShell title={`❓ 미등록 타입: ${type}`} onRemove={onRemove}>
          이 타입은 아직 렌더러가 연결되지 않았습니다.
        </WidgetShell>
      );
  }
};
