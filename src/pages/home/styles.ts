import { css } from "@emotion/react";

export const homeCss = {
  container: css({
    width: "100%",
    paddingTop: 60,
  }),

  gridWrap: css({
    // Ensures WidthProvider can measure correctly
    width: "100%",
    padding: 16,
    boxSizing: "border-box",
  }),

  gridItemCard: css({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    borderRadius: 12,
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    background: "#fff",
    overflow: "hidden",
    border: "1px solid rgba(0,0,0,0.06)",
  }),

  cardHeader: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px",
    fontWeight: 700,
    borderBottom: "1px solid rgba(0,0,0,0.06)",
    // RGL: Drag only by this header
    cursor: "grab",
  }),

  cardBody: css({
    flex: 1,
    padding: 12,
    overflow: "auto",
  }),

  toolbar: css({
    display: "flex",
    gap: 8,
    alignItems: "center",
    padding: "0 16px 12px",
  }),

  button: css({
    appearance: "none",
    border: "1px solid rgba(0,0,0,0.12)",
    background: "#fff",
    height: 36,
    padding: "0 12px",
    borderRadius: 8,
    fontWeight: 600,
    lineHeight: "36px",
    cursor: "pointer",
    ":hover": { background: "#f7f7f7" },
  }),

  muted: css({
    color: "#666",
    fontSize: 13,
  }),
};
