import { css } from '@emotion/react';

export const confirmDeleteCss = {
  body: css({
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  }),
  hint: css({
    color: '#868e96',
    fontSize: 13,
  }),
  actions: css({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 8,
  }),
};
