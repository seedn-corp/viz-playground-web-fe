import { Button, Text } from '@basiln/design-system';

import { Dialog } from '@/components/common/Dialog';

import { confirmDeleteCss } from './styles';
import type { ConfirmDeleteDialogProps } from './types';

export const ConfirmDeleteDialog = ({
  isOpen,
  onConfirm,
  onCancel,
  isLoading = false,
  disableClose = true,
  titleText = '삭제하시겠습니까?',
  descriptionText = '삭제 후에는 복구할 수 없습니다.',
  confirmLabel = '삭제',
  cancelLabel = '취소',
}: ConfirmDeleteDialogProps) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onCancel}
      title={<Text size="title-regular">{titleText}</Text>}
      size="sm"
      showClose={!disableClose}
      closeOnOverlay={!disableClose}
      closeOnEsc={!disableClose}
      footer={
        <div css={confirmDeleteCss.actions}>
          <Button
            variant="stroke"
            display="inline"
            gutter="50px"
            radius="small"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            display="inline"
            gutter="50px"
            radius="small"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      }
    >
      <div css={confirmDeleteCss.body}>
        <Text size="sub-small">{descriptionText}</Text>
      </div>
    </Dialog>
  );
};
