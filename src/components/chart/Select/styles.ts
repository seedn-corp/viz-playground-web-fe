// styles.ts
import { css } from '@emotion/react';

export const selectCss = {
  trigger: css({
    border: '1px solid var(--input)',
    background: 'var(--input-background)',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.5rem',
    borderRadius: '0.375rem',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    whiteSpace: 'nowrap',
    transition: 'color 0.2s, box-shadow 0.2s',
    outline: 'none',
    "&[data-size='default']": {
      height: '2.25rem',
    },
    "&[data-size='sm']": {
      height: '2rem',
    },
    '&[disabled]': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    svg: {
      pointerEvents: 'none',
      flexShrink: 0,
      width: '1rem',
      height: '1rem',
      opacity: 0.5,
    },
    '&:focus-visible': {
      borderColor: 'var(--ring)',
      boxShadow: '0 0 0 3px var(--ring)50',
    },
  }),

  content: css({
    background: 'var(--popover)',
    color: 'var(--popover-foreground)',
    borderRadius: '0.375rem',
    border: '1px solid var(--border)',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    maxHeight: 'var(--radix-select-content-available-height)',
    minWidth: '8rem',
    overflowX: 'hidden',
    overflowY: 'auto',
    position: 'relative',
    zIndex: 50,
    "&[data-side='bottom']": { transform: 'translateY(0.25rem)' },
    "&[data-side='top']": { transform: 'translateY(-0.25rem)' },
  }),

  viewport: css({
    padding: '0.25rem',
    height: 'var(--radix-select-trigger-height)',
    width: '100%',
    minWidth: 'var(--radix-select-trigger-width)',
  }),

  label: css({
    padding: '0.375rem 0.5rem',
    fontSize: '0.75rem',
    color: 'var(--muted-foreground)',
  }),

  item: css({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    width: '100%',
    padding: '0.375rem 0.5rem',
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    userSelect: 'none',
    cursor: 'pointer',
    '&:focus': {
      background: 'var(--accent)',
      color: 'var(--accent-foreground)',
    },
    '&[data-disabled]': {
      pointerEvents: 'none',
      opacity: 0.5,
    },
    svg: {
      flexShrink: 0,
      width: '1rem',
      height: '1rem',
    },
  }),

  itemIndicator: css({
    position: 'absolute',
    right: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '0.875rem',
    height: '0.875rem',
  }),

  separator: css({
    background: 'var(--border)',
    height: '1px',
    margin: '0.25rem 0',
    pointerEvents: 'none',
  }),

  scrollButton: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.25rem',
    cursor: 'default',
  }),

  icon: css({
    width: '1rem',
    height: '1rem',
  }),
};
