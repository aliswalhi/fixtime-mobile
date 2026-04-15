import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="worker-intro" />
      <Stack.Screen name="become-worker" />
      <Stack.Screen name="registration-success" />
    </Stack>
  );
}
