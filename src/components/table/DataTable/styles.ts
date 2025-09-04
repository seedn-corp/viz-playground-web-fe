import { css } from '@emotion/react';

export const dataTableCss = {
  container: css({
    width: '100%',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
    borderCollapse: 'separate',
    borderSpacing: 0,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    boxShadow: '0 1px 4px rgba(16,24,40,0.06)',
    border: '1px solid #eaecef',
  }),

  thead: css({
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid transparent',
  }),

  th: css({
    padding: '10px 16px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    cursor: 'pointer',
    position: 'sticky',
    top: 0,
    zIndex: 3,
    backgroundColor: '#f8fafc',
    color: '#374151',

    '&:first-of-type': {
      paddingLeft: 18,
      borderTopLeftRadius: 12,
    },

    '&:last-of-type': {
      paddingRight: 18,
      borderTopRightRadius: 12,
    },

    '&:hover': {
      backgroundColor: '#f1f5f9',
    },
  }),

  sortIcon: css({
    marginLeft: '6px',
    fontSize: 12,
  }),

  tbody: css({
    backgroundColor: '#ffffff',
  }),

  tr: css({
    transition: 'background-color 0.14s ease',
    '&:hover': {
      backgroundColor: '#fbfdff',
    },
    '&:not(:last-of-type) td': {
      borderBottom: '1px solid #f1f5f9',
    },
  }),

  td: css({
    padding: '10px 16px',
    fontSize: '13px',
    color: '#111827',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
  }),
};
