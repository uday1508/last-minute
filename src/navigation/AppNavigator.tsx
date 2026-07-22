import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { OnboardingScreen } from '../screens/OnboardingScreen';
import { MainHomeScreen } from '../screens/MainHomeScreen';
import { ThemeCustomizationScreen } from '../screens/ThemeCustomizationScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { CustomBottomTabBar } from '../components/BottomTabBar';
import { useAppStore } from '../store/useAppStore';

export type MainTabParamList = {
  Home: undefined;
  Theme: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Onboarding: undefined;
  MainTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Official React Navigation Bottom Tab Navigator
const MainBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomBottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={MainHomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Theme" component={ThemeCustomizationScreen} options={{ tabBarLabel: 'Theme' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const isOnboardingCompleted = useAppStore((state) => state.isOnboardingCompleted);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isOnboardingCompleted ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : (
        <Stack.Screen name="MainTabs" component={MainBottomTabNavigator} />
      )}
    </Stack.Navigator>
  );
};
