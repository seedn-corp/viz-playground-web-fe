import { css } from '@emotion/react';

export const styles = {
  grid: css({
    position: 'relative',
    '.react-grid-item': { transition: 'box-shadow 120ms ease' },
    '.react-grid-item.react-grid-placeholder': {
      background: 'rgba(99,102,241,0.25)',
      borderRadius: 8,
    },
    '.react-resizable-handle': {
      width: 20,
      height: 20,
      right: 0,
      bottom: 0,
      background: 'transparent',
      border: 'none',
      cursor: 'nw-resize',
      '&::after': {
        display: 'none !important',
      },
    },
    '.react-grid-item:has(.react-resizable-handle:hover) > *': {
      borderColor: 'rgba(99, 102, 241, 0.4) !important',
    },
  }),
  
  editControls: css({
    position: 'fixed',
    bottom: 40,
    right: 24,
    zIndex: 1000,
    display: 'flex',
    gap: 8,
    background: 'white',
    padding: '8px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
  }),
  
  cancelBtn: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    border: 'none',
    borderRadius: '8px',
    background: 'transparent',
    cursor: 'pointer',
    color: '#6b7280',
    transition: 'all 0.2s ease',
    ':hover': {
      background: 'rgba(239, 68, 68, 0.1)',
      color: '#ef4444',
    },
  }),
  
  editBtn: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    border: 'none',
    borderRadius: '8px',
    background: 'transparent',
    cursor: 'pointer',
    color: '#6b7280',
    fontSize: '13px',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    ':hover': {
      background: 'rgba(59, 130, 246, 0.1)',
      color: '#3b82f6',
    },
  }),
  
  editBtnActive: css({
    background: '#3b82f6',
    color: 'white',
    padding: '8px 12px',
    ':hover': {
      background: '#2563eb',
      color: 'white',
    },
  }),
  
  editBtnInactive: css({
    padding: '8px',
  }),
};
