import { css } from '@emotion/react';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { Header } from '@/components/common/Header';
import { WidgetAddDialog } from '@/components/common/WidgetAddDialog';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';

const layoutCss = {
  wrap: css({
    display: 'flex',
    minHeight: '100vh',
    background: '#fff',
  }),
  main: css({
    marginTop: 60,
    flex: 1,
    padding: 16,
  }),
};

export const DashboardLayout = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
        <DashboardSidebar />
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
