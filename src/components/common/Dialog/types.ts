import type { ReactNode } from 'react';

export type DialogSize = 'sm' | 'md' | 'lg';

export type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  size?: DialogSize;
  showClose?: boolean;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  footer?: ReactNode;
  children: ReactNode;
};
