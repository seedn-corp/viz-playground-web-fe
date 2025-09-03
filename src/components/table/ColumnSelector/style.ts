import { css } from '@emotion/react';

export const columnSelectorCss = {
  checkboxContainer: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    marginLeft: '2px',
  }),

  label: css({
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    cursor: 'pointer',
  }),

  checkbox: css({
    width: '14px',
    height: '14px',
    accentColor: '#3b82f6',
  }),

  buttonContainer: css({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '4px',
  }),

  button: css({}),
};
