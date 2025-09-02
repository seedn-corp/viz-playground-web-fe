import { css } from "@emotion/react";
import { theme } from "@basiln/design-system";

export const widgetAddDialogCss = {
  overlay: css({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  }),

  dialog: css({
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    width: "90%",
    maxWidth: 480,
    maxHeight: "90vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  }),

  header: css({
    padding: "20px 24px 16px",
    borderBottom: `1px solid ${theme.colors.gray_040}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),

  closeButton: css({
    minWidth: "auto",
    width: 32,
    height: 32,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    fontWeight: 400,
  }),

  content: css({
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    flex: 1,
  }),

  widgetOption: css({
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderRadius: 8,
    border: `2px solid ${theme.colors.gray_040}`,
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: theme.colors.gray_080,
      backgroundColor: theme.colors.gray_040,
    },
  }),

  widgetIcon: css({
    width: 48,
    height: 48,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  }),

  chartIcon: css({
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: theme.colors.냉방,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
  }),

  tableIcon: css({
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: theme.colors.송풍,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
  }),

  widgetInfo: css({
    display: "flex",
    flexDirection: "column",
    gap: 4,
    flex: 1,
  }),
};
