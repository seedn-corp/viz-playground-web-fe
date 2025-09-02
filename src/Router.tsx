import { Route, Routes } from 'react-router';
import { Home } from './pages/home';
import Chart from './pages/chart';

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/chart" element={<Chart />} />
    </Routes>
  );
};
