import { If } from '@basiln/utils';
import type { PropsWithChildren } from 'react';

import { styles } from './styles';
import type { WidgetShellProps } from './types';

export const WidgetShell = ({ title, onRemove, children }: PropsWithChildren<WidgetShellProps>) => {
  return (
    <div css={styles.card}>
      <div className="widget-drag-handle" css={styles.header} title="Drag here">
        <div css={styles.titleRow}>
          <span css={styles.dragDot} />
          {title}
        </div>
        <If condition={!!onRemove}>
          <button css={styles.btn} onClick={onRemove} aria-label="remove widget">
            삭제
          </button>
        </If>
      </div>
      <div css={styles.body}>{children}</div>
    </div>
  );
};

export default WidgetShell;
