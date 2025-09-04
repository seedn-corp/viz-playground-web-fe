import { Choose } from '@basiln/utils';

import { TablePreview } from '@/components/widgets/TablePreview';
import { WidgetShell } from '@/components/widgets/WidgetShell';

import { WIDGET_META } from './constants';
import { styles } from './styles';
import type { WidgetSlotProps } from './types';

// 차트 연결전 임시 컴포넌트
const EmptyWidgetState = ({ widget }: { widget: WidgetSlotProps['widget'] }) => {
  const meta = WIDGET_META[widget.type] || { icon: '📊', label: widget.type };

  return (
    <div css={styles.emptyState}>
      <div css={styles.iconContainer}>{meta.icon}</div>
      <div css={styles.title}>{meta.label}</div>
      <div css={styles.badge}>준비 중</div>
    </div>
  );
};

export const WidgetSlot = ({ widget, onRemove, onEdit }: WidgetSlotProps) => {
  return (
    <Choose>
      <Choose.When condition={widget.type === 'table'}>
        <WidgetShell title={widget.name} onRemove={onRemove} onEdit={onEdit}>
          <TablePreview processed_data={widget.processed_data} config={widget.config} />
        </WidgetShell>
      </Choose.When>
      {/* TODO: 차트 연결 */}
      {/* <Choose.When>

      </Choose.When> */}
      <Choose.Otherwise>
        <WidgetShell title={widget.name || `${widget.type} 위젯`} onRemove={onRemove} onEdit={onEdit}>
          <EmptyWidgetState widget={widget} />
        </WidgetShell>
      </Choose.Otherwise>
    </Choose>
  );
};
