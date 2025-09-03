import { css } from '@emotion/react';

export const dataTableCss = {
  container: css({
    width: '100%',
    overflowX: 'auto',
  }),

  thead: css({
    backgroundColor: '#f3f4f6',
    borderBottom: '1px solid #e5e7eb',
  }),

  th: css({
    padding: '0.75rem 1rem',
    textAlign: 'left',
    fontSize: '0.75rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: '#f3f4f6',
    },
  }),

  sortIcon: css({
    marginLeft: '0.25rem',
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
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    color: '#374151',
  }),
};
