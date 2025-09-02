import { Route, Routes } from 'react-router';

import Chart from './pages/chart';
import { Home } from './pages/home';
import { WidgetTablePage } from './pages/widget-table';

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/chart" element={<Chart />} />
      <Route path="/table" element={<WidgetTablePage />} />
    </Routes>
  );
};
