import type { LegendProps } from 'recharts';

import { generateHarmoniousColors } from '@/utils/colorUtils';

// charts/styles.ts
const PRESET_COLOR_PALETTES = {
  '#6F36C9': generateHarmoniousColors('#6F36C9'),
};

export const generateChartColors = (keyColor: string): string[] => {
  // 프리셋 색상인 경우 기존 팔레트 사용
  if (PRESET_COLOR_PALETTES[keyColor as keyof typeof PRESET_COLOR_PALETTES]) {
    return PRESET_COLOR_PALETTES[keyColor as keyof typeof PRESET_COLOR_PALETTES];
  }

  // 사용자 지정 색상인 경우 조화로운 색상 생성
  return generateHarmoniousColors(keyColor);
};

export const COLORS = PRESET_COLOR_PALETTES['#6F36C9'];

export const LEGEND_STYLE = {
  verticalAlign: 'top',
  align: 'right',
  wrapperStyle: { fontSize: 12, fontWeight: 500 },
} as LegendProps;
