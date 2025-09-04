import { css } from '@emotion/react';

export const editDialogCss = {
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
