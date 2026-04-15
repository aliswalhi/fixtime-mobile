import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LanguageProvider } from '../contexts/LanguageContext';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </SafeAreaProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}