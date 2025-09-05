import { css, type Theme } from '@emotion/react';

export const colorPickerCss = {
  container: css({
    position: 'relative',
  }),

  colorButton: (color: string, isActive: boolean) =>
    css({
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: color,
      border: `2px solid ${isActive ? color : '#e5e5e5'}`,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      outline: 'none',
      position: 'relative',

      ':hover': {
        transform: 'scale(1.1)',
      },

      ...(isActive && {
        '::after': {
          content: "''",
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '6px',
          height: '6px',
          backgroundColor: 'white',
          borderRadius: '50%',
        },
      }),
    }),

  historySection: css({
    marginBottom: '16px',
  }),

  historyLabel: css({
    fontSize: '12px',
    fontWeight: 500,
    color: '#6b7280',
    marginBottom: '8px',
  }),

  historyGrid: css({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    maxWidth: '200px',
  }),

  paletteGrid: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    maxWidth: '220px',
  }),

  paletteRow: css({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }),

  paletteName: css({
    fontSize: '11px',
    fontWeight: 500,
    color: '#6b7280',
    width: '45px',
    flexShrink: 0,
  }),

  paletteButton: (color: string, isActive: boolean) =>
    css({
      width: '16px',
      height: '16px',
      borderRadius: '3px',
      backgroundColor: color,
      border: `1px solid ${isActive ? '#6366f1' : '#e5e5e5'}`,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      outline: 'none',
      position: 'relative',

      ':hover': {
        transform: 'scale(1.2)',
        borderColor: '#9ca3af',
      },

      ...(isActive && {
        '::after': {
          content: "''",
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '4px',
          height: '4px',
          backgroundColor: 'white',
          borderRadius: '50%',
          boxShadow: '0 0 2px rgba(0, 0, 0, 0.3)',
        },
      }),
    }),

  historyButton: (color: string, isActive: boolean) =>
    css({
      width: '28px',
      height: '28px',
      borderRadius: '6px',
      backgroundColor: color,
      border: `2px solid ${isActive ? '#6366f1' : '#e5e5e5'}`,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      outline: 'none',
      position: 'relative',

      ':hover': {
        transform: 'scale(1.05)',
        borderColor: '#9ca3af',
      },

      ...(isActive && {
        '::after': {
          content: "''",
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '8px',
          height: '8px',
          backgroundColor: 'white',
          borderRadius: '50%',
          boxShadow: '0 0 2px rgba(0, 0, 0, 0.3)',
        },
      }),
    }),

  customButton: (color: string) =>
    css({
      width: '24px',
      height: '24px',
      borderRadius: '4px',
      backgroundColor: color,
      border: '1px solid #e5e5e5',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      outline: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textShadow: '0 0 2px rgba(0, 0, 0, 0.5)',

      ':hover': {
        transform: 'scale(1.05)',
        borderColor: '#ccc',
      },
    }),

  pickerContainer: css({
    position: 'absolute',
    top: 'calc(100% + 8px)',
    right: '-12px',
    zIndex: 9999,
    animation: 'tooltipSlideIn 0.2s ease-out',

    '@keyframes tooltipSlideIn': {
      from: {
        opacity: 0,
        transform: 'translateY(-8px) scale(0.95)',
      },
      to: {
        opacity: 1,
        transform: 'translateY(0) scale(1)',
      },
    },
  }),

  overlay: css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: -1,
  }),

  pickerWrapper: css({
    position: 'relative',
    background: 'white',
    borderRadius: '16px',
    boxShadow:
      '0 12px 24px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04)',
    padding: '8px',
    border: '1px solid rgba(255, 255, 255, 0.8)',

    '::before': {
      content: "''",
      position: 'absolute',
      top: '-8px',
      right: '16px',
      width: 0,
      height: 0,
      borderLeft: '8px solid transparent',
      borderRight: '8px solid transparent',
      borderBottom: '8px solid white',
      filter: 'drop-shadow(0 -2px 4px rgba(0, 0, 0, 0.1))',
    },

    '::after': {
      content: "''",
      position: 'absolute',
      top: '-7px',
      right: '16px',
      width: 0,
      height: 0,
      borderLeft: '8px solid transparent',
      borderRight: '8px solid transparent',
      borderBottom: '8px solid white',
    },

    '.sketch-picker': {
      boxShadow: 'none !important',
      borderRadius: '12px !important',
    },
  }),

  pickerButtons: css({
    marginTop: '20px',
    justifyContent: 'flex-end',
    gap: '12px',
  }),

  cancelButton: css({
    padding: '10px 20px',
    border: '1px solid #e1e5e9',
    background: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    color: '#64748b',
    transition: 'all 0.2s ease',

    ':hover': {
      background: '#f8fafc',
      borderColor: '#cbd5e1',
      color: '#475569',
      transform: 'translateY(-1px)',
    },

    ':active': {
      transform: 'translateY(0)',
    },
  }),

  confirmButton: (theme: Theme) =>
    css({
      padding: '10px 20px',
      border: 'none',
      background: theme.colors.seedn_key,
      color: 'white',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 500,
      transition: 'all 0.2s ease',

      ':hover': {
        transform: 'translateY(-1px)',
      },

      ':active': {
        transform: 'translateY(0)',
      },
    }),

  colorSection: css({
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid #f1f5f9',
  }),

  presetSection: css({
    marginBottom: '16px',
  }),

  historyItemContainer: css({
    position: 'relative',
    display: 'inline-block',
  }),

  historyDeleteButton: css({
    position: 'absolute',
    top: '-3px',
    right: '-3px',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'rgba(239, 68, 68, 0.95)',
    border: '1px solid white',
    color: 'white',
    cursor: 'pointer',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '6px',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
    zIndex: 10,

    ':hover': {
      background: 'rgba(220, 38, 38, 1)',
      transform: 'scale(1.15)',
    },

    '.history-item:hover &': {
      display: 'flex',
    },
  }),
};
