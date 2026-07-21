import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { MainHomeScreen } from '../screens/MainHomeScreen';
import { useAppStore } from '../store/useAppStore';

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const isOnboardingCompleted = useAppStore((state) => state.isOnboardingCompleted);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isOnboardingCompleted ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : (
        <Stack.Screen name="Home" component={MainHomeScreen} />
      )}
    </Stack.Navigator>
  );
};
