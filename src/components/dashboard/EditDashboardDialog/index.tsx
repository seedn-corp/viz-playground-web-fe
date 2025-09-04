import { Button, Text } from '@basiln/design-system';
import { Flex, If, Spacing } from '@basiln/utils';
import { useEffect, useState } from 'react';

import { Dialog } from '@/components/common/Dialog';
import { useUpdateDashboard } from '@/hooks/mutation/dashboard/useUpdateDashboard';

import { editDialogCss } from './styles';
import type { EditDashboardDialogProps } from './types';

export const EditDashboardDialog = ({
  open,
  id,
  initialName,
  initialDescription,
  onClose,
}: EditDashboardDialogProps) => {
  const [name, setName] = useState(initialName);
  const [desc, setDesc] = useState(initialDescription ?? '');
  const [error, setError] = useState('');

  const updateMutation = useUpdateDashboard(id);

  useEffect(() => {
    if (open) {
      setName(initialName);
      setDesc(initialDescription ?? '');
      setError('');
    }
  }, [open, initialName, initialDescription]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('대시보드 이름을 입력해주세요.');
      return;
    }
    updateMutation.mutate(
      { name: name.trim(), description: desc.trim() === '' ? null : desc },
      { onSuccess: onClose },
    );
  };

  return (
    <Dialog
      isOpen={open}
      onClose={onClose}
      title="대시보드 수정"
      size="sm"
      footer={
        <Flex gap={10}>
          <Button
            type="button"
            variant="secondary"
            display="inline"
            gutter="20px"
            radius="small"
            onClick={onClose}
            disabled={updateMutation.isPending}
          >
            취소
          </Button>
          <Button
            type="submit"
            display="inline"
            gutter="20px"
            radius="small"
            isLoading={updateMutation.isPending}
            onClick={onSubmit}
          >
            저장
          </Button>
        </Flex>
      }
    >
      <form onSubmit={onSubmit}>
        <Flex direction="column" gap={12}>
          <div css={editDialogCss.row}>
            <Text size="body-medium">이름</Text>
            <Spacing size={6} />
            <input
              css={editDialogCss.input}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="대시보드 이름"
              disabled={updateMutation.isPending}
            />
          </div>

          <div css={editDialogCss.row}>
            <Text size="body-medium">설명</Text>
            <Spacing size={6} />
            <textarea
              css={editDialogCss.textarea}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="대시보드 설명 (선택)"
              disabled={updateMutation.isPending}
            />
          </div>

          <If condition={!!error}>
            <Text size="body-small" color="seedn_key">
              {error}
            </Text>
          </If>
        </Flex>
      </form>
    </Dialog>
  );
};
