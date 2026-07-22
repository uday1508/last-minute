import { create } from 'zustand';
import { ThemeKey, ThemeColors } from '../theme/theme';

export type ScreenId = 'home' | 'theme' | 'profile';
export type BackgroundMode = 'solid' | 'picture' | 'video';

export interface BackgroundConfig {
  mode: BackgroundMode;
  pictureUri: string; // Preset key or custom URL
  videoUri: string; // Preset key or custom MP4 video URL
  overlayOpacity: number; // 0.0 to 0.9 (overlay tint for text readability)
  blurRadius: number; // 0 to 20
}

export interface CustomColors {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  subtext: string;
  accent: string;
  cardBorder: string;
}

interface ThemeState {
  themeKey: ThemeKey;
  themeMode: 'light' | 'dark' | 'system';
  isCustomThemeEnabled: boolean;
  customColors: CustomColors;
  screenBackgrounds: Record<ScreenId, BackgroundConfig>;

  // Actions
  setThemeKey: (key: ThemeKey) => void;
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
  setScreenBackground: (screenId: ScreenId, config: Partial<BackgroundConfig>) => void;
  setCustomColor: (key: keyof CustomColors, value: string) => void;
  setCustomColors: (colors: Partial<CustomColors>) => void;
  setIsCustomThemeEnabled: (enabled: boolean) => void;
  resetScreenBackgrounds: () => void;
}

const defaultBackgrounds: Record<ScreenId, BackgroundConfig> = {
  home: {
    mode: 'picture',
    pictureUri: 'midnight_nebula',
    videoUri: 'cosmic_aurora',
    overlayOpacity: 0.45,
    blurRadius: 0,
  },
  theme: {
    mode: 'video',
    pictureUri: 'cyberpunk_city',
    videoUri: 'ambient_waves',
    overlayOpacity: 0.5,
    blurRadius: 0,
  },
  profile: {
    mode: 'solid',
    pictureUri: 'deep_forest',
    videoUri: 'digital_rain',
    overlayOpacity: 0.4,
    blurRadius: 0,
  },
};

const defaultCustomColors: CustomColors = {
  primary: '#7C3AED',
  secondary: '#A78BFA',
  background: '#0B081B',
  card: '#14102C',
  text: '#FFFFFF',
  subtext: '#9CA3AF',
  accent: '#C084FC',
  cardBorder: '#231C4C',
};

export const useThemeStore = create<ThemeState>((set) => ({
  themeKey: 'midnight',
  themeMode: 'dark',
  isCustomThemeEnabled: false,
  customColors: defaultCustomColors,
  screenBackgrounds: defaultBackgrounds,

  setThemeKey: (themeKey) => set({ themeKey }),
  setThemeMode: (themeMode) => set({ themeMode }),
  setIsCustomThemeEnabled: (isCustomThemeEnabled) => set({ isCustomThemeEnabled }),

  setScreenBackground: (screenId, config) =>
    set((state) => ({
      screenBackgrounds: {
        ...state.screenBackgrounds,
        [screenId]: {
          ...state.screenBackgrounds[screenId],
          ...config,
        },
      },
    })),

  setCustomColor: (key, value) =>
    set((state) => ({
      customColors: {
        ...state.customColors,
        [key]: value,
      },
      isCustomThemeEnabled: true,
    })),

  setCustomColors: (colors) =>
    set((state) => ({
      customColors: {
        ...state.customColors,
        ...colors,
      },
      isCustomThemeEnabled: true,
    })),

  resetScreenBackgrounds: () =>
    set({
      screenBackgrounds: defaultBackgrounds,
      isCustomThemeEnabled: false,
    }),
}));
