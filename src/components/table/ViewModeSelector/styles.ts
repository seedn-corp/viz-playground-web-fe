import { css } from '@emotion/react';

export const viewModeSelectorCss = {
  container: css({
    display: 'flex',
    gap: '2px',
    justifyContent: 'space-between',
    alignContent: 'center',
  }),

  selectContainer: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: '100%',
    flex: 1,

    '& > div': {
      width: 'auto',
    },
  }),

  groupTypeButtonContainer: css({
    display: 'flex',
    gap: '8px',
  }),
};
