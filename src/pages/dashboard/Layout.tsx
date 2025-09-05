import { If } from '@basiln/utils';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { sidebarPinnedAtom } from '@/atoms/dashboard';
import { Header } from '@/components/common/Header';
import { WidgetAddDialog } from '@/components/common/WidgetAddDialog';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { EditDashboardDialog } from '@/components/dashboard/EditDashboardDialog';

import { layoutCss } from './styles';

export const DashboardLayout = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [isPinned, setIsPinned] = useAtom(sidebarPinnedAtom);
  const navigate = useNavigate();

  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<{
    id: string;
    name: string;
    description: string | null;
  } | null>(null);

  const openWidgetDialog = () => setIsDialogOpen(true);
  const closeWidgetDialog = () => setIsDialogOpen(false);

  const { pathname } = useLocation();
  const dashboardId = pathname.split('/')[2];

  const handleAddWidget = (widgetType: 'chart' | 'table') => {
    navigate(`/${widgetType}/${dashboardId}`);
    closeWidgetDialog();
  };

  const handleRequestEdit = (target: { id: string; name: string; description: string | null }) => {
    setEditing(target);
    setEditOpen(true);
  };

  const closeEdit = () => {
    setEditOpen(false);
    setEditing(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'b') {
        event.preventDefault();
        setIsPinned((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setIsPinned]);

  return (
    <>
      <Header onOpenDialog={openWidgetDialog} />

      <div css={layoutCss.wrap}>
        <If condition={!isPinned}>
          <div css={layoutCss.hoverZone} onMouseEnter={() => setIsSidebarHovered(true)} />
        </If>

        <div
          css={layoutCss.sidebarContainer(isSidebarHovered, isPinned)}
          onMouseEnter={() => !isPinned && setIsSidebarHovered(true)}
          onMouseLeave={() => !isPinned && setIsSidebarHovered(false)}
        >
          <DashboardSidebar onRequestEdit={handleRequestEdit} />
        </div>

        <main css={layoutCss.main}>
          <Outlet context={{ openWidgetDialog }} />
        </main>
      </div>

      <WidgetAddDialog
        isOpen={isDialogOpen}
        onClose={closeWidgetDialog}
        onAddWidget={handleAddWidget}
      />

      {editing && (
        <EditDashboardDialog
          mode="edit"
          open={editOpen}
          id={editing.id}
          initialName={editing.name}
          initialDescription={editing.description}
          onClose={closeEdit}
        />
      )}
    </>
  );
};
