import { theme } from '@basiln/design-system';
import { css } from '@emotion/react';

import { Z_INDEX } from '@/constants';

export const headerCss = {
  container: css({
    position: 'fixed',
    top: 0,
    width: '100%',
    minHeight: 40,
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.colors.gray_050}`,
    backgroundColor: theme.colors.white,
    zIndex: Z_INDEX.HEADER,
  }),
};
