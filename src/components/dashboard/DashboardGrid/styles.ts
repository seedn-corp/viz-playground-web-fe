import { css } from '@emotion/react';

export const styles = {
  grid: css({
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
};
