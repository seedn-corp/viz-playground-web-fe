import { Text } from '@basiln/design-system';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { dialogCss } from './styles';
import type { DialogProps } from './types';

export const Dialog = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  showClose = true,
  closeOnOverlay = false,
  closeOnEsc = true,
  footer,
  children,
}: DialogProps) => {
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const content = (
    <div
      css={dialogCss.overlay}
      onClick={() => closeOnOverlay && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div css={dialogCss.dialog(size)} onClick={(e) => e.stopPropagation()}>
        {(title || showClose) && (
          <div css={dialogCss.header}>
            <div css={dialogCss.title}>
              {typeof title === 'string' ? <Text size="sub-medium">{title}</Text> : title}
            </div>
          </div>
        )}
        <div css={dialogCss.body}>{children}</div>
        {footer && <div css={dialogCss.footer}>{footer}</div>}
      </div>
    </div>
  );

  return createPortal(content, document.body);
};
