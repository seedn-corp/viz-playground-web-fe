import { css } from '@emotion/react';

export const editDialogCss = {
  overlay: css({
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  }),
  dialog: css({
    width: 420,
    background: '#fff',
    borderRadius: 12,
    padding: 20,
    boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
  }),
  row: css({
    width: '100%',
  }),
  input: css({
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e9ecef',
    borderRadius: 8,
    fontSize: 14,
    ':focus': { outline: 'none', borderColor: '#6c5ce7' },
  }),
  textarea: css({
    width: '100%',
    minHeight: 96,
    padding: '10px 12px',
    border: '1px solid #e9ecef',
    borderRadius: 8,
    fontSize: 14,
    resize: 'vertical',
    ':focus': { outline: 'none', borderColor: '#6c5ce7' },
  }),
};
