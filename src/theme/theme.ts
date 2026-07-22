export type ThemeKey = 'midnight' | 'forest' | 'ocean' | 'sunset' | 'sakura' | 'cyberpunk' | 'neon';

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

export interface BackgroundPreset {
  id: string;
  name: string;
  uri: string;
  thumbnail: string;
}

export const PICTURE_PRESETS: BackgroundPreset[] = [
  {
    id: 'midnight_nebula',
    name: 'Midnight Nebula',
    uri: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'cyberpunk_city',
    name: 'Neon Cyberpunk',
    uri: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'deep_forest',
    name: 'Emerald Forest',
    uri: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'ocean_waves',
    name: 'Ocean Waves',
    uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'golden_sunset',
    name: 'Golden Sunset',
    uri: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?q=80&w=1200&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'sakura_blossom',
    name: 'Sakura Blossom',
    uri: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=1200&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=300&auto=format&fit=crop',
  },
];

export const VIDEO_PRESETS: BackgroundPreset[] = [
  {
    id: 'cosmic_aurora',
    name: 'Cosmic Aurora',
    uri: 'https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-4000-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'ambient_waves',
    name: 'Ambient Waves',
    uri: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-blue-and-purple-liquid-43204-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'digital_rain',
    name: 'Digital Particle Flow',
    uri: 'https://assets.mixkit.co/videos/preview/mixkit-glowing-lines-and-dots-in-a-network-42588-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'rainy_bokeh',
    name: 'Rainy City Lights',
    uri: 'https://assets.mixkit.co/videos/preview/mixkit-rain-drops-on-a-window-pane-at-night-41559-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=300&auto=format&fit=crop',
  },
];

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
  cyberpunk: {
    dark: {
      primary: '#00F0FF',
      secondary: '#FF007F',
      background: '#090915',
      card: '#12122b',
      text: '#FFFFFF',
      subtext: '#8F90A6',
      accent: '#FFE600',
      border: '#242454',
      success: '#00FF9D',
      info: '#00F0FF',
      warning: '#FFB800',
      error: '#FF0055',
      cardBorder: '#292963',
      buttonText: '#000000',
      progressBg: '#1A1A3A',
      shadow: 'rgba(0, 240, 255, 0.2)',
    },
    light: {
      primary: '#00A3FF',
      secondary: '#E60073',
      background: '#F0F4F8',
      card: '#FFFFFF',
      text: '#0F172A',
      subtext: '#64748B',
      accent: '#FF007F',
      border: '#E2E8F0',
      success: '#10B981',
      info: '#00A3FF',
      warning: '#F59E0B',
      error: '#EF4444',
      cardBorder: '#CBD5E1',
      buttonText: '#FFFFFF',
      progressBg: '#E2E8F0',
      shadow: 'rgba(0, 163, 255, 0.1)',
    },
  },
  neon: {
    dark: {
      primary: '#A855F7',
      secondary: '#22C55E',
      background: '#0D0914',
      card: '#181224',
      text: '#FFFFFF',
      subtext: '#9CA3AF',
      accent: '#F43F5E',
      border: '#322348',
      success: '#22C55E',
      info: '#3B82F6',
      warning: '#EAB308',
      error: '#F43F5E',
      cardBorder: '#3E2A59',
      buttonText: '#FFFFFF',
      progressBg: '#2D1B44',
      shadow: 'rgba(168, 85, 247, 0.3)',
    },
    light: {
      primary: '#9333EA',
      secondary: '#16A34A',
      background: '#FAF5FF',
      card: '#FFFFFF',
      text: '#1E1B4B',
      subtext: '#6B7280',
      accent: '#E11D48',
      border: '#F3E8FF',
      success: '#16A34A',
      info: '#2563EB',
      warning: '#D97706',
      error: '#DC2626',
      cardBorder: '#E9D5FF',
      buttonText: '#FFFFFF',
      progressBg: '#F3E8FF',
      shadow: 'rgba(147, 51, 234, 0.1)',
    },
  },
};

