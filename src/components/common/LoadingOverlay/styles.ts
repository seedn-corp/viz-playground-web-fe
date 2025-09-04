import { css } from '@emotion/react';

export const loadingOverlayCss = {
  self: css({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    zIndex: 40,
  }),
};
