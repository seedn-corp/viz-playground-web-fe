import { css } from '@emotion/react';

export const dataTableCss = {
  container: css({
    width: '100%',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
  }),

  thead: css({
    backgroundColor: '#f3f4f6',
    borderBottom: '1px solid #e5e7eb',
  }),

  th: css({
    padding: '8px 12px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    position: 'sticky',
    top: 0,
    zIndex: 2,
    backgroundColor: '#f3f4f6',

    '&:hover': {
      backgroundColor: '#f3f4f6',
    },
  }),

  sortIcon: css({
    marginLeft: '4px',
  }),

  tbody: css({
    borderTop: '1px solid #e5e7eb',
  }),

  tr: css({
    '&:hover': {
      backgroundColor: '#f3f4f6',
      transition: 'background-color 0.2s ease',
    },
  }),

  td: css({
    padding: '8px 12px',
    fontSize: '12px',
    color: '#374151',
  }),
};
