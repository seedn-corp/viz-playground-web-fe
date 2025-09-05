import { Button } from '@basiln/design-system';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useRef, useState } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';

import { BREAKPOINTS, COLS } from '@/components/dashboard/DashboardGrid/constants';
import type { DashboardWidget } from '@/types/dashboard';
import type { WidgetDetailResponse } from '@/types/widgets';

import { WidgetSlot } from './WidgetSlot';

const ResponsiveGridLayout = WidthProvider(Responsive);

type Widget = {
  id: string;
  name: string;
  type: WidgetDetailResponse['type'];
  position: { x: number; y: number; width: number; height: number };
  processed_data: string;
  config: string;
};

type Page = { id: string; name: string; widgets: Widget[] };
// UI style tokens (simple, inline for now)
const ui = {
  sidebar: {
    width: 320,
    borderRight: '1px solid #eee',
    padding: 16,
    overflow: 'auto' as const,
    background: '#fafafa',
  },
  header: { margin: '0 0 12px 0', fontSize: 16, fontWeight: 600 },
  widgetCard: {
    minHeight: 84,
  },
  previewArea: { height: 88, overflow: 'hidden' as const, marginBottom: 8 },
  addButton: {
    padding: '6px 10px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
  pageButton: {
    padding: '6px 10px',
    borderRadius: 6,
    border: '1px solid #e6e6e6',
    background: '#fff',
    cursor: 'pointer',
  },
  pageContainer: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 },
  exportButton: {
    padding: '8px 12px',
    background: '#059669',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
  canvas: {
    margin: '12px auto',
    background: '#fff',
    padding: 16,
    boxShadow: '0 6px 18px rgba(15,23,42,0.08)',
    borderRadius: 6,
  },
  widgetHandle: {
    background: '#f3f4f6',
    padding: 8,
    cursor: 'move',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  removeButton: { background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' },
};

export const EditorPage: React.FC<{ availableWidgets?: WidgetDetailResponse[] }> = ({
  availableWidgets = [],
}) => {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  // mm -> px helper using device DPI
  const mmToPx = (mm: number, dpi = 96) => Math.round((mm / 25.4) * dpi);
  const deviceDpi =
    typeof window !== 'undefined' && window.devicePixelRatio ? 96 * window.devicePixelRatio : 96;
  const a4WidthPx = mmToPx(210, deviceDpi);
  const a4HeightPx = mmToPx(297, deviceDpi);

  const [pages, setPages] = useState<Page[]>([{ id: 'page-1', name: 'Page 1', widgets: [] }]);
  const [activePageIndex, setActivePageIndex] = useState(0);

  const addWidgetToPage = (widgetDetail: WidgetDetailResponse) => {
    // unique instance id to avoid duplicate React keys
    const uniqueId = `${widgetDetail.id}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const newWidget: Widget = {
      id: uniqueId,
      name: widgetDetail.name,
      type: widgetDetail.type,
      position: { x: 0, y: 0, width: 6, height: 20 },
      processed_data: widgetDetail.processed_data ?? '',
      config: widgetDetail.config ?? '',
    };

    console.debug('[Editor] Adding widget instance', uniqueId, 'from', widgetDetail.id);
    setPages((p) => {
      const copy = [...p];
      copy[activePageIndex] = {
        ...copy[activePageIndex],
        widgets: [...copy[activePageIndex].widgets, newWidget],
      };
      return copy;
    });
  };

  const removeWidget = (widgetId: string) => {
    setPages((p) => {
      const copy = [...p];
      copy[activePageIndex] = {
        ...copy[activePageIndex],
        widgets: copy[activePageIndex].widgets.filter((w) => w.id !== widgetId),
      };
      return copy;
    });
  };

  const addPage = () =>
    setPages((p) => [
      ...p,
      { id: `page-${p.length + 1}`, name: `Page ${p.length + 1}`, widgets: [] },
    ]);

  const removePage = (index: number) => {
    setPages((p) => {
      if (p.length === 1) return p;
      const copy = p.filter((_, i) => i !== index);
      setActivePageIndex((prev) =>
        Math.max(0, Math.min(copy.length - 1, prev === index ? prev - 1 : prev)),
      );
      return copy;
    });
  };

  const exportActivePageToPdf = async () => {
    if (!canvasRef.current) return;

    const canvas = await html2canvas(canvasRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgRatio = canvas.width / canvas.height;
    let imgWidth = pageWidth;
    let imgHeight = pageWidth / imgRatio;
    if (imgHeight > pageHeight) {
      imgHeight = pageHeight;
      imgWidth = pageHeight * imgRatio;
    }

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`${pages[activePageIndex].name || 'page'}.pdf`);
  };

  const activePage = pages[activePageIndex];

  const convertedLayouts = React.useMemo(() => {
    if (!availableWidgets || availableWidgets.length === 0) {
      return {
        lg: [],
        md: [],
        sm: [],
        xs: [],
        xxs: [],
      };
    }

    // widgets가 있을 때는 완전히 위젯의 position 데이터만 사용
    const newLayouts: Record<
      string,
      Array<{
        i: string;
        x: number;
        y: number;
        w: number;
        h: number;
      }>
    > = {};

    Object.keys(BREAKPOINTS).forEach((breakpoint) => {
      const bp = breakpoint as keyof typeof BREAKPOINTS;
      newLayouts[bp] = availableWidgets.map((widget: DashboardWidget) => ({
        i: widget.id,
        x: widget.position.x,
        y: widget.position.y,
        w: widget.position.width,
        h: widget.position.height,
      }));
    });

    return newLayouts;
  }, [availableWidgets]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ display: 'flex' }}>
        <div style={{ ...ui.sidebar, width: 160, padding: 12 }}>
          <Button
            display="inline"
            gutter="10px"
            size="regular-1"
            radius="small"
            variant="stroke"
            onClick={addPage}
          >
            Add Page
          </Button>

          <ul>
            {pages.map((p, idx) => (
              <li
                key={p.id}
                style={{
                  display: 'flex',
                  gap: 8,
                  alignItems: 'center',
                  marginBottom: 8,
                  backgroundColor: idx === activePageIndex ? '#eef' : 'transparent',
                }}
              >
                <button onClick={() => setActivePageIndex(idx)} style={{ flex: 1 }}>
                  {p.name}
                </button>
                <button onClick={() => removePage(idx)}>Del</button>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ ...ui.sidebar, width: 300, padding: 12 }}>
          {availableWidgets.length === 0 && (
            <div style={{ color: '#666' }}>위젯을 먼저 추가해주세요</div>
          )}

          {availableWidgets.map((widget) => (
            <div style={{ height: 300, marginBottom: 12, position: 'relative' }} key={widget.id}>
              <WidgetSlot
                widget={{
                  id: widget.id,
                  dashboard_id: '',
                  name: widget.name,
                  type: widget.type,
                  processed_data: widget.processed_data,
                  config: widget.config,
                  position: widget.position,
                  created_at: '',
                  updated_at: '',
                }}
                onRemove={() => removeWidget(widget.id)}
                onEdit={() => {}}
              />
              <button
                style={{ ...ui.addButton, position: 'absolute', top: 8, right: 8 }}
                onClick={() => addWidgetToPage(widget)}
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </aside>

      <main style={{ flex: 1, padding: 16, overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
          <button style={ui.exportButton} onClick={exportActivePageToPdf}>
            Export A4 PDF
          </button>
        </div>

        <div
          ref={canvasRef}
          style={{
            width: a4WidthPx,
            minHeight: a4HeightPx,
            ...ui.canvas,
          }}
        >
          <ResponsiveGridLayout
            className="layout"
            layouts={convertedLayouts}
            breakpoints={BREAKPOINTS}
            cols={COLS}
            rowHeight={8}
            margin={[12, 12]}
            containerPadding={[0, 0]}
            compactType="vertical"
            isBounded
            isDraggable
            isResizable
            draggableHandle=".widget-drag-handle"
            onLayoutChange={(cur: Layout[]) => {
              setPages((p) => {
                const copy = [...p];
                cur.forEach((layout) => {
                  const widget = copy[activePageIndex].widgets.find((w) => w.id === layout.i);
                  if (widget)
                    widget.position = {
                      x: layout.x,
                      y: layout.y,
                      width: layout.w,
                      height: layout.h,
                    };
                });
                return copy;
              });
            }}
          >
            {activePage.widgets.map((w) => {
              return (
                <div key={w.id} style={{ ...ui.widgetCard }}>
                  <WidgetSlot
                    widget={{
                      id: w.id,
                      dashboard_id: '',
                      name: w.name,
                      type: w.type,
                      processed_data: w.processed_data,
                      config: w.config,
                      position: w.position,
                      created_at: '',
                      updated_at: '',
                    }}
                    onRemove={() => removeWidget(w.id)}
                    onEdit={() => {}}
                  />
                </div>
              );
            })}
          </ResponsiveGridLayout>
        </div>
      </main>
    </div>
  );
};
