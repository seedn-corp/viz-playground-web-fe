import { css, type Theme } from '@emotion/react';

export const separatorCss = {
  separator: ({
    theme,
    color,
    size,
    borderWidth,
  }: {
    theme: Theme;
    color?: keyof typeof theme.colors;
    size?: number;
    borderWidth?: number;
  }) =>
    css({
      backgroundColor: theme.colors[color || 'black'],
      '&[data-orientation="horizontal"]': {
        height: borderWidth || 1,
        minHeight: borderWidth || 1,
        width: size || '100%',
      },
      '&[data-orientation="vertical"]': {
        height: size || '100%',
        width: borderWidth || 1,
        minWidth: borderWidth || 1,
      },
    }),
};
