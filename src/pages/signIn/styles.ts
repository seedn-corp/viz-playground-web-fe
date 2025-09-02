import { css } from "@emotion/react";

export const signInCss = {
  container: css({
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "12px 26px 0 32px",
  }),
  content: css({
    width: "fit-content",
    maxWidth: 400,
  }),
  buttonContainer: css({
    width: "100%",
  }),
  buttonText: css({
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 700,
  }),
};
