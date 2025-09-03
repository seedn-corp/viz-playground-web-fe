type WidgetPosition = { x?: number; y?: number; width?: number; height?: number };
type WidgetItem = { position?: WidgetPosition };

const DEFAULT_WIDTH = 4;
const DEFAULT_HEIGHT = 8;
export const computeNextPosition = (widgets?: WidgetItem[]) => {
  if (!widgets || widgets.length === 0) {
    return { x: 0, y: 0, width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT };
  }

  let maxBottom = 0;
  for (const w of widgets) {
    const p = w && w.position ? w.position : {};
    const y = typeof p.y === 'number' ? p.y : 0;
    const height = typeof p.height === 'number' ? p.height : DEFAULT_HEIGHT;
    const bottom = y + height;
    if (bottom > maxBottom) maxBottom = bottom;
  }

  return { x: 0, y: maxBottom, width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT };
};
