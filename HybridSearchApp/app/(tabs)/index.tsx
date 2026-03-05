import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function HomeScreen() {
  return (
      <SafeAreaView style={styles.container}>
        <WebView
            source={{ uri: 'https://www.google.com' }}
            style={styles.webview}
        />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    width: '100%',
    height: '100%',
  },
});