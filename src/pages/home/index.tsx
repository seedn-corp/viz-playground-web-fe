import { Header } from "@/components/common/Header";
import { homeCss } from "@/pages/home/styles";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";

export const Home = () => {
  return (
    <div>
      <Header />
      <div css={homeCss.container}>
        <DashboardGrid />
      </div>
    </div>
  );
};
