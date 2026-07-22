import { useColorScheme } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';
import { themes, ThemeColors } from './theme';

export const useTheme = () => {
  const { themeKey, themeMode, isCustomThemeEnabled, customColors } = useThemeStore();
  const systemColorScheme = useColorScheme();
  
  const isDark =
    themeMode === 'system'
      ? systemColorScheme === 'dark'
      : themeMode === 'dark';

  const baseColors: ThemeColors = isDark ? themes[themeKey].dark : themes[themeKey].light;

  const colors: ThemeColors = isCustomThemeEnabled
    ? {
        ...baseColors,
        primary: customColors.primary || baseColors.primary,
        secondary: customColors.secondary || baseColors.secondary,
        background: customColors.background || baseColors.background,
        card: customColors.card || baseColors.card,
        text: customColors.text || baseColors.text,
        subtext: customColors.subtext || baseColors.subtext,
        accent: customColors.accent || baseColors.accent,
        cardBorder: customColors.cardBorder || baseColors.cardBorder,
      }
    : baseColors;

  return { colors, isDark, themeKey, themeMode, isCustomThemeEnabled };
};
export type UseThemeType = typeof useTheme;
