import { css } from '@emotion/react';

import { Z_INDEX } from '@/constants';

export const layoutCss = {
  wrap: css({
    display: 'flex',
    minHeight: '100vh',
    background: '#fff',
    position: 'relative',
  }),

  main: css({
    marginTop: 60,
    flex: 1,
    padding: 16,
  }),

  sidebarContainer: (isHovered: boolean, isPinned: boolean) =>
    css({
      position: isPinned ? 'static' : 'fixed',
      top: isPinned ? 'auto' : 60,
      left: isPinned ? 0 : isHovered ? 0 : '-260px',
      zIndex: isPinned ? 'auto' : Z_INDEX.SIDEBAR,
      transition: 'left 0.3s ease',
    }),

  hoverZone: css({
    position: 'fixed',
    left: 0,
    top: 60,
    width: 20,
    height: 'calc(100vh - 60px)',
    zIndex: Z_INDEX.SIDEBAR_HOVER_ZONE,
    background: 'transparent',
  }),
};
