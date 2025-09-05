import { theme } from '@basiln/design-system';
import { css } from '@emotion/react';

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
    }),
  header: css({
    padding: '16px 24px',
    borderBottom: `1px solid ${theme.colors.gray_040}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
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
    padding: 24,
    overflow: 'auto',
    flex: 1,
  }),
  footer: css({
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 8,
  }),
};
