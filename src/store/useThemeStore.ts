import { create } from 'zustand';
import { ThemeKey } from '../theme/theme';

interface ThemeState {
  themeKey: ThemeKey;
  themeMode: 'light' | 'dark' | 'system';
  setThemeKey: (key: ThemeKey) => void;
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  themeKey: 'midnight',
  themeMode: 'system',
  setThemeKey: (themeKey) => set({ themeKey }),
  setThemeMode: (themeMode) => set({ themeMode }),
}));
