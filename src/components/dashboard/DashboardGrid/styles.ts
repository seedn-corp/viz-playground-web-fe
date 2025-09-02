import { css } from "@emotion/react";

export const styles = {
  grid: css({
    ".react-grid-item": { transition: "box-shadow 120ms ease" },
    ".react-grid-item.react-grid-placeholder": {
      background: "rgba(99,102,241,0.25)",
      borderRadius: 8,
    },
    ".react-resizable-handle": {
      width: 12,
      height: 12,
      right: 6,
      bottom: 6,
      background:
        "conic-gradient(from 180deg at 50% 50%, #adb5bd, transparent) 50%/100% 100% no-repeat",
      borderRadius: 3,
    },
  }),
};
