import { css, type Theme } from '@emotion/react';

export const sideBarCss = {
  fileInput: css({
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: 110,
    overflow: 'hidden',
    opacity: 0,
  }),

  fileUploadButton: (theme: Theme) =>
    css({
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      border: `1px solid ${theme.colors.gray_050}`,
      borderRadius: 5,
      width: '100%',
      height: 110,
      transition: 'all 200ms',

      ':hover': {
        backgroundColor: theme.colors.gray_040,
      },

      ':active': {
        backgroundColor: theme.colors.gray_040,
      },
    }),

  uploadIcon: css({
    width: 14,
    height: 14,
  }),

  sampleDownloadButton: (theme: Theme) =>
    css({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      border: `1px solid ${theme.colors.gray_050}`,
      borderRadius: 5,
      width: '100%',
      height: 30,
      transition: 'all 200ms',

      ':hover': {
        backgroundColor: theme.colors.gray_040,
      },

      ':active': {
        backgroundColor: theme.colors.gray_040,
      },
    }),
};
