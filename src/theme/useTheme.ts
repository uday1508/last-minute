import { useColorScheme } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';
import { themes, ThemeColors } from './theme';

export const useTheme = () => {
  const { themeKey, themeMode } = useThemeStore();
  const systemColorScheme = useColorScheme();
  
  const isDark =
    themeMode === 'system'
      ? systemColorScheme === 'dark'
      : themeMode === 'dark';

  const colors: ThemeColors = isDark ? themes[themeKey].dark : themes[themeKey].light;

  return { colors, isDark, themeKey, themeMode };
};
export type UseThemeType = typeof useTheme;
