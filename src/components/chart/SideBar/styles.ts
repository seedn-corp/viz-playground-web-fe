import { widgetTableCss } from '@/pages/table/styles';
import { css, type Theme } from '@emotion/react';

export const sideBarCss = {
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

  nameInput: widgetTableCss.tableNameInput,
};
