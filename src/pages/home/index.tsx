import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Header } from '@/components/common/Header';
import { WidgetAddDialog } from '@/components/common/WidgetAddDialog';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid';
import { homeCss } from '@/pages/home/styles';

export const Home = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();

  const handleAddWidget = (widgetType: 'chart' | 'table') => {
    if (widgetType === 'chart') {
      navigate('/chart');
    }
    console.log('위젯 추가:', widgetType);
    // TODO: 실제 위젯 추가 로직 구현
  };

  return (
    <div>
      <Header onOpenDialog={() => setIsDialogOpen(true)} />
      <div css={homeCss.container}>
        <DashboardGrid onOpenDialog={() => setIsDialogOpen(true)} />
      </div>

      <WidgetAddDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAddWidget={handleAddWidget}
      />
    </div>
  );
};
