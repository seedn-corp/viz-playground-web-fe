import { css, type Theme } from '@emotion/react';

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

  checkbox: (theme: Theme) =>
    css({
      width: '14px',
      height: '14px',
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      appearance: 'none',
      display: 'inline-block',
      border: `1px solid ${theme.colors.gray_040}`,
      borderRadius: '3px',
      position: 'relative',
      background: 'transparent',
      cursor: 'pointer',

      '&:focus': {
        outline: `2px solid ${theme.colors.seedn_key}`,
        outlineOffset: '2px',
      },

      '&::after': {
        content: "''",
        position: 'absolute',
        width: '4px',
        height: '8px',
        left: '3px',
        top: '-1px',
        borderRight: '2px solid transparent',
        borderBottom: '2px solid transparent',
        transform: 'rotate(45deg) scale(0)',
        transition: 'transform 120ms ease',
        boxSizing: 'content-box',
      },

      '&:checked': {
        background: theme.colors.seedn_key,
        borderColor: theme.colors.seedn_key,
      },
      '&:checked::after': {
        borderRight: `2px solid ${theme.colors.white}`,
        borderBottom: `2px solid ${theme.colors.white}`,
        transform: 'rotate(45deg) scale(1)',
      },

      accentColor: theme.colors.seedn_key,
    }),

  buttonContainer: css({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '4px',
  }),
};
