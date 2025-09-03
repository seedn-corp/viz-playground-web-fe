import { css } from '@emotion/react';

export const fileUploadAreaCss = {
  dropZone: css({
    border: '2px solid #0000001a',
    borderRadius: '6px',
    height: '112px',
    padding: '0px 14px',
    textAlign: 'center',
    transition: 'border-color 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '&:hover': {
      borderColor: '#3b82f6',
    },
  }),

  isLoading: css({
    border: '2px solid #0000001a',
    borderRadius: '6px',
    height: '112px',
    padding: '0px 14px',
    textAlign: 'center',
    transition: 'border-color 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'not-allowed',
    backgroundColor: '#f8fafc',

    '&:hover': {
      borderColor: '#0000001a',
    },
  }),

  label: css({
    cursor: 'pointer',
    marginTop: '-6px',
  }),

  input: css({
    display: 'none',
  }),

  clearButton: css({
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    position: 'absolute',
    top: -8,
    right: -8,
  }),

  uploadInfo: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }),
};
