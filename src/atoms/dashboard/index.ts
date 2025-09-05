import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const lastDashboardIdAtom = atom<string | null>(null);
export const sidebarPinnedAtom = atomWithStorage('sidebar_pinned', true);
export const keyColorAtom = atomWithStorage('key_color', '#6F36C9');
export const colorHistoryAtom = atomWithStorage<string[]>('color_history', []);
