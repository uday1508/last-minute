import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  User as UserIcon,
  LogOut,
  RotateCcw,
  Palette,
  ShieldCheck,
  Smartphone,
  ChevronRight,
  Sparkles,
} from 'lucide-react-native';
import { useTheme } from '../theme/useTheme';
import { useThemeStore } from '../store/useThemeStore';
import { useAppStore } from '../store/useAppStore';
import { ScreenBackgroundWrapper } from '../components/ScreenBackgroundWrapper';

export const ProfileScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { colors, isDark, themeKey, themeMode, isCustomThemeEnabled } = useTheme();

  const { screenBackgrounds, resetScreenBackgrounds } = useThemeStore();
  const { user, isAuthenticated, signOutAction, setOnboardingCompleted, resetTasks } = useAppStore();

  const handleResetOnboarding = () => {
    resetTasks();
    resetScreenBackgrounds();
    setOnboardingCompleted(false);
  };

  const handleSignOut = async () => {
    await signOutAction();
  };

  return (
    <ScreenBackgroundWrapper screenId="profile">
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card Header */}
        <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {user?.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.avatarImage} />
          ) : (
            <View style={[styles.avatarFallback, { backgroundColor: colors.primary + '25' }]}>
              <UserIcon size={36} color={colors.primary} />
            </View>
          )}

          <Text style={[styles.userNameText, { color: colors.text }]}>
            {user?.displayName || 'Guest User'}
          </Text>
          <Text style={[styles.userEmailText, { color: colors.subtext }]}>
            {user?.email || 'Sign in to sync your preferences'}
          </Text>

          <View style={styles.badgeRow}>
            <View
              style={[
                styles.badge,
                { backgroundColor: isAuthenticated ? 'rgba(16, 185, 129, 0.15)' : 'rgba(156, 163, 175, 0.15)' },
              ]}
            >
              <ShieldCheck
                size={14}
                color={isAuthenticated ? '#10B981' : colors.subtext}
                style={{ marginRight: 4 }}
              />
              <Text
                style={[
                  styles.badgeText,
                  { color: isAuthenticated ? '#10B981' : colors.subtext },
                ]}
              >
                {isAuthenticated ? 'Google Verified' : 'Local Session'}
              </Text>
            </View>
          </View>
        </View>

        {/* Theme & Background Preference Overview */}
        <View style={styles.sectionHeader}>
          <Palette size={20} color={colors.text} style={{ marginRight: 8 }} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Backgrounds Summary</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: colors.subtext }]}>Theme Key</Text>
            <Text style={[styles.summaryValue, { color: colors.primary }]}>
              {isCustomThemeEnabled ? 'Custom Palette' : themeKey.toUpperCase()} ({themeMode})
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: colors.subtext }]}>Home Screen Background</Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              {screenBackgrounds.home.mode.toUpperCase()}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: colors.subtext }]}>Theme Screen Background</Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              {screenBackgrounds.theme.mode.toUpperCase()}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: colors.subtext }]}>Profile Screen Background</Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              {screenBackgrounds.profile.mode.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* System & Settings Actions */}
        <View style={styles.sectionHeader}>
          <Smartphone size={20} color={colors.text} style={{ marginRight: 8 }} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Account & Settings</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, paddingVertical: 8 }]}>
          <TouchableOpacity
            onPress={handleResetOnboarding}
            activeOpacity={0.7}
            style={styles.actionRow}
          >
            <View style={[styles.actionIconBox, { backgroundColor: 'rgba(245, 158, 11, 0.12)' }]}>
              <RotateCcw size={18} color="#F59E0B" />
            </View>
            <View style={styles.actionTextDetails}>
              <Text style={[styles.actionTitle, { color: colors.text }]}>Reset App & Onboarding</Text>
              <Text style={[styles.actionSub, { color: colors.subtext }]}>Clear local preferences & restart setup</Text>
            </View>
            <ChevronRight size={18} color={colors.subtext} />
          </TouchableOpacity>

          {isAuthenticated && (
            <>
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              <TouchableOpacity
                onPress={handleSignOut}
                activeOpacity={0.7}
                style={styles.actionRow}
              >
                <View style={[styles.actionIconBox, { backgroundColor: 'rgba(239, 68, 68, 0.12)' }]}>
                  <LogOut size={18} color="#EF4444" />
                </View>
                <View style={styles.actionTextDetails}>
                  <Text style={[styles.actionTitle, { color: '#EF4444' }]}>Sign Out</Text>
                  <Text style={[styles.actionSub, { color: colors.subtext }]}>Disconnect your Google Account</Text>
                </View>
                <ChevronRight size={18} color={colors.subtext} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </ScreenBackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
  },
  profileCard: {
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    marginBottom: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  avatarFallback: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  userNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Outfit-Bold',
  },
  userEmailText: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Outfit-Medium',
  },
  badgeRow: {
    marginTop: 12,
    flexDirection: 'row',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'Outfit-Medium',
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
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Outfit-Medium',
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Outfit-Bold',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  actionIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  actionTextDetails: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Outfit-Bold',
  },
  actionSub: {
    fontSize: 11,
    marginTop: 2,
    fontFamily: 'Outfit-Medium',
  },
});
