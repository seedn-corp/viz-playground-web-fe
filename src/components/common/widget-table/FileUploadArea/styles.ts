import { css } from '@emotion/react';

export const fileUploadAreaCss = {
  container: css({
    backgroundColor: 'white',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  }),

  dropZone: css({
    border: '2px dashed #e5e7eb',
    borderRadius: '0.375rem',
    padding: '1rem',
    textAlign: 'center',
    transition: 'border-color 0.2s ease',
    '&:hover': {
      borderColor: '#3b82f6',
    },
  }),

  label: css({
    cursor: 'pointer',
  }),

  title: css({
    fontSize: '1.125rem',
    fontWeight: '500',
    color: '#374151',
  }),

  input: css({
    display: 'none',
  }),

  helperText: css({
    fontSize: '0.875rem',
    color: '#6b7280',
  }),
};
