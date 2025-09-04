export type BP = 'lg' | 'md' | 'sm' | 'xs' | 'xxs';

export const BREAKPOINTS: Record<BP, number> = {
  lg: 1200,
  md: 996,
  sm: 768,
  xs: 480,
  xxs: 0,
};
export const COLS: Record<BP, number> = {
  lg: 12,
  md: 10,
  sm: 8,
  xs: 6,
  xxs: 4,
};
