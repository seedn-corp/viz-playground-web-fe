import type { LegendProps } from 'recharts';

// charts/styles.ts

const COLOR_PALETTES = {
  '#6F36C9': [
    '#6f36c9', // seedn_key
    '#44bcff', // summer_sky
    '#ff9900', // orange_peel
    '#14ae5c', // 조건충족
    '#ff5d47', // 매우나쁨
    '#c8f943', // seed_green
  ],
  '#4646D0': [
    '#4646d0', // 메인 파랑
    '#2196f3', // 밝은 파랑
    '#00bcd4', // 청록
    '#4caf50', // 녹색
    '#ff9800', // 주황
    '#9c27b0', // 보라
  ],
  '#EC7300': [
    '#ec7300', // 메인 주황
    '#ff5722', // 진한 주황
    '#ffc107', // 노랑
    '#8bc34a', // 연두
    '#607d8b', // 블루그레이
    '#e91e63', // 핑크
  ],
  '#43695B': [
    '#43695b', // 메인 녹색
    '#66bb6a', // 밝은 녹색
    '#26a69a', // 청록
    '#42a5f5', // 하늘색
    '#ab47bc', // 보라
    '#ff7043', // 주황
  ],
};

export const generateChartColors = (keyColor: string): string[] => {
  return COLOR_PALETTES[keyColor as keyof typeof COLOR_PALETTES] || COLOR_PALETTES['#6F36C9'];
};

export const COLORS = COLOR_PALETTES['#6F36C9'];

export const LEGEND_STYLE = {
  verticalAlign: 'top',
  align: 'right',
  wrapperStyle: { fontSize: 12, fontWeight: 500 },
} as LegendProps;
