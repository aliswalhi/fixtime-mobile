import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { menuItems } from '@/data/mock';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../hooks/use-auth';
import { logout } from '../../services/auth/http/auth-api';
import { menuStyles as styles } from '../../styles/menu.styles';

export default function MenuScreen() {
  const { language, setLanguage } = useLanguage();
  const { clearAuthenticatedSession } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Always clear the local session even if the logout request fails.
    } finally {
      await clearAuthenticatedSession();
      router.replace('/login');
    }
  };

  const handleMenuItemPress = (item: (typeof menuItems)[number]) => {
    switch (item.key) {
      case 'placeOrder':
        router.push('/place-order');
        return;
      case 'becomeWorker':
        router.push('/worker-intro');
        return;
      case 'contactUs':
        Alert.alert('Contact Us', 'Please contact support@fixtime.com');
        return;
      case 'language': {
        const nextLanguage = language === 'en' ? 'ar' : 'en';
        void setLanguage(nextLanguage);
        return;
      }
      case 'logout':
        void handleLogout();
        return;
      default:
        Alert.alert('Coming Soon', 'This screen is not available yet.');
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Menu</Text>

        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleMenuItemPress(item)}
            >
              <Text style={styles.itemText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={18} color="#111827" />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
