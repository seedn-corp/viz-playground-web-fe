import { css } from '@emotion/react';

export const paginationCss = {
  buttonContainer: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),

  button: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    padding: '0 6px',
    borderRadius: '50%',
    color: '#374151',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: '#e5e7eb',
    },

    '&:disabled': {
      opacity: 0.5,
      color: '#a1a1a1',
      cursor: 'not-allowed',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  }),

  numberButtonContainer: css({
    display: 'flex',
    gap: '6px',
  }),

  numberButton: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    padding: '0 6px',
    borderRadius: '50%',
    color: '#374151',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: '#e5e7eb',
    },
  }),

  numberButtonActive: css({
    backgroundColor: '#f3f4f6',
    color: '#000000',
  }),

  ellipsis: css({
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6b7280',
  }),

  compactCenter: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minWidth: 0,
  }),

  compactJump: css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    padding: 0,
    borderRadius: 6,
    background: 'transparent',
    border: '1px solid transparent',
    color: '#374151',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#e5e7eb',
    },
  }),

  compactSeparator: css({
    color: '#6b7280',
    fontSize: 14,
  }),

  compactTotal: css({
    color: '#6b7280',
    fontSize: 14,
    minWidth: 24,
    textAlign: 'center',
  }),
};
