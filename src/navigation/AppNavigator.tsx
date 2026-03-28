import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthNavigator } from './AuthNavigator';
import { TabNavigator } from './TabNavigator';
import { CameraScreen, LeaderboardScreen } from '../screens/core';
import { CommentsScreen, FeedScreen } from '../screens/social';
import { SettingsScreen, ProfileScreen } from '../screens/profile';
import { StreakScreen, BadgesScreen, RewardsScreen } from '../screens/gamification';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={TabNavigator} />
      
      {/* Global / Modal Screens */}
      <Stack.Screen 
        name="Camera" 
        component={CameraScreen} 
        options={{ presentation: 'fullScreenModal' }}
      />
      <Stack.Screen name="Comments" component={CommentsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="StreakDetail" component={StreakScreen} />
      <Stack.Screen name="Badges" component={BadgesScreen} />
      <Stack.Screen name="Rewards" component={RewardsScreen} />
    </Stack.Navigator>
  );
};
