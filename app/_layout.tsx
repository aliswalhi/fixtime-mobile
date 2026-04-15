import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider from '../contexts/auth-context';
import { LanguageProvider } from '../contexts/LanguageContext';
import { useAuth } from '../hooks/use-auth';

const queryClient = new QueryClient();

function RootNavigator() {
  const { isAuthenticated, isReady } = useAuth();

  if (!isReady) return null;

  if (!isAuthenticated) {
    return <Redirect href={'/(auth)/login' as any} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="worker-intro" />
      <Stack.Screen name="become-worker" />
      <Stack.Screen name="modal" />
      <Stack.Screen name="registration-success" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <SafeAreaProvider>
            <RootNavigator />
          </SafeAreaProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}