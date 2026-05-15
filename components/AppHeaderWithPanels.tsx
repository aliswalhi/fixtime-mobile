import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useLanguage } from '../contexts/LanguageContext';
import { AppNotification, getNotifications } from '../lib/firebaseApi';
import { appHeaderStyles as styles } from '../styles/appHeader.styles';

type Props = {
  title?: string;
};

export default function AppHeaderWithPanels({ title = 'FixTime' }: Props) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  const { t, language, setLanguage } = useLanguage();

  const {
    data: notifications = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
  });

  const openMenu = useCallback(() => {
    setNotificationsVisible(false);
    setMenuVisible(true);
  }, []);

  const openNotifications = useCallback(() => {
    setMenuVisible(false);
    setNotificationsVisible(true);
  }, []);

  const closePanels = useCallback(() => {
    setMenuVisible(false);
    setNotificationsVisible(false);
    setShowLanguageOptions(false);
  }, []);

  const handleLanguageChange = useCallback(
    (newLanguage: 'en' | 'ar') => {
      setLanguage(newLanguage);
      closePanels();
    },
    [setLanguage, closePanels]
  );

  const handleMenuPress = useCallback(
    (key: string) => {
      if (key === 'home') {
        router.push('/');
        closePanels();
        return;
      }

      if (key === 'workers') {
        router.push('/workers');
        closePanels();
        return;
      }

      if (key === 'promotions') {
        router.push('/promotions');
        closePanels();
        return;
      }

      if (key === 'language') {
        setShowLanguageOptions((prev) => !prev);
      }
    },
    [closePanels]
  );

  const menuItems = [
    { id: '1', key: 'home', title: t.home },
    { id: '2', key: 'workers', title: t.workers },
    { id: '3', key: 'promotions', title: t.promotions },
    { id: '4', key: 'language', title: t.language },
  ];

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.logo}>{title}</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.iconButton}
            activeOpacity={0.85}
            onPress={openNotifications}
          >
            <Ionicons name="notifications-outline" size={24} color="#008F45" />
            <View style={styles.dot} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            activeOpacity={0.85}
            onPress={openMenu}
          >
            <Ionicons name="menu" size={26} color="#008F45" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={menuVisible || notificationsVisible}
        transparent
        animationType="fade"
        onRequestClose={closePanels}
      >
        <Pressable style={styles.overlay} onPress={closePanels}>
          {menuVisible && (
            <Pressable
              style={styles.menuPanel}
              onPress={(e) => e.stopPropagation()}
            >
              {menuItems.map((item) => (
                <View key={item.id}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.menuItem}
                    onPress={() => handleMenuPress(item.key)}
                  >
                    <Text style={styles.menuItemText}>{item.title}</Text>

                    {item.key === 'language' && (
                      <Text style={styles.languageText}>
                        {language === 'ar' ? 'Arabic' : 'English'}
                      </Text>
                    )}
                  </TouchableOpacity>

                  {item.key === 'language' && showLanguageOptions && (
                    <View style={styles.languageBox}>
                      <TouchableOpacity
                        style={styles.languageOption}
                        onPress={() => handleLanguageChange('en')}
                      >
                        <Text
                          style={
                            language === 'en'
                              ? styles.languageActive
                              : styles.languageInactive
                          }
                        >
                          English
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.languageOption}
                        onPress={() => handleLanguageChange('ar')}
                      >
                        <Text
                          style={
                            language === 'ar'
                              ? styles.languageActive
                              : styles.languageInactive
                          }
                        >
                          العربية
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}
            </Pressable>
          )}

          {notificationsVisible && (
            <Pressable
              style={styles.notificationsPanel}
              onPress={(e) => e.stopPropagation()}
            >
              <Text style={styles.panelTitle}>{t.notifications}</Text>

              {isLoading ? (
                <Text style={styles.panelLoadingText}>Loading...</Text>
              ) : isError ? (
                <View style={styles.centerBox}>
                  <Text style={styles.errorText}>
                    Error loading notifications
                  </Text>

                  <TouchableOpacity
                    onPress={() => refetch()}
                    style={styles.retryButton}
                  >
                    <Text style={styles.retryButtonText}>Retry</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <FlatList
                  data={notifications}
                  keyExtractor={(item: AppNotification) => item.id}
                  contentContainerStyle={styles.panelList}
                  renderItem={({ item }) => (
                    <View style={styles.notificationItem}>
                      <View
                        style={[
                          styles.notificationIconBox,
                          { backgroundColor: item.color || '#E8F3FF' },
                        ]}
                      >
                        <Text style={styles.notificationIconText}>!</Text>
                      </View>

                      <View style={styles.notificationTextWrap}>
                        <Text style={styles.notificationTitle}>
                          {item.title}
                        </Text>

                        <Text style={styles.notificationMessage}>
                          {item.message}
                        </Text>
                      </View>
                    </View>
                  )}
                />
              )}
            </Pressable>
          )}
        </Pressable>
      </Modal>
    </>
  );
}