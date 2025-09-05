import { css, type Theme } from '@emotion/react';

export const signInCss = {
  container: (theme: Theme) =>
    css({
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.gray_020,
      padding: '20px',
    }),

  content: (theme: Theme) =>
    css({
      width: '100%',
      maxWidth: 400,
      backgroundColor: theme.colors.white,
      borderRadius: 16,
      padding: '40px 32px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    }),

  form: css({
    width: '100%',
  }),

  submitButton: css({
    width: '100%',
    marginTop: 8,
  }),

  inputWrap: css({
    width: '100%',
  }),

  input: (theme: Theme) =>
    css({
      width: '100%',
      padding: '12px 16px',
      border: `1px solid ${theme.colors.gray_040}`,
      borderRadius: 8,
      fontSize: 14,
      lineHeight: 1.5,
      transition: 'border-color 0.2s ease',
      '&:focus': {
        outline: 'none',
        borderColor: theme.colors.seedn_key,
      },
      '&:disabled': {
        backgroundColor: theme.colors.gray_020,
        cursor: 'not-allowed',
      },
    }),
};
