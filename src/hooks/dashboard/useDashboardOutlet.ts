import { useOutletContext } from 'react-router';

import type { DashboardOutletContext } from '@/pages/dashboard/types';

export const useDashboardOutlet = () => useOutletContext<DashboardOutletContext>();
