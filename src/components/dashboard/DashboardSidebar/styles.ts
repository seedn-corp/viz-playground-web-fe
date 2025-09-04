import { theme } from '@basiln/design-system';
import { css } from '@emotion/react';

export const sidebarCss = {
  wrap: () =>
    css({
      width: 260,
      minWidth: 260,
      height: 'calc(100vh - 60px)',
      borderRight: `1px solid ${theme.colors.gray_050}`,
      background: theme.colors.white,
      padding: '16px 10px',
      position: 'sticky',
      top: 60,
      overflowY: 'auto',
    }),
  header: () =>
    css({
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: '0 4px 10px',
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
};
