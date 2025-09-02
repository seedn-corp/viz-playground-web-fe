import { hexToRgba } from '@basiln/utils';
import { css, type Theme } from '@emotion/react';

export const selectCss = {
  trigger: (theme: Theme) =>
    css({
      backgroundColor: theme.colors.gray_020,
      border: `1px solid ${theme.colors.gray_050}`,
      borderRadius: 5,
      width: '100%',
      height: 34,
      textAlign: 'start',
      padding: '0 14px',
      display: 'flex',
      alignItems: 'center',
      ...theme.fonts['body-medium'],
      svg: {
        color: theme.colors.gray_080,
      },
    }),
  value: css({
    flex: 1,
    lineHeight: '1',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  }),
  content: (theme: Theme) =>
    css({
      padding: 5,
      borderRadius: 4,
      backgroundColor: theme.colors.white,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0px 4px 20px 0px #0000001A',
      overflowY: 'auto',
      border: `1px solid ${theme.colors.gray_050}`,
      zIndex: 10,
      // minWidth: 'max-content',
      width: '100%',
    }),
  item: (theme: Theme) =>
    css({
      maxWidth: '100%',
      minHeight: 30,
      display: 'flex',
      alignItems: 'center',
      padding: '0 6px',
      fontWeight: 400,
      fontSize: 12,
      borderRadius: 3,
      cursor: 'pointer',
      outline: 'none',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      '&:hover': {
        backgroundColor: hexToRgba({ hex: theme.colors.seedn_key, alpha: 0.1 }),
      },
      '&[data-selected="true"]': {
        fontWeight: 500,
        color: theme.colors.seedn_key,
      },
    }),
  disabledItem: css({
    '&:hover': {
      backgroundColor: 'transparent',
      fontWeight: 400,
    },
  }),
};
