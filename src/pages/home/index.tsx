import { useState } from "react";
import { Header } from "@/components/common/Header";
import { homeCss } from "@/pages/home/styles";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { WidgetAddDialog } from "@/components/common/WidgetAddDialog";

export const Home = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddWidget = (widgetType: "chart" | "table") => {
    console.log("위젯 추가:", widgetType);
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
