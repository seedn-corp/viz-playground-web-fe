import { css, type Theme } from '@emotion/react';

export const widgetTablePageHeaderCss = {
  self: css({
    height: '58px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px',
    backgroundColor: 'white',
    borderBottom: '1px solid  #0000001a',
  }),

  buttonContainer: css({
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  }),
};

export const widgetTableCss = {
  container: css({
    height: 'calc(100vh - 58px)',
  }),

  fieldTitle: css({
    marginBottom: '6px',
  }),

  left: css({
    borderRight: '1px solid #0000001a',
    padding: '20px',
    overflow: 'auto',
  }),

  tableNameContainer: css({
    display: 'flex',
    flexDirection: 'column',
  }),

  tableNameInput: (theme: Theme) =>
    css({
      backgroundColor: theme.colors.gray_040,
      border: 'none',
      fontSize: '12px',
      padding: '6px 10px',
      borderRadius: '6px',
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

  separator: css({
    height: '1px',
    width: '100%',
    backgroundColor: '#0000001a',
  }),

  right: css({
    padding: '20px',
  }),

  previewContainer: css({
    border: '1px solid #0000001a',
    borderRadius: '6px',
    padding: '20px 0 20px 20px',
    height: 'calc(100vh - 100px)',
    width: 'calc(100vw - 300px)',
    display: 'flex',
    flexDirection: 'column',
  }),

  previewTableContainer: css({
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 35px)',
  }),
};
