import { css } from '@emotion/react';

export const columnSelectorCss = {
  container: css({
    border: '1px solid #e5e7eb',
    borderRadius: '0.375rem',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    padding: '1rem',
  }),

  title: css({
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '0.75rem',
  }),

  checkboxContainer: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  }),

  label: css({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
  }),

  checkbox: css({
    width: '1rem',
    height: '1rem',
    accentColor: '#3b82f6',
  }),

  checkboxText: css({
    fontSize: '0.875rem',
    color: '#374151',
  }),

  buttonContainer: css({
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.75rem',
  }),

  button: css({
    padding: '0.25rem 0.5rem',
    fontSize: '0.875rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: '#f3f4f6',
    },
  }),
};
