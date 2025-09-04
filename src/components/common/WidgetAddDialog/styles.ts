import { theme } from '@basiln/design-system';
import { css } from '@emotion/react';

export const widgetAddDialogCss = {
  content: css({
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    flex: 1,
  }),

  widgetOption: css({
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 8,
    border: `2px solid ${theme.colors.gray_040}`,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: theme.colors.gray_080,
      backgroundColor: theme.colors.gray_040,
    },
  }),

  widgetIcon: css({
    width: 48,
    height: 48,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  }),

  chartIcon: css({
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: theme.colors.냉방,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
  }),

  tableIcon: css({
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: theme.colors.송풍,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
  }),

  widgetInfo: css({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    flex: 1,
  }),
};
