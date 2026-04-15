import { QueryClientProvider } from '@tanstack/react-query';
import { Stack, router, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';
import AuthProvider from '../contexts/auth-context';
import { useAuth } from '../hooks/use-auth';
import { queryClient } from '../hooks/query-client';

function AppLoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <View style={styles.loadingLogoBox}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.loadingLogo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.loadingTitle}>FixTime</Text>
      <Text style={styles.loadingSubtitle}>Checking your session...</Text>
    </View>
  );
}

function RootNavigator() {
  const { isAuthenticated, isReady } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const currentGroup = segments[0];
    const inMainGroup = currentGroup === '(main)';

    if (isAuthenticated && !inMainGroup) {
      router.replace('/home');
      return;
    }

    if (!isAuthenticated && inMainGroup) {
      router.replace('/login');
    }
  }, [isAuthenticated, isReady, segments]);

  if (!isReady) {
    return <AppLoadingScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(main)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  loadingLogoBox: {
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  loadingLogo: {
    width: 96,
    height: 96,
  },
  loadingTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 8,
  },
  loadingSubtitle: {
    fontSize: 15,
    color: colors.textLight,
  },
});
