import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Palette,
  Image as ImageIcon,
  Video as VideoIcon,
  Sun,
  Moon,
  Monitor,
  Check,
  RotateCcw,
  Sparkles,
  Layers,
  Sliders,
  FolderPlus,
} from 'lucide-react-native';
import { NativeModules, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTheme } from '../theme/useTheme';
import {
  useThemeStore,
  ScreenId,
  BackgroundMode,
  CustomColors,
} from '../store/useThemeStore';
import {
  ThemeKey,
  themes,
  PICTURE_PRESETS,
  VIDEO_PRESETS,
} from '../theme/theme';
import { ScreenBackgroundWrapper } from '../components/ScreenBackgroundWrapper';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLOR_SWATCHES = [
  '#7C3AED', '#3B82F6', '#0EA5E9', '#10B981', '#059669',
  '#F59E0B', '#F97316', '#EF4444', '#EC4899', '#A855F7',
  '#00F0FF', '#FF007F', '#14102C', '#0B081B', '#FFFFFF', '#1F2937'
];

export const ThemeCustomizationScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { colors, isDark, themeKey, themeMode, isCustomThemeEnabled } = useTheme();

  const {
    setThemeKey,
    setThemeMode,
    screenBackgrounds,
    setScreenBackground,
    customColors,
    setCustomColor,
    setIsCustomThemeEnabled,
    resetScreenBackgrounds,
  } = useThemeStore();

  // Active target screen being edited (home, theme, or profile)
  const [targetScreen, setTargetScreen] = useState<ScreenId>('home');
  const activeBgConfig = screenBackgrounds[targetScreen];

  // Custom inputs state
  const [customImageUri, setCustomImageUri] = useState('');
  const [customVideoUri, setCustomVideoUri] = useState('');
  const [activeColorKey, setActiveColorKey] = useState<keyof CustomColors>('primary');

  const screenTabs: { id: ScreenId; label: string }[] = [
    { id: 'home', label: 'Home Screen' },
    { id: 'theme', label: 'Theme Screen' },
    { id: 'profile', label: 'Profile Screen' },
  ];

  const themeList: { key: ThemeKey; name: string; color: string }[] = [
    { key: 'midnight', name: 'Midnight', color: '#7C3AED' },
    { key: 'forest', name: 'Forest', color: '#059669' },
    { key: 'ocean', name: 'Ocean', color: '#0EA5E9' },
    { key: 'sunset', name: 'Sunset', color: '#F97316' },
    { key: 'sakura', name: 'Sakura', color: '#EC4899' },
    { key: 'cyberpunk', name: 'Cyberpunk', color: '#00F0FF' },
    { key: 'neon', name: 'Neon', color: '#A855F7' },
  ];

  const handleModeChange = (mode: BackgroundMode) => {
    setScreenBackground(targetScreen, { mode });
  };

  const handlePictureSelect = (pictureUri: string) => {
    setScreenBackground(targetScreen, { mode: 'picture', pictureUri });
  };

  const handleVideoSelect = (videoUri: string) => {
    setScreenBackground(targetScreen, { mode: 'video', videoUri });
  };

  const handleOpacityChange = (opacity: number) => {
    setScreenBackground(targetScreen, { overlayOpacity: opacity });
  };

  const handlePickImageFromGallery = async () => {
    console.log('gallery picker is called');
    let pickedUri: string | null = null;

    const isNativeModuleAvailable = !!(NativeModules && NativeModules.ImagePicker);

    if (isNativeModuleAvailable) {
      try {
        const response = await launchImageLibrary({
          mediaType: 'photo',
          quality: 0.9,
          selectionLimit: 1,
          includeBase64: true,
        });

        if (response?.assets?.[0]?.uri) {
          pickedUri = response.assets[0].uri;
        }
      } catch (err) {
        console.log('Native image picker notice:', err);
      }
    }

    // Fallback for browser / web environments
    const globalDoc = (globalThis as any).document;
    const globalFileReader = (globalThis as any).FileReader;

    if (!pickedUri && globalDoc && globalDoc.createElement) {
      const input = globalDoc.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e: any) => {
        const file = e.target?.files?.[0];
        if (file && globalFileReader) {
          const reader = new globalFileReader();
          reader.onload = (event: any) => {
            if (event.target?.result) {
              const dataUrl = event.target.result as string;
              setScreenBackground(targetScreen, {
                mode: 'picture',
                pictureUri: dataUrl,
              });
            }
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
      return;
    }

    if (pickedUri) {
      setScreenBackground(targetScreen, {
        mode: 'picture',
        pictureUri: pickedUri,
      });
    } else if (!isNativeModuleAvailable && !globalDoc?.createElement) {
      Alert.alert(
        'Native Binary Rebuild Required',
        'Image picker native binary modules require building the app via `npx react-native run-android`. You can also enter any custom image URL below!',
        [{ text: 'OK' }]
      );
    }
  };

  const handlePickVideoFromGallery = async () => {
    let pickedUri: string | null = null;

    const isNativeModuleAvailable = !!(NativeModules && NativeModules.ImagePicker);

    if (isNativeModuleAvailable) {
      try {
        const response = await launchImageLibrary({
          mediaType: 'video',
          selectionLimit: 1,
        });

        if (response?.assets?.[0]?.uri) {
          pickedUri = response.assets[0].uri;
        }
      } catch (err) {
        console.log('Native video picker notice:', err);
      }
    }

    const globalDoc = (globalThis as any).document;
    const globalURL = (globalThis as any).URL;

    if (!pickedUri && globalDoc && globalDoc.createElement) {
      const input = globalDoc.createElement('input');
      input.type = 'file';
      input.accept = 'video/*';
      input.onchange = (e: any) => {
        const file = e.target?.files?.[0];
        if (file && globalURL) {
          const url = globalURL.createObjectURL(file);
          setScreenBackground(targetScreen, {
            mode: 'video',
            videoUri: url,
          });
        }
      };
      input.click();
      return;
    }

    if (pickedUri) {
      setScreenBackground(targetScreen, {
        mode: 'video',
        videoUri: pickedUri,
      });
    } else if (!isNativeModuleAvailable && !globalDoc?.createElement) {
      Alert.alert(
        'Native Binary Rebuild Required',
        'Video picker native binary modules require building the app via `npx react-native run-android`. You can also enter any custom video MP4 URL below!',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <ScreenBackgroundWrapper screenId="theme">
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, { color: colors.text }]}>Theme Studio</Text>
            <Text style={[styles.subtitle, { color: colors.subtext }]}>
              Customize backgrounds & colors for every screen
            </Text>
          </View>
          <TouchableOpacity
            onPress={resetScreenBackgrounds}
            activeOpacity={0.7}
            style={[styles.resetButton, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }]}
          >
            <RotateCcw size={16} color={colors.text} />
            <Text style={[styles.resetText, { color: colors.text }]}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* 1. Target Screen Selector Tabs */}
        <View style={styles.sectionHeader}>
          <Layers size={20} color={colors.text} style={{ marginRight: 8 }} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>1. Target Screen</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardSubText, { color: colors.subtext, marginBottom: 12 }]}>
            Select which bottom tab screen background you want to edit:
          </Text>

          <View style={styles.screenTabRow}>
            {screenTabs.map((tab) => {
              const isSelected = targetScreen === tab.id;
              const screenMode = screenBackgrounds[tab.id].mode;

              return (
                <TouchableOpacity
                  key={tab.id}
                  onPress={() => setTargetScreen(tab.id)}
                  activeOpacity={0.8}
                  style={[
                    styles.screenTabButton,
                    isSelected
                      ? { backgroundColor: colors.primary, borderColor: colors.primary }
                      : { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', borderColor: colors.border },
                  ]}
                >
                  <Text
                    style={[
                      styles.screenTabLabel,
                      { color: isSelected ? '#FFFFFF' : colors.text },
                    ]}
                  >
                    {tab.label}
                  </Text>
                  <Text
                    style={[
                      styles.screenTabBadge,
                      { color: isSelected ? 'rgba(255,255,255,0.85)' : colors.subtext },
                    ]}
                  >
                    {screenMode.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 2. Background Mode Selection (Solid / Picture / Video) */}
        <View style={styles.sectionHeader}>
          <Sparkles size={20} color={colors.text} style={{ marginRight: 8 }} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            2. Background Type for {targetScreen.toUpperCase()}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.modeOptionRow}>
            <TouchableOpacity
              onPress={() => handleModeChange('solid')}
              activeOpacity={0.8}
              style={[
                styles.modeOptionCard,
                activeBgConfig.mode === 'solid' && [styles.modeOptionCardActive, { borderColor: colors.primary }],
                { backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)' },
              ]}
            >
              <View style={[styles.modeIconCircle, { backgroundColor: colors.primary + '20' }]}>
                <Palette size={20} color={colors.primary} />
              </View>
              <Text style={[styles.modeOptionTitle, { color: colors.text }]}>Solid Theme</Text>
              <Text style={[styles.modeOptionSub, { color: colors.subtext }]}>Clean theme color</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleModeChange('picture')}
              activeOpacity={0.8}
              style={[
                styles.modeOptionCard,
                activeBgConfig.mode === 'picture' && [styles.modeOptionCardActive, { borderColor: colors.primary }],
                { backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)' },
              ]}
            >
              <View style={[styles.modeIconCircle, { backgroundColor: colors.primary + '20' }]}>
                <ImageIcon size={20} color={colors.primary} />
              </View>
              <Text style={[styles.modeOptionTitle, { color: colors.text }]}>Picture</Text>
              <Text style={[styles.modeOptionSub, { color: colors.subtext }]}>Image wallpaper</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleModeChange('video')}
              activeOpacity={0.8}
              style={[
                styles.modeOptionCard,
                activeBgConfig.mode === 'video' && [styles.modeOptionCardActive, { borderColor: colors.primary }],
                { backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)' },
              ]}
            >
              <View style={[styles.modeIconCircle, { backgroundColor: colors.primary + '20' }]}>
                <VideoIcon size={20} color={colors.primary} />
              </View>
              <Text style={[styles.modeOptionTitle, { color: colors.text }]}>Video</Text>
              <Text style={[styles.modeOptionSub, { color: colors.subtext }]}>Animated loop</Text>
            </TouchableOpacity>
          </View>

          {/* Picture Presets Gallery */}
          {activeBgConfig.mode === 'picture' && (
            <View style={{ marginTop: 20 }}>
              <Text style={[styles.cardSubText, { color: colors.subtext, marginBottom: 12 }]}>
                Select Picture Preset:
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.presetScroll}>
                {PICTURE_PRESETS.map((preset) => {
                  const isSelected = activeBgConfig.pictureUri === preset.id || activeBgConfig.pictureUri === preset.uri;
                  return (
                    <TouchableOpacity
                      key={preset.id}
                      onPress={() => handlePictureSelect(preset.id)}
                      activeOpacity={0.8}
                      style={[
                        styles.presetCard,
                        isSelected && { borderColor: colors.primary, borderWidth: 3 },
                      ]}
                    >
                      <Image source={{ uri: preset.thumbnail }} style={styles.presetImage} />
                      <View style={styles.presetOverlayTitle}>
                        <Text style={styles.presetNameText} numberOfLines={1}>{preset.name}</Text>
                      </View>
                      {isSelected && (
                        <View style={[styles.checkBadge, { backgroundColor: colors.primary }]}>
                          <Check size={12} color="#FFFFFF" strokeWidth={3} />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Pick Image from Gallery Button */}
              <TouchableOpacity
                onPress={handlePickImageFromGallery}
                activeOpacity={0.8}
                style={[
                  styles.galleryPickerBtn,
                  { backgroundColor: colors.primary + '1F', borderColor: colors.primary },
                ]}
              >
                <FolderPlus size={18} color={colors.primary} style={{ marginRight: 8 }} />
                <Text style={[styles.galleryPickerText, { color: colors.primary }]}>
                  Choose Image from Phone Gallery
                </Text>
              </TouchableOpacity>

              {/* Active Custom / Gallery Image Preview */}
              {activeBgConfig.pictureUri &&
                !PICTURE_PRESETS.some((p) => p.id === activeBgConfig.pictureUri || p.uri === activeBgConfig.pictureUri) && (
                  <View style={[styles.activeGalleryPreviewBox, { borderColor: colors.primary, backgroundColor: colors.primary + '10' }]}>
                    <Image source={{ uri: activeBgConfig.pictureUri }} style={styles.activeGalleryThumb} />
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <Text style={[styles.activeGalleryTitle, { color: colors.primary }]}>Active Gallery Image</Text>
                      <Text style={[styles.activeGallerySub, { color: colors.subtext }]} numberOfLines={1}>
                        Custom photo set as background
                      </Text>
                    </View>
                    <View style={[styles.checkBadge, { position: 'relative', top: 0, right: 0, backgroundColor: colors.primary }]}>
                      <Check size={12} color="#FFFFFF" strokeWidth={3} />
                    </View>
                  </View>
                )}

              {/* Custom Image URL Input */}
              <Text style={[styles.cardSubText, { color: colors.subtext, marginTop: 16, marginBottom: 8 }]}>
                Or Enter Custom Image URL:
              </Text>
              <View style={styles.customUrlRow}>
                <TextInput
                  value={customImageUri}
                  onChangeText={setCustomImageUri}
                  placeholder="https://example.com/image.jpg"
                  placeholderTextColor={colors.subtext + '80'}
                  style={[
                    styles.urlInput,
                    { color: colors.text, borderColor: colors.border, backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' },
                  ]}
                />
                <TouchableOpacity
                  onPress={() => customImageUri.trim() && handlePictureSelect(customImageUri.trim())}
                  activeOpacity={0.8}
                  style={[styles.applyUrlBtn, { backgroundColor: colors.primary }]}
                >
                  <Text style={styles.applyUrlText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Video Presets Gallery */}
          {activeBgConfig.mode === 'video' && (
            <View style={{ marginTop: 20 }}>
              <Text style={[styles.cardSubText, { color: colors.subtext, marginBottom: 12 }]}>
                Select Video Loop Preset:
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.presetScroll}>
                {VIDEO_PRESETS.map((preset) => {
                  const isSelected = activeBgConfig.videoUri === preset.id || activeBgConfig.videoUri === preset.uri;
                  return (
                    <TouchableOpacity
                      key={preset.id}
                      onPress={() => handleVideoSelect(preset.id)}
                      activeOpacity={0.8}
                      style={[
                        styles.presetCard,
                        isSelected && { borderColor: colors.primary, borderWidth: 3 },
                      ]}
                    >
                      <Image source={{ uri: preset.thumbnail }} style={styles.presetImage} />
                      <View style={styles.presetOverlayTitle}>
                        <VideoIcon size={12} color="#FFFFFF" style={{ marginRight: 4 }} />
                        <Text style={styles.presetNameText} numberOfLines={1}>{preset.name}</Text>
                      </View>
                      {isSelected && (
                        <View style={[styles.checkBadge, { backgroundColor: colors.primary }]}>
                          <Check size={12} color="#FFFFFF" strokeWidth={3} />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Pick Video from Gallery Button */}
              <TouchableOpacity
                onPress={handlePickVideoFromGallery}
                activeOpacity={0.8}
                style={[
                  styles.galleryPickerBtn,
                  { backgroundColor: colors.primary + '1F', borderColor: colors.primary },
                ]}
              >
                <FolderPlus size={18} color={colors.primary} style={{ marginRight: 8 }} />
                <Text style={[styles.galleryPickerText, { color: colors.primary }]}>
                  Choose Video from Phone Gallery
                </Text>
              </TouchableOpacity>

              {/* Custom Video URL Input */}
              <Text style={[styles.cardSubText, { color: colors.subtext, marginTop: 16, marginBottom: 8 }]}>
                Or Enter Custom Video MP4 URL:
              </Text>
              <View style={styles.customUrlRow}>
                <TextInput
                  value={customVideoUri}
                  onChangeText={setCustomVideoUri}
                  placeholder="https://example.com/video.mp4"
                  placeholderTextColor={colors.subtext + '80'}
                  style={[
                    styles.urlInput,
                    { color: colors.text, borderColor: colors.border, backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' },
                  ]}
                />
                <TouchableOpacity
                  onPress={() => customVideoUri.trim() && handleVideoSelect(customVideoUri.trim())}
                  activeOpacity={0.8}
                  style={[styles.applyUrlBtn, { backgroundColor: colors.primary }]}
                >
                  <Text style={styles.applyUrlText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Overlay Opacity Controls */}
          {activeBgConfig.mode !== 'solid' && (
            <View style={{ marginTop: 20 }}>
              <View style={styles.sliderHeader}>
                <Sliders size={16} color={colors.text} style={{ marginRight: 6 }} />
                <Text style={[styles.cardSubText, { color: colors.text, marginBottom: 0 }]}>
                  Readability Overlay Tint: {Math.round((activeBgConfig.overlayOpacity ?? 0.4) * 100)}%
                </Text>
              </View>
              <View style={styles.opacityStepRow}>
                {[0.2, 0.35, 0.5, 0.65, 0.8].map((op) => (
                  <TouchableOpacity
                    key={op}
                    onPress={() => handleOpacityChange(op)}
                    activeOpacity={0.8}
                    style={[
                      styles.opacityStepBtn,
                      activeBgConfig.overlayOpacity === op && { backgroundColor: colors.primary, borderColor: colors.primary },
                      { borderColor: colors.border },
                    ]}
                  >
                    <Text
                      style={[
                        styles.opacityStepText,
                        { color: activeBgConfig.overlayOpacity === op ? '#FFFFFF' : colors.text },
                      ]}
                    >
                      {Math.round(op * 100)}%
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* 3. Preset Theme Palettes & Light/Dark Mode */}
        <View style={styles.sectionHeader}>
          <Palette size={20} color={colors.text} style={{ marginRight: 8 }} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>3. Theme Palettes & Mode</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardSubText, { color: colors.subtext, marginBottom: 12 }]}>
            Preset Color Schemes
          </Text>

          <View style={styles.themePaletteRow}>
            {themeList.map((t) => {
              const isSelected = !isCustomThemeEnabled && themeKey === t.key;
              return (
                <TouchableOpacity
                  key={t.key}
                  onPress={() => {
                    setIsCustomThemeEnabled(false);
                    setThemeKey(t.key);
                  }}
                  activeOpacity={0.8}
                  style={[
                    styles.themePaletteButton,
                    isSelected && { borderColor: colors.primary, borderWidth: 2.5 },
                  ]}
                >
                  <View style={[styles.themeColorDot, { backgroundColor: t.color }]} />
                  <Text style={[styles.themeLabelName, { color: colors.text }]} numberOfLines={1}>
                    {t.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Light / Dark / System Mode Switcher */}
          <Text style={[styles.cardSubText, { color: colors.subtext, marginTop: 20, marginBottom: 12 }]}>
            Appearance Mode
          </Text>

          <View style={styles.modeRow}>
            <TouchableOpacity
              onPress={() => setThemeMode('light')}
              activeOpacity={0.7}
              style={[
                styles.modeButton,
                themeMode === 'light' && [styles.modeButtonActive, { backgroundColor: colors.primary }],
                { borderColor: colors.border },
              ]}
            >
              <Sun size={18} color={themeMode === 'light' ? '#FFFFFF' : colors.text} />
              <Text style={[styles.modeButtonText, { color: themeMode === 'light' ? '#FFFFFF' : colors.text }]}>Light</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setThemeMode('dark')}
              activeOpacity={0.7}
              style={[
                styles.modeButton,
                themeMode === 'dark' && [styles.modeButtonActive, { backgroundColor: colors.primary }],
                { borderColor: colors.border },
              ]}
            >
              <Moon size={18} color={themeMode === 'dark' ? '#FFFFFF' : colors.text} />
              <Text style={[styles.modeButtonText, { color: themeMode === 'dark' ? '#FFFFFF' : colors.text }]}>Dark</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setThemeMode('system')}
              activeOpacity={0.7}
              style={[
                styles.modeButton,
                themeMode === 'system' && [styles.modeButtonActive, { backgroundColor: colors.primary }],
                { borderColor: colors.border },
              ]}
            >
              <Monitor size={18} color={themeMode === 'system' ? '#FFFFFF' : colors.text} />
              <Text style={[styles.modeButtonText, { color: themeMode === 'system' ? '#FFFFFF' : colors.text }]}>System</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 4. Custom Colors Customizer */}
        <View style={styles.sectionHeader}>
          <Sliders size={20} color={colors.text} style={{ marginRight: 8 }} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>4. Custom Color Palette</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardSubText, { color: colors.subtext, marginBottom: 12 }]}>
            Pick custom color for: {activeColorKey.toUpperCase()}
          </Text>

          {/* Color Key Selector Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
            {(['primary', 'secondary', 'background', 'card', 'text', 'accent'] as (keyof CustomColors)[]).map((key) => {
              const isSelected = activeColorKey === key;
              const currentColor = customColors[key] || colors[key];
              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => setActiveColorKey(key)}
                  activeOpacity={0.8}
                  style={[
                    styles.colorKeyChip,
                    isSelected && { borderColor: colors.primary, borderWidth: 2 },
                    { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' },
                  ]}
                >
                  <View style={[styles.chipDot, { backgroundColor: currentColor }]} />
                  <Text style={[styles.chipText, { color: colors.text }]}>{key}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Swatches grid */}
          <View style={styles.swatchGrid}>
            {COLOR_SWATCHES.map((swatchHex) => (
              <TouchableOpacity
                key={swatchHex}
                onPress={() => setCustomColor(activeColorKey, swatchHex)}
                activeOpacity={0.8}
                style={[
                  styles.swatchCircle,
                  { backgroundColor: swatchHex },
                  customColors[activeColorKey] === swatchHex && { borderWidth: 3, borderColor: '#FFFFFF' },
                ]}
              >
                {customColors[activeColorKey] === swatchHex && (
                  <Check size={14} color="#FFFFFF" strokeWidth={3} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Custom Hex Input */}
          <View style={[styles.customUrlRow, { marginTop: 16 }]}>
            <TextInput
              value={customColors[activeColorKey] || ''}
              onChangeText={(hex) => setCustomColor(activeColorKey, hex)}
              placeholder="#7C3AED"
              placeholderTextColor={colors.subtext + '80'}
              style={[
                styles.urlInput,
                { color: colors.text, borderColor: colors.border, backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' },
              ]}
            />
            <View style={[styles.hexPreviewBox, { backgroundColor: customColors[activeColorKey] || colors[activeColorKey] }]} />
          </View>
        </View>
      </ScrollView>
    </ScreenBackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Outfit-Bold',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
    fontFamily: 'Outfit-Medium',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  resetText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
    fontFamily: 'Outfit-Bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingLeft: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Outfit-Bold',
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    marginBottom: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardSubText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Outfit-Medium',
  },
  screenTabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  screenTabButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    marginHorizontal: 3,
  },
  screenTabLabel: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'Outfit-Bold',
  },
  screenTabBadge: {
    fontSize: 9,
    marginTop: 2,
    fontWeight: '600',
    fontFamily: 'Outfit-Medium',
  },
  modeOptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modeOptionCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 6,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    marginHorizontal: 3,
  },
  modeOptionCardActive: {
    borderColor: '#7C3AED',
  },
  modeIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  modeOptionTitle: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Outfit-Bold',
  },
  modeOptionSub: {
    fontSize: 9,
    marginTop: 2,
    fontFamily: 'Outfit-Medium',
  },
  presetScroll: {
    flexDirection: 'row',
  },
  presetCard: {
    width: 100,
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 12,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  presetImage: {
    width: '100%',
    height: '100%',
  },
  presetOverlayTitle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 6,
    paddingHorizontal: 6,
    backgroundColor: 'rgba(0,0,0,0.65)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  presetNameText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'Outfit-Medium',
  },
  checkBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customUrlRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  urlInput: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 12,
    fontFamily: 'Outfit-Medium',
  },
  applyUrlBtn: {
    height: 42,
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  applyUrlText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Outfit-Bold',
  },
  sliderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  opacityStepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  opacityStepBtn: {
    flex: 1,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  opacityStepText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'Outfit-Bold',
  },
  themePaletteRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  themePaletteButton: {
    alignItems: 'center',
    borderRadius: 12,
    padding: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    width: (SCREEN_WIDTH - 80) / 4,
  },
  themeColorDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginBottom: 4,
  },
  themeLabelName: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'Outfit-Medium',
  },
  modeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modeButton: {
    flex: 1,
    flexDirection: 'row',
    height: 44,
    borderRadius: 12,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  modeButtonActive: {
    borderColor: 'transparent',
  },
  modeButtonText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
    fontFamily: 'Outfit-Bold',
  },
  colorKeyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    marginRight: 8,
  },
  chipDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
    fontFamily: 'Outfit-Medium',
  },
  swatchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
  },
  swatchCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hexPreviewBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  galleryPickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 14,
    borderWidth: 1.5,
    marginTop: 14,
    paddingHorizontal: 16,
  },
  galleryPickerText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Outfit-Bold',
  },
  activeGalleryPreviewBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 10,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  activeGalleryThumb: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  activeGalleryTitle: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Outfit-Bold',
  },
  activeGallerySub: {
    fontSize: 10,
    marginTop: 2,
    fontFamily: 'Outfit-Medium',
  },
});
