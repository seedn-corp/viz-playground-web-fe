import { If } from '@basiln/utils';
import { GripVertical, Trash2, Edit3 } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import { styles } from './styles';
import type { WidgetShellProps } from './types';

export const WidgetShell = ({ title, onRemove, onEdit, children }: PropsWithChildren<WidgetShellProps>) => {
  return (
    <div css={styles.card}>
      <div css={styles.header}>
        <div className="widget-drag-handle" css={styles.dragArea} title="Drag to move">
          <GripVertical size={16} css={styles.gripIcon} />
        </div>
        <div css={styles.titleSection}>
          <h3 css={styles.title}>{title}</h3>
        </div>
        <div css={styles.actions}>
          <If condition={!!onEdit}>
            <button
              css={styles.editBtn}
              onClick={onEdit}
              aria-label="edit widget"
              title="위젯 수정"
            >
              <Edit3 size={14} />
            </button>
          </If>
          <If condition={!!onRemove}>
            <button
              css={styles.deleteBtn}
              onClick={onRemove}
              aria-label="remove widget"
              title="위젯 삭제"
            >
              <Trash2 size={14} />
            </button>
          </If>
        </div>
      </div>
      <div css={styles.body}>{children}</div>
    </div>
  );
};

export default WidgetShell;
