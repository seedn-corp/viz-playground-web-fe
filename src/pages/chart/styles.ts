import { css, type Theme } from '@emotion/react';

export const chartPageCss = {
  header: (theme: Theme) =>
    css({
      width: '100%',
      height: 58,
      minHeight: 58,
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      borderBottom: `1px solid ${theme.colors.gray_050}`,
      backgroundColor: theme.colors.white,
    }),

  backLinkButton: css({
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '4px 8px',
    borderRadius: 4,
    ':hover': {
      backgroundColor: '#f5f5f5',
    },
  }),

  chartContainer: (theme: Theme) =>
    css({
      flex: 1,
      margin: 20,
      padding: 50,
      paddingLeft: 20,
      border: `1px solid ${theme.colors.gray_050}`,
      borderRadius: 10,
      height: '90%',
      width: '100%',
      position: 'relative',
    }),

  placeholderContainer: css({
    flex: 1,
    height: '100%',
    color: '#999',
    gap: 12,
    textAlign: 'center',
  }),
};
