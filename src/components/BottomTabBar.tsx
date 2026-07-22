import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Palette, User, LucideIcon } from 'lucide-react-native';
import { useTheme } from '../theme/useTheme';

const TAB_ICONS: Record<string, LucideIcon> = {
  Home: Home,
  Theme: Palette,
  Profile: User,
};

export const CustomBottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 12),
          backgroundColor: isDark ? 'rgba(18, 14, 38, 0.88)' : 'rgba(255, 255, 255, 0.92)',
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.tabBarInner}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const label =
            options.tabBarLabel !== undefined
              ? (options.tabBarLabel as string)
              : options.title !== undefined
              ? options.title
              : route.name;

          const IconComponent = TAB_ICONS[route.name] || Home;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              style={[
                styles.tabButton,
                isFocused && [
                  styles.activeTabButton,
                  { backgroundColor: colors.primary + '1F' },
                ],
              ]}
            >
              <IconComponent
                size={22}
                color={isFocused ? colors.primary : colors.subtext}
                strokeWidth={isFocused ? 2.5 : 2}
              />
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: isFocused ? colors.primary : colors.subtext,
                    fontWeight: isFocused ? '700' : '500',
                  },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    paddingTop: 10,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  tabBarInner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 16,
    marginHorizontal: 6,
  },
  activeTabButton: {
    paddingHorizontal: 12,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
    fontFamily: 'Outfit-Medium',
  },
});
