import { createContext } from '@basiln/utils';

import type { SelectContextValue } from './types';

export const [SelectProvider, useSelectContext] =
  createContext<SelectContextValue>('Select');
