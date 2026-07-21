import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Sun,
  Moon,
  Monitor,
  RotateCcw,
  Check,
  Palette,
  CheckSquare,
  Clock,
  Compass,
} from 'lucide-react-native';
import { useTheme } from '../theme/useTheme';
import { useThemeStore } from '../store/useThemeStore';
import { useAppStore, ChecklistTask } from '../store/useAppStore';
import { ThemeKey, themes } from '../theme/theme';

export const MainHomeScreen = () => {
  const insets = useSafeAreaInsets();
  const { colors, isDark, themeKey, themeMode } = useTheme();

  const { setThemeKey, setThemeMode } = useThemeStore();
  const { tasks, toggleTask, resetTasks, setOnboardingCompleted } = useAppStore();

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleResetOnboarding = () => {
    resetTasks();
    setOnboardingCompleted(false);
  };

  const themeList: { key: ThemeKey; name: string; color: string }[] = [
    { key: 'midnight', name: 'Midnight', color: '#7C3AED' },
    { key: 'forest', name: 'Forest', color: '#059669' },
    { key: 'ocean', name: 'Ocean', color: '#0EA5E9' },
    { key: 'sunset', name: 'Sunset', color: '#F97316' },
    { key: 'sakura', name: 'Sakura', color: '#EC4899' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      {/* Scroll View for Dashboard content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.subtext }]}>Welcome back,</Text>
            <Text style={[styles.appName, { color: colors.text }]}>Last Minute</Text>
          </View>
          <TouchableOpacity
            onPress={handleResetOnboarding}
            activeOpacity={0.7}
            style={[styles.resetButton, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }]}
          >
            <RotateCcw size={18} color={colors.text} />
            <Text style={[styles.resetText, { color: colors.text }]}>Reset Intro</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Card */}
        <View style={[styles.progressCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.progressHeader}>
            <View style={[styles.iconWrapper, { backgroundColor: colors.primary + '20' }]}>
              <CheckSquare size={24} color={colors.primary} />
            </View>
            <View style={styles.progressTitleSection}>
              <Text style={[styles.progressTitle, { color: colors.text }]}>Office Checklist</Text>
              <Text style={[styles.progressSub, { color: colors.subtext }]}>
                {completedCount} of {totalCount} completed
              </Text>
            </View>
            <Text style={[styles.progressPercentText, { color: colors.primary }]}>{percent}%</Text>
          </View>

          <View style={[styles.barContainer, { backgroundColor: colors.progressBg }]}>
            <View style={[styles.barFill, { width: `${percent}%`, backgroundColor: colors.primary }]} />
          </View>
        </View>

        {/* Themes Selector Title */}
        <View style={styles.sectionHeader}>
          <Palette size={20} color={colors.text} style={{ marginRight: 8 }} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Customize Theme</Text>
        </View>

        {/* Themes Palette Selector */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardLabel, { color: colors.subtext }]}>Color Schemes</Text>
          <View style={styles.themePaletteRow}>
            {themeList.map((t) => {
              const isSelected = themeKey === t.key;
              return (
                <TouchableOpacity
                  key={t.key}
                  onPress={() => setThemeKey(t.key)}
                  activeOpacity={0.8}
                  style={[
                    styles.themePaletteButton,
                    isSelected && { borderColor: colors.primary, borderWidth: 2 },
                  ]}
                >
                  <View style={[styles.themeColorDot, { backgroundColor: t.color }]} />
                  <Text style={[styles.themeLabelName, { color: colors.text }]}>{t.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Mode Switcher (System, Light, Dark) */}
          <Text style={[styles.cardLabel, { color: colors.subtext, marginTop: 20 }]}>Theme Mode</Text>
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

        {/* Interactive List */}
        <View style={styles.sectionHeader}>
          <Clock size={20} color={colors.text} style={{ marginRight: 8 }} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Checklist Preview</Text>
        </View>

        <View style={[styles.listCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              onPress={() => toggleTask(task.id)}
              activeOpacity={0.7}
              style={styles.taskItem}
            >
              <View style={[
                styles.checkboxCircle,
                task.completed ? { backgroundColor: colors.primary, borderColor: colors.primary } : { borderColor: colors.border }
              ]}>
                {task.completed && <Check color="#FFFFFF" size={12} strokeWidth={3} />}
              </View>
              <Text style={[
                styles.taskTitleText,
                { color: colors.text },
                task.completed && [styles.taskTextCompleted, { color: colors.subtext }]
              ]}>
                {task.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Outfit-Medium',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Outfit-Bold',
    marginTop: 2,
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
  progressCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    marginBottom: 28,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressTitleSection: {
    flex: 1,
    marginLeft: 16,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Outfit-Bold',
  },
  progressSub: {
    fontSize: 12,
    marginTop: 2,
    fontFamily: 'Outfit-Medium',
  },
  progressPercentText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Outfit-Bold',
  },
  barContainer: {
    height: 8,
    borderRadius: 4,
    width: '100%',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
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
    marginBottom: 28,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
    fontFamily: 'Outfit-Bold',
  },
  themePaletteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  themePaletteButton: {
    alignItems: 'center',
    borderRadius: 12,
    padding: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    width: (Dimensions.get('window').width - 48 - 40 - 20) / 5,
  },
  themeColorDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginBottom: 6,
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
  listCard: {
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(156,163,175,0.15)',
  },
  checkboxCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  taskTitleText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Outfit-Medium',
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
  },
});
