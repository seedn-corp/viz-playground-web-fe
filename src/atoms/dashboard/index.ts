import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { Layout, Layouts } from 'react-grid-layout';

export type WidgetType = 'excel' | 'chart';

export interface Widget {
  id: string;
  type: WidgetType;
  props?: Record<string, unknown>;
}
export type BP = 'lg' | 'md' | 'sm' | 'xs' | 'xxs';

/** 반응형 그리드 설정 (원하면 cols를 더 촘촘하게: lg: 24 등) */
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

export const EMPTY_LAYOUTS: Layouts = {
  lg: [],
  md: [],
  sm: [],
  xs: [],
  xxs: [],
};

const DEFAULT_SIZE: Record<WidgetType, Pick<Layout, 'w' | 'h'>> = {
  excel: { w: 6, h: 8 },
  chart: { w: 6, h: 8 },
};

/** ---- 아톰: 이 두 개면 끝 ---- */
export const widgetsAtom = atomWithStorage<Widget[]>('dashboard_widgets_v1', []);
export const layoutsAtom = atomWithStorage<Layouts>('dashboard_layouts_v1', EMPTY_LAYOUTS);

/** ----- 배치 유틸: 그리드 첫-맞춤(First-Fit) 빈칸 찾기 ----- */
function firstFitPosition(layout: Layout[], cols: number, w: number, h: number) {
  const maxY = layout.reduce((m, l) => Math.max(m, l.y + l.h), 0);
  // occupancy[y][x] = true면 차있음
  const occupancy: boolean[][] = Array.from({ length: maxY }, () => Array(cols).fill(false));
  for (const l of layout) {
    for (let yy = l.y; yy < l.y + l.h; yy++) {
      if (!occupancy[yy]) occupancy[yy] = Array(cols).fill(false);
      for (let xx = l.x; xx < l.x + l.w; xx++) occupancy[yy][xx] = true;
    }
  }
  // 행(y) 위에서 아래로, 열(x) 좌->우 스캔하며 빈칸 찾기
  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= cols - w; x++) {
      let fits = true;
      for (let yy = y; yy < y + h && fits; yy++) {
        if (!occupancy[yy]) occupancy[yy] = Array(cols).fill(false);
        for (let xx = x; xx < x + w; xx++) {
          if (occupancy[yy][xx]) {
            fits = false;
            break;
          }
        }
      }
      if (fits) return { x, y };
    }
  }
  // 못 찾으면 맨 아래로
  return { x: 0, y: maxY };
}

export function nextLayoutsAfterAdd(cur: Layouts, id: string, type: WidgetType): Layouts {
  const size = DEFAULT_SIZE[type];
  const next: Layouts = { ...cur };
  (Object.keys(BREAKPOINTS) as BP[]).forEach((bp) => {
    const arr = next[bp] ?? [];
    const { x, y } = firstFitPosition(arr, COLS[bp], size.w, size.h);
    next[bp] = [...arr, { i: id, w: size.w, h: size.h, x, y }];
  });
  return next;
}

export function nextLayoutsAfterRemove(cur: Layouts, id: string): Layouts {
  const next: Layouts = { ...cur };
  (Object.keys(BREAKPOINTS) as BP[]).forEach((bp) => {
    next[bp] = (cur[bp] ?? []).filter((l) => l.i !== id);
  });
  return next;
}

export const lastDashboardIdAtom = atom<string | null>(null);
