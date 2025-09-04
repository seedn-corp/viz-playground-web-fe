import { Button, Text } from '@basiln/design-system';
import { Flex, If, Spacing, Choose } from '@basiln/utils';
import { useQuery } from '@tanstack/react-query';
import { Edit3, Check, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useParams, useLocation, useNavigate } from 'react-router';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { BREAKPOINTS, COLS } from '@/atoms/dashboard';
import { WidgetSlot } from '@/components/widgets/WidgetSlot';
import { useUpdateWidget } from '@/hooks/mutation/widgets/useUpdateWidget';
import { widgetsQueries } from '@/queries/widgets';
import type { WidgetDetailResponse } from '@/types/widgets';

import { styles } from './styles';
import type { DashboardGridProps } from './types';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const DashboardGrid = ({ onOpenDialog, renderEditModeControls }: DashboardGridProps) => {
  const { id = '' } = useParams();
  const { data: widgets } = useQuery(widgetsQueries.all(id));
  const { mutate: updateWidget } = useUpdateWidget();

  const [isEditMode, setIsEditMode] = useState(false);
  const [pendingUpdates, setPendingUpdates] = useState<
    Record<string, { x: number; y: number; width: number; height: number }>
  >({});

  const isInitialRender = useRef(true);

  const convertedLayouts = React.useMemo(() => {
    if (!widgets || widgets.length === 0) {
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
      newLayouts[bp] = widgets.map((widget: WidgetDetailResponse) => ({
        i: widget.id,
        x: widget.position.x,
        y: widget.position.y,
        w: widget.position.width,
        h: widget.position.height,
      }));
    });

    return newLayouts;
  }, [widgets]);

  const handleEditToggle = () => {
    if (isEditMode) {
      // 편집 완료 - 변경사항을 API로 저장
      Object.entries(pendingUpdates).forEach(([widgetId, position]) => {
        updateWidget({
          id: widgetId,
          position,
        });
      });
      setPendingUpdates({});
    }
    setIsEditMode(!isEditMode);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setPendingUpdates({});
  };

  const handleRemove = (id: string) => {
    console.log('Remove widget:', id);
  };

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dashboardId = pathname.split('/')[2];

  const handleEdit = (id: string) => {
    const widget = widgets?.find((w) => w.id === id);
    if (!widget) return;

    const widgetType = widget.type === 'table' ? widget.type : 'chart';
    const storageKey = `${dashboardId.slice(0, 8)}-${widget.id.slice(0, 8)}`;

    // 위젯 수정 페이지로 이동
    navigate(`/${widgetType}/${storageKey}`);

    localStorage.setItem(
      storageKey,
      JSON.stringify({
        dashboardId,
        widgetId: widget.id,
      }),
    );
  };

  if (widgets) {
    return (
      <div css={styles.grid}>
        <If condition={widgets && widgets.length > 0}>
          <Choose>
            <Choose.When condition={!!renderEditModeControls}>
              {renderEditModeControls?.({
                isEditMode,
                pendingChanges: Object.keys(pendingUpdates).length,
                onEditToggle: handleEditToggle,
                onCancelEdit: handleCancelEdit,
              })}
            </Choose.When>
            <Choose.Otherwise>
              <div css={styles.editControls}>
                <If condition={isEditMode}>
                  <button css={styles.cancelBtn} onClick={handleCancelEdit} title="편집 취소">
                    <X size={18} />
                  </button>
                </If>
                <button
                  css={[styles.editBtn, isEditMode ? styles.editBtnActive : styles.editBtnInactive]}
                  onClick={handleEditToggle}
                  title={isEditMode ? '편집 완료' : '편집 모드'}
                >
                  <Choose>
                    <Choose.When condition={isEditMode}>
                      <Check size={16} />
                    </Choose.When>
                    <Choose.Otherwise>
                      <Edit3 size={16} />
                    </Choose.Otherwise>
                  </Choose>
                  <If condition={isEditMode && Object.keys(pendingUpdates).length > 0}>
                    <span>{Object.keys(pendingUpdates).length}</span>
                  </If>
                </button>
              </div>
            </Choose.Otherwise>
          </Choose>
        </If>

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
          isDraggable={isEditMode}
          isResizable={isEditMode}
          draggableHandle=".widget-drag-handle"
          onLayoutChange={(currentLayout) => {
            // 초기 렌더링에서는 처리 안
            if (isInitialRender.current) {
              isInitialRender.current = false;
              return;
            }

            // 편집 모드일 때만 변경사항을 pendingUpdates에 저장
            if (isEditMode) {
              const newUpdates = { ...pendingUpdates };

              currentLayout.forEach((layout) => {
                const widget = widgets?.find((w) => w.id === layout.i);
                if (widget) {
                  const hasChanged =
                    widget.position.x !== layout.x ||
                    widget.position.y !== layout.y ||
                    widget.position.width !== layout.w ||
                    widget.position.height !== layout.h;

                  if (hasChanged) {
                    newUpdates[widget.id] = {
                      x: layout.x,
                      y: layout.y,
                      width: layout.w,
                      height: layout.h,
                    };
                  }
                }
              });

              setPendingUpdates(newUpdates);
            }
          }}
        >
          {widgets?.map((widget) => (
            <div key={widget.id}>
              <WidgetSlot
                widget={widget}
                onRemove={() => handleRemove(widget.id)}
                onEdit={() => handleEdit(widget.id)}
              />
            </div>
          ))}
        </ResponsiveGridLayout>

        <If condition={widgets?.length === 0}>
          <Spacing size={200} />
          <Flex direction="column" gap={15}>
            <Text size="sub-regular" color="gray_060">
              위젯을 추가해주세요
            </Text>
            <Text size="body-large" color="gray_060">
              차트나 테이블 위젯을 추가하여 대시보드를 구성할 수 있습니다.
            </Text>
            <Button
              display="inline"
              size="regular-2"
              gutter="20px"
              radius="small"
              onClick={onOpenDialog}
            >
              + 첫 번째 위젯 추가하기
            </Button>
          </Flex>
        </If>
      </div>
    );
  }
};
