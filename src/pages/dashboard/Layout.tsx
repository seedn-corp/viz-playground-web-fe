import { If } from '@basiln/utils';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
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
  const isPinned = useAtomValue(sidebarPinnedAtom);
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
