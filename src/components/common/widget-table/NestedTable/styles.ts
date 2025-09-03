import { css } from '@emotion/react';

export const nestedTableCss = {
  self: css({
    padding: '1rem',
  }),

  groupDepthContainer: css({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out, border 0.2s ease-in-out',
    borderRadius: '0.5rem',
  }),

  groupDepth: [
    css({
      backgroundColor: '#f0faff',
      '&:hover': {
        backgroundColor: '#e0f7ff',
        boxShadow: '0 0 0 1px #b2ebf2 inset',
      },
    }),
    css({
      backgroundColor: '#f0fff4',
      '&:hover': {
        backgroundColor: '#e0ffe0',
        boxShadow: '0 0 0 1px #a5d6a7 inset',
      },
    }),
    css({
      backgroundColor: '#fff4f0',
      '&:hover': {
        backgroundColor: '#ffe0e0',
        boxShadow: '0 0 0 1px #ef9a9a inset',
      },
    }),
    css({
      backgroundColor: '#f0f4ff',
      '&:hover': {
        backgroundColor: '#e0e0ff',
        boxShadow: '0 0 0 1px #c5cae9 inset',
      },
    }),
  ],

  groupDepthText: [
    css({
      color: '#3b82f6',
    }),
    css({
      color: '#10b981',
    }),
    css({
      color: '#f59e0b',
    }),
    css({
      color: '#6d28d9',
    }),
  ],

  expandIcon: css({
    height: '14px',
    width: '14px',
    color: '#6b7280',
    flexShrink: 0,
  }),

  groupContentContainer: css({
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    gap: '3px',
  }),

  groupRowContainer: css({
    '&:hover': {
      backgroundColor: '#f0f0f0',
      transition: 'background-color 0.2s ease-in-out',
    },
  }),

  groupRow: css({
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    color: '#111827',
    display: 'inline-block',
  }),

  subGroupContainer: css({
    marginTop: '0.5rem',
  }),

  notSubGroupContainer: css({
    backgroundColor: '#fff',
    border: '1px solid #eee',
    borderRadius: '0.375rem',
    overflow: 'hidden',
  }),

  notSubGroupTable: css({
    width: '100%',
    borderCollapse: 'collapse',
  }),

  notSubGroupTableHeader: css({
    backgroundColor: '#f9fafb',
  }),

  notSubGroupTh: css({
    padding: '0.5rem 1rem',
    textAlign: 'left',
    fontSize: '0.75rem',
    fontWeight: 500,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  }),

  notSubGroupTbody: css({
    // className="divide-y divide-gray-200"
    '& tr': {
      borderBottom: '1px solid #eee',
      '&:hover': {
        backgroundColor: '#f0f0f0',
        transition: 'background-color 0.2s ease-in-out',
      },

      '& td': {
        padding: '0.5rem 1rem',
        textAlign: 'left',
        fontSize: '0.875rem',
        color: '#111827',
      },
    },
  }),
};
