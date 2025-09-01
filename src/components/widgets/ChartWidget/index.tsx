import { css } from "@emotion/react";
import { WidgetShell } from "../WidgetShell";

const styles = {
  bars: css({
    display: "flex",
    alignItems: "flex-end",
    gap: 8,
    height: "100%",
  }),
  bar: (h: number) =>
    css({
      width: 18,
      height: `${h}%`,
      background: "linear-gradient(180deg,#74c0fc,#5c7cfa)",
      borderRadius: 6,
    }),
};

const sample = [20, 45, 30, 70, 55, 82, 40, 66, 28];

export const ChartWidget = ({ onRemove }: { onRemove: () => void }) => {
  return (
    <WidgetShell title="📈 샘플 차트" onRemove={onRemove}>
      <div css={styles.bars}>
        {sample.map((v, i) => (
          <div key={i} css={styles.bar(v)} />
        ))}
      </div>
    </WidgetShell>
  );
};
