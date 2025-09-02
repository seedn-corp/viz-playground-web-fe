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
};
