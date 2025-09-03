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
} from '@/atoms/dashboard';
import { WidgetSlot } from '@/components/widgets/WidgetSlot';

import { styles } from './styles';
import type { DashboardGridProps } from './types';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const DashboardGrid = ({ onOpenDialog }: DashboardGridProps) => {
  const [layouts, setLayouts] = useAtom(layoutsAtom);
  const widgets = useAtomValue(widgetsAtom);
  const setWidgets = useSetAtom(widgetsAtom);

  const handleRemove = (id: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
    setLayouts((prev) => nextLayoutsAfterRemove(prev, id));
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
          <div key={w.id}>
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
