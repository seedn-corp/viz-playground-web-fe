import { Button, Text } from '@basiln/design-system';
import { Flex, If, Spacing } from '@basiln/utils';
import { useEffect, useState } from 'react';

import { Dialog } from '@/components/common/Dialog';
import { useCreateDashboard } from '@/hooks/mutation/dashboard/useCreateDashboard';
import { useUpdateDashboard } from '@/hooks/mutation/dashboard/useUpdateDashboard';

import { editDialogCss } from './styles';
import type { EditDashboardDialogProps } from './types';

export const EditDashboardDialog = (props: EditDashboardDialogProps) => {
  const { open, onClose } = props;
  const isEdit = props.mode === 'edit';

  const [name, setName] = useState(isEdit ? props.initialName : props.initialName ?? '');
  const [desc, setDesc] = useState(
    isEdit ? props.initialDescription ?? '' : props.initialDescription ?? '',
  );
  const [error, setError] = useState('');

  const createMutation = useCreateDashboard();
  const updateMutation = useUpdateDashboard(isEdit ? props.id : '');

  const isPending = isEdit ? updateMutation.isPending : createMutation.isPending;

  useEffect(() => {
    if (open) {
      if (isEdit) {
        setName(props.initialName);
        setDesc(props.initialDescription ?? '');
      } else {
        setName(props.initialName ?? '');
        setDesc(props.initialDescription ?? '');
      }
      setError('');
    }
  }, [
    open,
    isEdit,
    isEdit ? props.initialName : props.initialName,
    isEdit ? props.initialDescription : props.initialDescription,
  ]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = name.trim();

    if (!trimmed) {
      setError('대시보드 이름을 입력해주세요.');
      return;
    }

    const descTrimmed = desc.trim();

    if (isEdit) {
      const updatePayload = {
        name: trimmed,
        description: descTrimmed === '' ? null : descTrimmed,
      };

      updateMutation.mutate(updatePayload, {
        onSuccess: () => {
          props.onUpdated?.();
          onClose();
        },
      });
    } else {
      const createPayload =
        descTrimmed === '' ? { name: trimmed } : { name: trimmed, description: descTrimmed };

      createMutation.mutate(createPayload, {
        onSuccess: (res) => {
          const newId = ('dashboard' in res ? res.dashboard : undefined)?.id ?? res.dashboard?.id;
          if (newId) props.onCreated?.({ id: newId, name: trimmed });
          onClose();
        },
      });
    }
  };

  return (
    <Dialog
      isOpen={open}
      onClose={onClose}
      title={isEdit ? '대시보드 수정' : '새 대시보드 만들기'}
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
            disabled={isPending}
          >
            취소
          </Button>
          <Button
            type="submit"
            display="inline"
            gutter="20px"
            radius="small"
            isLoading={isPending}
            onClick={onSubmit}
          >
            {isEdit ? '저장' : '생성'}
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
              disabled={isPending}
              autoFocus
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
              disabled={isPending}
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
