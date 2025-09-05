import { css, type Theme } from '@emotion/react';

const SIDE_GUTTER = 10;

export const sidebarCss = {
  wrap: (theme: Theme) =>
    css({
      width: 260,
      minWidth: 260,
      height: 'calc(100vh - 60px)',
      borderRight: `1px solid ${theme.colors.gray_050}`,
      background: theme.colors.white,
      padding: `0 ${SIDE_GUTTER}px 16px`,
      position: 'sticky',
      top: 60,
      overflowY: 'auto',

      scrollbarWidth: 'thin',
      scrollbarColor: `${theme.colors.gray_060} transparent`,
      '::-webkit-scrollbar': { width: 6 },
      '::-webkit-scrollbar-thumb': {
        borderRadius: 8,
        backgroundColor: theme.colors.gray_060,
        border: '2px solid transparent',
        backgroundClip: 'content-box',
      },
      '::-webkit-scrollbar-thumb:hover': {
        backgroundColor: theme.colors.gray_050,
      },
      '::-webkit-scrollbar-track': { background: 'transparent' },
    }),

  header: (theme: Theme, elevated = false) =>
    css({
      marginInline: -SIDE_GUTTER,
      padding: '16px 14px 10px',
      position: 'sticky',
      top: 0,
      zIndex: 1,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      background: theme.colors.white,

      ...(elevated && {
        boxShadow: `0 8px 16px -12px rgba(0,0,0,0.18), 0 1px 0 ${theme.colors.gray_050}`,
      }),

      ...(elevated && {
        '::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 0,
          pointerEvents: 'none',
        },
      }),
    }),

  titleRow: () =>
    css({
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }),

  list: css({
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    marginTop: 8,
  }),

  item: (active: boolean) =>
    css({
      padding: '8px 10px',
      borderRadius: 8,
      cursor: 'pointer',
      background: active ? '#f1f3f5' : 'transparent',
      ':hover': { background: '#f8f9fa' },
      border: `1px solid ${active ? '#dee2e6' : 'transparent'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }),

  empty: css({
    padding: '12px',
    color: '#868e96',
    lineHeight: 1.6,
    fontSize: 13,
    textAlign: 'center',
  }),

  create: (theme: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      marginTop: 10,
      color: theme.colors.gray_060,
    }),
};
