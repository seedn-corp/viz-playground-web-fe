import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const lastDashboardIdAtom = atom<string | null>(null);
export const sidebarPinnedAtom = atomWithStorage('sidebar_pinned', true);
