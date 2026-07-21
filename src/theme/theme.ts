export type ThemeKey = 'midnight' | 'forest' | 'ocean' | 'sunset' | 'sakura';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  subtext: string;
  accent: string;
  border: string;
  success: string;
  info: string;
  warning: string;
  error: string;
  cardBorder: string;
  buttonText: string;
  progressBg: string;
  shadow: string;
}

export const themes: Record<ThemeKey, { dark: ThemeColors; light: ThemeColors }> = {
  midnight: {
    dark: {
      primary: '#7C3AED', // Purple
      secondary: '#A78BFA', // Soft Lavender
      background: '#0B081B', // Deep Violet-Black
      card: '#14102C', // Deep Violet Card
      text: '#FFFFFF',
      subtext: '#9CA3AF',
      accent: '#C084FC',
      border: '#2A244E',
      success: '#10B981',
      info: '#3B82F6',
      warning: '#F59E0B',
      error: '#EF4444',
      cardBorder: '#231C4C',
      buttonText: '#FFFFFF',
      progressBg: '#1E1B4B',
      shadow: 'rgba(0, 0, 0, 0.5)',
    },
    light: {
      primary: '#7C3AED',
      secondary: '#C084FC',
      background: '#F5F3FF', // Soft Light Purple
      card: '#FFFFFF',
      text: '#1F2937',
      subtext: '#6B7280',
      accent: '#A78BFA',
      border: '#E9E3FF',
      success: '#10B981',
      info: '#3B82F6',
      warning: '#F59E0B',
      error: '#EF4444',
      cardBorder: '#ECE9FC',
      buttonText: '#FFFFFF',
      progressBg: '#E0E7FF',
      shadow: 'rgba(124, 58, 237, 0.1)',
    },
  },
  forest: {
    dark: {
      primary: '#059669', // Emerald Green
      secondary: '#34D399',
      background: '#06120D', // Deep Forest Black
      card: '#11231A',
      text: '#FFFFFF',
      subtext: '#9CA3AF',
      accent: '#6EE7B7',
      border: '#1C3A2B',
      success: '#10B981',
      info: '#3B82F6',
      warning: '#F59E0B',
      error: '#EF4444',
      cardBorder: '#1A3F2C',
      buttonText: '#FFFFFF',
      progressBg: '#064E3B',
      shadow: 'rgba(0, 0, 0, 0.5)',
    },
    light: {
      primary: '#059669',
      secondary: '#6EE7B7',
      background: '#F0FDF4', // Soft Green
      card: '#FFFFFF',
      text: '#1F2937',
      subtext: '#6B7280',
      accent: '#34D399',
      border: '#DCFCE7',
      success: '#10B981',
      info: '#3B82F6',
      warning: '#F59E0B',
      error: '#EF4444',
      cardBorder: '#E6F4EA',
      buttonText: '#FFFFFF',
      progressBg: '#D1FAE5',
      shadow: 'rgba(5, 150, 105, 0.1)',
    },
  },
  ocean: {
    dark: {
      primary: '#0EA5E9', // Sky Blue
      secondary: '#38BDF8',
      background: '#04101A', // Deep Ocean Blue
      card: '#0D1E2D',
      text: '#FFFFFF',
      subtext: '#9CA3AF',
      accent: '#7DD3FC',
      border: '#1A334A',
      success: '#10B981',
      info: '#3B82F6',
      warning: '#F59E0B',
      error: '#EF4444',
      cardBorder: '#193A57',
      buttonText: '#FFFFFF',
      progressBg: '#0C4A6E',
      shadow: 'rgba(0, 0, 0, 0.5)',
    },
    light: {
      primary: '#0EA5E9',
      secondary: '#7DD3FC',
      background: '#F0F9FF', // Soft Sky
      card: '#FFFFFF',
      text: '#1F2937',
      subtext: '#6B7280',
      accent: '#38BDF8',
      border: '#E0F2FE',
      success: '#10B981',
      info: '#3B82F6',
      warning: '#F59E0B',
      error: '#EF4444',
      cardBorder: '#E1F5FE',
      buttonText: '#FFFFFF',
      progressBg: '#E0F2FE',
      shadow: 'rgba(14, 165, 233, 0.1)',
    },
  },
  sunset: {
    dark: {
      primary: '#F97316', // Sunset Orange
      secondary: '#FB923C',
      background: '#170A03', // Deep Orange-Black
      card: '#26140A',
      text: '#FFFFFF',
      subtext: '#9CA3AF',
      accent: '#FDBA74',
      border: '#3F1F0E',
      success: '#10B981',
      info: '#3B82F6',
      warning: '#F59E0B',
      error: '#EF4444',
      cardBorder: '#452614',
      buttonText: '#FFFFFF',
      progressBg: '#7C2D12',
      shadow: 'rgba(0, 0, 0, 0.5)',
    },
    light: {
      primary: '#F97316',
      secondary: '#FDBA74',
      background: '#FFF7ED', // Soft Peach
      card: '#FFFFFF',
      text: '#1F2937',
      subtext: '#6B7280',
      accent: '#FB923C',
      border: '#FFEDD5',
      success: '#10B981',
      info: '#3B82F6',
      warning: '#F59E0B',
      error: '#EF4444',
      cardBorder: '#FFE6D5',
      buttonText: '#FFFFFF',
      progressBg: '#FFEDD5',
      shadow: 'rgba(249, 115, 22, 0.1)',
    },
  },
  sakura: {
    dark: {
      primary: '#EC4899', // Sakura Pink
      secondary: '#F472B6',
      background: '#170610', // Deep Pink-Black
      card: '#260F1D',
      text: '#FFFFFF',
      subtext: '#9CA3AF',
      accent: '#F9A8D4',
      border: '#3E142B',
      success: '#10B981',
      info: '#3B82F6',
      warning: '#F59E0B',
      error: '#EF4444',
      cardBorder: '#4A1D36',
      buttonText: '#FFFFFF',
      progressBg: '#831843',
      shadow: 'rgba(0, 0, 0, 0.5)',
    },
    light: {
      primary: '#EC4899',
      secondary: '#F9A8D4',
      background: '#FDF2F8', // Soft Pink
      card: '#FFFFFF',
      text: '#1F2937',
      subtext: '#6B7280',
      accent: '#F472B6',
      border: '#FCE7F3',
      success: '#10B981',
      info: '#3B82F6',
      warning: '#F59E0B',
      error: '#EF4444',
      cardBorder: '#FCE4F2',
      buttonText: '#FFFFFF',
      progressBg: '#FCE7F3',
      shadow: 'rgba(236, 72, 153, 0.1)',
    },
  },
};
