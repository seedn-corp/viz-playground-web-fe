import { theme } from '@basiln/design-system';
import { css } from '@emotion/react';

export const headerCss = {
  container: css({
    position: 'fixed',
    top: 0,
    width: '100%',
    minHeight: 40,
    padding: '0 20px',
    backgroundColor: theme.colors.white,
  }),
};
