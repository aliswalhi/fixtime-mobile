import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ServiceCard from '../../components/ServiceCard';
import {
    AppNotification,
    getNotifications,
    getServices,
    ServiceItem,
} from '../../constants/firebaseApi';
import { useLanguage } from '../../contexts/LanguageContext';
import { dashboardStyles as styles } from '../../styles/dashboard.styles';

const serviceToCategoryMap: Record<string, string> = {
  Cleaning: 'All',
  Plumbing: 'Plumber',
  Electrician: 'Electrician',
  Carpenter: 'Carpenter',
  Repairing: 'Mechanic',
  Painting: 'All',
  Mechanic: 'Mechanic',
  'AC Repair': 'All',
  More: 'All',
  'More Services': 'All',
};

export default function DashboardScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  const { t, language, setLanguage, isRTL } = useLanguage();

  const {
    data: notifications = [],
    isLoading: notificationsLoading,
    isError: notificationsError,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
  });

  const {
    data: services = [],
    isLoading: servicesLoading,
    isError: servicesError,
  } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  });

  const translatedServiceTitles: Record<string, string> = {
    Cleaning: t.cleaning,
    Plumbing: t.plumbing,
    Electrician: t.electrician,
    Carpenter: t.carpenter,
    Repairing: t.repairing,
    Painting: t.painting,
    Mechanic: t.mechanic,
    'AC Repair': t.acRepair,
    'More Services': t.moreServices,
    More: t.moreServices,
  };

  const handleServicePress = (title: string) => {
    const category = serviceToCategoryMap[title] || 'All';
    router.push({
      pathname: '/workers',
      params: { category },
    });
  };

  const handleOrderPress = () => {
    router.push('/orders');
  };

  const openMenu = () => {
    setNotificationsVisible(false);
    setMenuVisible(true);
  };

  const openNotifications = () => {
    setMenuVisible(false);
    setNotificationsVisible(true);
  };

  const closePanels = () => {
    setMenuVisible(false);
    setNotificationsVisible(false);
    setShowLanguageOptions(false);
  };

  const handleMenuItemPress = (key: string) => {
    if (key === 'language') {
      setShowLanguageOptions((prev) => !prev);
      return;
    }
  };

  const menuItems = [
    { id: '1', key: 'myProfile', title: t.myProfile },
    { id: '2', key: 'contactUs', title: t.contactUs },
    { id: '3', key: 'becomeWorker', title: t.becomeWorker },
    { id: '4', key: 'language', title: t.language },
    { id: '5', key: 'logout', title: t.logout },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.brandName}>FixTime</Text>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.iconButton}
              activeOpacity={0.85}
              onPress={openNotifications}
            >
              <Text style={styles.iconText}>🔔</Text>
              <View style={styles.notificationDot} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              activeOpacity={0.85}
              onPress={openMenu}
            >
              <Text style={styles.iconText}>☰</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchWrapper}>
          <TextInput
            placeholder={t.searchHire}
            placeholderTextColor="#A0A0A0"
            style={[styles.searchInput, isRTL && { textAlign: 'right' }]}
          />
        </View>

        <View style={styles.orderButtonWrapper}>
          <TouchableOpacity
            style={styles.orderButton}
            activeOpacity={0.85}
            onPress={handleOrderPress}
          >
            <Text style={styles.orderButtonText}>Order</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t.services}</Text>
        </View>

        {servicesLoading ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Loading services...
          </Text>
        ) : servicesError ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Error loading services
          </Text>
        ) : (
          <View style={styles.grid}>
            {services.map((service: ServiceItem) => (
              <ServiceCard
                key={service.id}
                title={translatedServiceTitles[service.title] || service.title}
                icon={service.icon}
                onPress={() => handleServicePress(service.title)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <Modal
        visible={menuVisible || notificationsVisible}
        transparent
        animationType="fade"
        onRequestClose={closePanels}
      >
        <Pressable style={styles.overlay} onPress={closePanels}>
          {menuVisible && (
            <Pressable style={styles.menuPanel} onPress={(e) => e.stopPropagation()}>
              <Text style={styles.panelTitle}>{t.menu}</Text>

              <FlatList
                data={menuItems}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.panelList}
                renderItem={({ item }) => (
                  <View>
                    <TouchableOpacity
                      style={styles.panelItem}
                      activeOpacity={0.85}
                      onPress={() => handleMenuItemPress(item.key)}
                    >
                      <Text style={styles.panelItemText}>{item.title}</Text>
                      <Text style={styles.panelArrow}>›</Text>
                    </TouchableOpacity>

                    {item.key === 'language' && showLanguageOptions && (
                      <View style={styles.languageDropdown}>
                        <TouchableOpacity
                          style={[
                            styles.languageOptionButton,
                            language === 'en' && styles.languageOptionButtonActive,
                          ]}
                          onPress={() => setLanguage('en')}
                        >
                          <Text
                            style={[
                              styles.languageOptionText,
                              language === 'en' && styles.languageOptionTextActive,
                            ]}
                          >
                            {t.english}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.languageOptionButton,
                            language === 'ar' && styles.languageOptionButtonActive,
                          ]}
                          onPress={() => setLanguage('ar')}
                        >
                          <Text
                            style={[
                              styles.languageOptionText,
                              language === 'ar' && styles.languageOptionTextActive,
                            ]}
                          >
                            {t.arabic}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                )}
              />
            </Pressable>
          )}

          {notificationsVisible && (
            <Pressable
              style={styles.notificationsPanel}
              onPress={(e) => e.stopPropagation()}
            >
              <Text style={styles.panelTitle}>{t.notifications}</Text>

              {notificationsLoading ? (
                <Text style={{ textAlign: 'center', marginTop: 12 }}>
                  Loading notifications...
                </Text>
              ) : notificationsError ? (
                <Text style={{ textAlign: 'center', marginTop: 12 }}>
                  Error loading notifications
                </Text>
              ) : (
                <FlatList
                  data={notifications}
                  keyExtractor={(item: AppNotification) => item.id}
                  contentContainerStyle={styles.panelList}
                  ListEmptyComponent={
                    <Text style={{ textAlign: 'center', marginTop: 12 }}>
                      No notifications found
                    </Text>
                  }
                  renderItem={({ item }) => (
                    <View style={styles.notificationItem}>
                      <View
                        style={[styles.notificationIconBox, { backgroundColor: item.color }]}
                      >
                        <Text style={styles.notificationIconText}>!</Text>
                      </View>

                      <View style={styles.notificationTextWrap}>
                        <Text style={styles.notificationTitle}>{item.title}</Text>
                        <Text style={styles.notificationMessage}>{item.message}</Text>
                      </View>
                    </View>
                  )}
                />
              )}
            </Pressable>
          )}
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
