import { theme } from '@basiln/design-system';
import { css, type Theme } from '@emotion/react';

const widthBySize = {
  sm: 360,
  md: 480,
  lg: 640,
} as const;

export const dialogCss = {
  overlay: css({
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  }),
  dialog: (size: keyof typeof widthBySize = 'md') =>
    css({
      width: '90%',
      maxWidth: widthBySize[size],
      maxHeight: '90vh',
      backgroundColor: theme.colors.white,
      borderRadius: 12,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      padding: '16px 24px 20px',
      gap: 16,
    }),
  header: (theme: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottom: `1px solid ${theme.colors.gray_050}`,
      paddingBottom: 14,
    }),
  title: css({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  }),
  closeButton: css({
    minWidth: 'auto',
    width: 32,
    height: 32,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: 400,
    cursor: 'pointer',
  }),
  body: css({
    flex: 1,
    textAlign: 'center',
  }),
  footer: css({
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
  }),
};
