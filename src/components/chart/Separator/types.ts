import type { theme } from '@basiln/design-system';
import type { SeparatorProps as SeparatorPrimitiveProps } from '@radix-ui/react-separator';

export type SeparatorProps = SeparatorPrimitiveProps & {
  color?: keyof typeof theme.colors;
  size?: number;
  borderWidth?: number;
};
