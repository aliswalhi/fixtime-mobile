import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Redirect, Stack, useSegments } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider from '../contexts/auth-context';
import { LanguageProvider } from '../contexts/LanguageContext';
import { useAuth } from '../hooks/use-auth';

const queryClient = new QueryClient();

function RootNavigator() {
  const { isAuthenticated, isReady } = useAuth();
  const segments = useSegments();
  const inAuthGroup = segments[0] === '(auth)';

  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f6ffe9',
        }}
      >
        <ActivityIndicator size="large" color="#4f9d2f" />
      </View>
    );
  }

  if (!isAuthenticated && !inAuthGroup) {
    return <Redirect href="/login" />;
  }

  if (isAuthenticated && inAuthGroup) {
    return <Redirect href="/" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="place-order" />
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
