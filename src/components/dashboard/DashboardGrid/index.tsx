import { Button, Text } from '@basiln/design-system';
import { Flex, If, Spacing } from '@basiln/utils';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import {
  widgetsAtom,
  layoutsAtom,
  BREAKPOINTS,
  COLS,
  nextLayoutsAfterRemove,
  type Widget,
} from '@/atoms/dashboard';
import { WidgetSlot } from '@/components/widgets/WidgetSlot';

import { styles } from './styles';
import type { DashboardGridProps } from './types';
import { useLocation, useNavigate } from 'react-router';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const DashboardGrid = ({ onOpenDialog }: DashboardGridProps) => {
  const [layouts, setLayouts] = useAtom(layoutsAtom);
  const widgets = useAtomValue(widgetsAtom);
  const setWidgets = useSetAtom(widgetsAtom);

  const handleRemove = (id: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
    setLayouts((prev) => nextLayoutsAfterRemove(prev, id));
  };

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dashboardId = pathname.split('/')[2];

  const handleClickWidget = (widget: Widget) => {
    const type = widget.type === 'excel' ? 'table' : widget.type;
    const storageKey = `${dashboardId.slice(0, 8)}-${widget.id.slice(0, 8)}`;
    // 위젯 수정 페이지로 이동
    navigate(`/${type}/${storageKey}`);

    localStorage.setItem(
      storageKey,
      JSON.stringify({
        dashboardId,
        widgetId: widget.id,
      }),
    );
  };

  return (
    <div css={styles.grid}>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={BREAKPOINTS}
        cols={COLS}
        rowHeight={8}
        margin={[12, 12]}
        containerPadding={[0, 0]}
        compactType="vertical"
        isBounded
        draggableHandle=".widget-drag-handle"
        onLayoutChange={(_cur, all) => setLayouts(all)}
      >
        {widgets.map((w) => (
          <div key={w.id} onClick={() => handleClickWidget(w)}>
            <WidgetSlot type={w.type} props={w.props} onRemove={() => handleRemove(w.id)} />
          </div>
        ))}
      </ResponsiveGridLayout>

      <If condition={widgets.length === 0}>
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
};
