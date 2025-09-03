import { Route, Routes } from 'react-router';

import Chart from './pages/chart';
import { Home } from './pages/home';

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/chart" element={<Chart />} />
    </Routes>
  );
};
