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
}: ConfirmDeleteDialogProps) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onCancel}
      title="삭제하시겠어요?"
      size="sm"
      showClose={!disableClose}
      closeOnOverlay={!disableClose ? true : false}
      closeOnEsc={!disableClose}
      footer={
        <div css={confirmDeleteCss.actions}>
          <Button
            variant="secondary"
            display="inline"
            gutter="20px"
            radius="small"
            onClick={onCancel}
            disabled={isLoading}
          >
            취소
          </Button>
          <Button
            display="inline"
            gutter="20px"
            radius="small"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            삭제
          </Button>
        </div>
      }
    >
      <div css={confirmDeleteCss.body}>
        <Text size="body-medium">삭제 후에는 되돌릴 수 없습니다.</Text>
        <div css={confirmDeleteCss.hint}>이 작업은 취소할 수 없습니다.</div>
      </div>
    </Dialog>
  );
};
