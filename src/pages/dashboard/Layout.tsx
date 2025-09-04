import { If } from '@basiln/utils';
import { css } from '@emotion/react';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { sidebarPinnedAtom } from '@/atoms/dashboard';
import { Header } from '@/components/common/Header';
import { WidgetAddDialog } from '@/components/common/WidgetAddDialog';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Z_INDEX } from '@/constants';

const layoutCss = {
  wrap: css({
    display: 'flex',
    minHeight: '100vh',
    background: '#fff',
    position: 'relative',
  }),
  main: () =>
    css({
      marginTop: 60,
      flex: 1,
      padding: 16,
    }),
  sidebarContainer: (isHovered: boolean, isPinned: boolean) =>
    css({
      position: isPinned ? 'static' : 'fixed',
      top: isPinned ? 'auto' : 60,
      left: isPinned ? 0 : isHovered ? 0 : '-260px',
      zIndex: isPinned ? 'auto' : Z_INDEX.SIDEBAR,
      transition: 'left 0.3s ease',
    }),
  hoverZone: css({
    position: 'fixed',
    left: 0,
    top: 60,
    width: 20,
    height: 'calc(100vh - 60px)',
    zIndex: Z_INDEX.SIDEBAR_HOVER_ZONE,
    background: 'transparent',
  }),
};

export const DashboardLayout = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const isPinned = useAtomValue(sidebarPinnedAtom);

  const openWidgetDialog = () => setIsDialogOpen(true);
  const closeWidgetDialog = () => setIsDialogOpen(false);
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const dashboardId = pathname.split('/')[2];

  const handleAddWidget = (widgetType: 'chart' | 'table') => {
    navigate(`/${widgetType}/${dashboardId}`);
    closeWidgetDialog();
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
          <DashboardSidebar />
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
    </>
  );
};
