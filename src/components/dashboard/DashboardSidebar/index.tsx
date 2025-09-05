import { Button, IconButton, Spinner, Text } from '@basiln/design-system';
import { Flex, If, Spacing } from '@basiln/utils';
import { useTheme } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { Pin, PinOff, Trash2, FilePenLine } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { lastDashboardIdAtom, sidebarPinnedAtom } from '@/atoms/dashboard';
import { ConfirmDeleteDialog } from '@/components/common/ConfirmDeleteDialog';
import { useCreateDashboard } from '@/hooks/mutation/dashboard/useCreateDashboard';
import { useDeleteDashboard } from '@/hooks/mutation/dashboard/useDeleteDashboard';
import { dashboardQueries } from '@/queries/dashboard';

import { sidebarCss } from './styles';
import type { DashboardSidebarProps } from './types';

export const DashboardSidebar = ({ onRequestEdit }: DashboardSidebarProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id: activeId } = useParams<{ id: string }>();

  const { data: dashboards, isLoading } = useQuery(dashboardQueries.list());
  const createMutation = useCreateDashboard();
  const deleteMutation = useDeleteDashboard();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState<{ id: string; name: string } | null>(null);

  const setLastId = useSetAtom(lastDashboardIdAtom);
  const [isPinned, setIsPinned] = useAtom(sidebarPinnedAtom);

  const items = useMemo(() => dashboards ?? [], [dashboards]);
  const hasDashboards = items.length > 0;

  const showInitialLoading = !dashboards && isLoading;
  const isMutating = createMutation.isPending || deleteMutation.isPending;

  const onCreate = () => {
    createMutation.mutate(
      { name: '새로운 대시보드' },
      {
        onSuccess: (res) => {
          const newId = ('dashboard' in res ? res.dashboard : undefined)?.id ?? res.dashboard?.id;
          if (newId) {
            setLastId(newId);
            navigate(`/dashboards/${newId}`);
          }
        },
      },
    );
  };

  const openDeleteConfirm = (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    setConfirmTarget({ id, name });
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!confirmTarget) return;

    const { id } = confirmTarget;

    const idx = items.findIndex((d) => d.id === id);
    const nextIdCandidate = items[idx + 1]?.id ?? items[idx - 1]?.id ?? null;

    setDeletingId(id);
    deleteMutation.mutate(id, {
      onSuccess: () => {
        if (activeId === id) {
          if (nextIdCandidate) {
            setLastId(nextIdCandidate);
            navigate(`/dashboards/${nextIdCandidate}`);
          } else {
            setLastId(null);
            navigate('/dashboards');
          }
        }
      },
      onSettled: () => {
        setDeletingId(null);
        setConfirmOpen(false);
        setConfirmTarget(null);
      },
    });
  };

  const onEdit = (
    e: React.MouseEvent,
    d: { id: string; name: string; description: string | null },
  ) => {
    e.stopPropagation();
    onRequestEdit(d);
  };

  return (
    <aside css={sidebarCss.wrap}>
      <div css={sidebarCss.header()}>
        <div css={sidebarCss.titleRow()}>
          <Text size="title-regular">대시보드 리스트</Text>
          <IconButton
            variant="ghost"
            size="small"
            icon={isPinned ? <Pin size={16} /> : <PinOff size={16} />}
            onClick={() => setIsPinned(!isPinned)}
            title={isPinned ? '사이드바 고정 해제 (⌘B)' : '사이드바 고정 (⌘B)'}
            disabled={isMutating}
          />
        </div>

        <Spacing size={5} />

        <Button
          size="regular-2"
          radius="small"
          onClick={onCreate}
          isLoading={createMutation.isPending}
          disabled={isMutating}
        >
          + 새로 만들기
        </Button>
      </div>

      <If condition={showInitialLoading || isMutating}>
        <Spacing size={300} />
        <Flex>
          <Spinner color="seedn_key" />
        </Flex>
      </If>

      <If condition={!showInitialLoading && !isMutating && !hasDashboards}>
        <div css={sidebarCss.empty}>아직 대시보드가 없습니다.</div>
      </If>

      <If condition={!showInitialLoading && !isMutating && hasDashboards}>
        <div css={sidebarCss.list}>
          {items.map((d) => (
            <div
              key={d.id}
              css={sidebarCss.item(d.id === activeId)}
              onClick={() => {
                setLastId(d.id);
                navigate(`/dashboards/${d.id}`);
              }}
              role="button"
              aria-label={`open-dashboard-${d.name}`}
            >
              <Text size="body-medium">{d.name}</Text>

              <Flex gap={2}>
                <IconButton
                  variant="ghost"
                  size="small"
                  icon={<FilePenLine color={theme.colors.gray_060} />}
                  onClick={(e) =>
                    onEdit(e, { id: d.id, name: d.name, description: d.description ?? null })
                  }
                  title="대시보드 수정"
                  disabled={isMutating}
                />
                <IconButton
                  variant="ghost"
                  size="small"
                  icon={<Trash2 color={theme.colors.gray_060} />}
                  onClick={(e) => openDeleteConfirm(e, d.id, d.name)}
                  disabled={isMutating || (deletingId === d.id && deleteMutation.isPending)}
                  title="대시보드 삭제"
                />
              </Flex>
            </div>
          ))}
        </div>
      </If>

      <ConfirmDeleteDialog
        isOpen={confirmOpen}
        onCancel={() => !deleteMutation.isPending && setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={deleteMutation.isPending}
      />
    </aside>
  );
};
