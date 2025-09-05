import { useAtomValue } from 'jotai';

import { keyColorAtom } from '@/atoms/dashboard';
import { generateChartColors } from '@/components/common/charts/utils';

export const useChartColors = () => {
  const keyColor = useAtomValue(keyColorAtom);
  return generateChartColors(keyColor);
};