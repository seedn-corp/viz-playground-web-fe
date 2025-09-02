import { css } from '@emotion/react';

export const paginationCss = {
  container: css({
    backgroundColor: '#fff',
    padding: '1rem',
    borderTop: '1px solid #eee',
  }),

  buttonContainer: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  numberButtonContainer: css({
    display: 'flex',
    gap: '0.25rem',
  }),
  numberButton: css({
    padding: '0.25rem 0.75rem',
    borderRadius: '0.375rem',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: '#e5e7eb',
    },
  }),

  numberButtonActive: css({
    backgroundColor: '#2563eb',
    color: '#fff',
  }),
};
