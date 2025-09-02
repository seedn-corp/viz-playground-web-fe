import { forwardRef } from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { separatorCss } from './styles';
import type { SeparatorProps } from './types';

const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ color, size, orientation = 'vertical', borderWidth, ...props }, ref) => {
    return (
      <SeparatorPrimitive.Root
        ref={ref}
        css={(theme) => separatorCss.separator({ theme, color, size, borderWidth })}
        orientation={orientation}
        {...props}
      />
    );
  },
);

export default Separator;
