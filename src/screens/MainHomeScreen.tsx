import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  RotateCcw,
  Check,
  CheckSquare,
  Clock,
  LogOut,
  User as UserIcon,
  Sparkles,
  Palette,
} from 'lucide-react-native';
import { useTheme } from '../theme/useTheme';
import { useThemeStore } from '../store/useThemeStore';
import { useAppStore } from '../store/useAppStore';
import { ScreenBackgroundWrapper } from '../components/ScreenBackgroundWrapper';

export const MainHomeScreen = () => {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();

  const screenBackgrounds = useThemeStore((state) => state.screenBackgrounds);
  const homeBgMode = screenBackgrounds.home.mode;

  const { tasks, toggleTask, resetTasks, setOnboardingCompleted, user, isAuthenticated, signOutAction } = useAppStore();

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleResetOnboarding = () => {
    resetTasks();
    setOnboardingCompleted(false);
  };

  const handleSignOut = async () => {
    await signOutAction();
  };

  return (
    <ScreenBackgroundWrapper screenId="home">
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      {/* Scroll View for Dashboard content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userProfileInfo}>
            {user?.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={styles.avatarImage} />
            ) : (
              <View style={[styles.avatarFallback, { backgroundColor: colors.primary + '25' }]}>
                <UserIcon size={22} color={colors.primary} />
              </View>
            )}
            <View style={styles.userTextDetails}>
              <Text style={[styles.greeting, { color: colors.subtext }]}>Welcome back,</Text>
              <Text style={[styles.appName, { color: colors.text }]} numberOfLines={1}>
                {user?.displayName || 'Guest User'}
              </Text>
              {user?.email ? (
                <Text style={[styles.userEmailText, { color: colors.subtext }]} numberOfLines={1}>
                  {user.email}
                </Text>
              ) : null}
            </View>
          </View>

          <View style={styles.headerActions}>
            {isAuthenticated ? (
              <TouchableOpacity
                onPress={handleSignOut}
                activeOpacity={0.7}
                style={[styles.actionButton, { backgroundColor: 'rgba(239, 68, 68, 0.12)' }]}
              >
                <LogOut size={16} color="#EF4444" />
                <Text style={[styles.actionText, { color: '#EF4444' }]}>Sign Out</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleResetOnboarding}
                activeOpacity={0.7}
                style={[styles.actionButton, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }]}
              >
                <RotateCcw size={16} color={colors.text} />
                <Text style={[styles.actionText, { color: colors.text }]}>Reset</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Background Status Card */}
        <View style={[styles.bgStatusCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.bgStatusLeft}>
            <View style={[styles.bgIconBadge, { backgroundColor: colors.primary + '20' }]}>
              <Sparkles size={18} color={colors.primary} />
            </View>
            <View>
              <Text style={[styles.bgStatusTitle, { color: colors.text }]}>
                Home Background: {homeBgMode.toUpperCase()}
              </Text>
              <Text style={[styles.bgStatusSub, { color: colors.subtext }]}>
                Customize background type & colors in Theme tab
              </Text>
            </View>
          </View>
          <View style={[styles.pillTag, { backgroundColor: colors.primary }]}>
            <Palette size={12} color="#FFFFFF" style={{ marginRight: 4 }} />
            <Text style={styles.pillTagText}>Active</Text>
          </View>
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

        {/* Interactive List */}
        <View style={styles.sectionHeader}>
          <Clock size={20} color={colors.text} style={{ marginRight: 8 }} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Tasks</Text>
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
    marginBottom: 20,
  },
  userProfileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  avatarImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  avatarFallback: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userTextDetails: {
    flex: 1,
  },
  greeting: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Outfit-Medium',
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Outfit-Bold',
    marginTop: 1,
  },
  userEmailText: {
    fontSize: 11,
    marginTop: 2,
    fontFamily: 'Outfit-Medium',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
    fontFamily: 'Outfit-Bold',
  },
  bgStatusCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 20,
  },
  bgStatusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  bgIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bgStatusTitle: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Outfit-Bold',
  },
  bgStatusSub: {
    fontSize: 10,
    marginTop: 2,
    fontFamily: 'Outfit-Medium',
  },
  pillTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  pillTagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Outfit-Bold',
  },
  progressCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    marginBottom: 24,
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
