import '@emotion/react';
import type { colors, fonts } from '@basiln/design-system';

declare module '@emotion/react' {
  export interface Theme {
    colors: typeof colors;
    fonts: typeof fonts;
  }
}
