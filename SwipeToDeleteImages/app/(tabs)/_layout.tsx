import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import HomeScreen from './index';


export default function TabLayout() {
  const colorScheme = 'dark';

  return (
    <Stack >
      <Stack.Screen name="index"  options={{ headerShown: false }} />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
