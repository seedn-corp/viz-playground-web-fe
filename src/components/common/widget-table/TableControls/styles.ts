import { css } from '@emotion/react';

export const tableControlsCss = {
  container: css({
    backgroundColor: '#ffffff',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  }),

  button: css({
    padding: '0.25rem 0.75rem',
    borderRadius: '0.375rem',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#e5e7eb',
    },

    '&:disabled': {
      backgroundColor: '#f3f4f6',
      color: '#a1a1a1',
      cursor: 'not-allowed',
    },
  }),

  resetButton: css({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#4B5563',
    color: '#FFFFFF',
    borderRadius: '0.375rem',

    '&:hover': {
      backgroundColor: '#6B7280',
    },
  }),
};
