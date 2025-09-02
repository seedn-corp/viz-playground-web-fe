import { css } from "@emotion/react";
import type { PropsWithChildren } from "react";

const shell = {
  card: css({
    background: "#fff",
    borderRadius: 10,
    border: "1px solid #e9ecef",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    overflow: "hidden",
  }),
  header: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 10px",
    borderBottom: "1px solid #f1f3f5",
    background: "#fafafa",
    cursor: "grab",
  }),
  titleRow: css({
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    fontWeight: 600,
    color: "#343a40",
  }),
  dragDot: css({
    width: 14,
    height: 14,
    background:
      "repeating-linear-gradient(45deg, #ced4da, #ced4da 2px, transparent 2px, transparent 4px)",
    borderRadius: 3,
  }),
  body: css({
    padding: 12,
    flex: 1,
    minHeight: 0,
  }),
  btn: css({
    border: "1px solid #dee2e6",
    padding: "4px 8px",
    borderRadius: 6,
    background: "#fff",
    fontSize: 12,
    cursor: "pointer",
    ":hover": { background: "#f8f9fa" },
  }),
};

type Props = {
  title: string;
  onRemove?: () => void;
};

export const WidgetShell = ({
  title,
  onRemove,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div css={shell.card}>
      <div className="widget-drag-handle" css={shell.header} title="Drag here">
        <div css={shell.titleRow}>
          <span css={shell.dragDot} />
          {title}
        </div>
        {onRemove && (
          <button css={shell.btn} onClick={onRemove} aria-label="remove widget">
            삭제
          </button>
        )}
      </div>
      <div css={shell.body}>{children}</div>
    </div>
  );
};
