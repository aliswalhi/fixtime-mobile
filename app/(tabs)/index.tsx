import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useCallback } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeaderWithPanels from '../../components/AppHeaderWithPanels';
import ServiceCard from '../../components/ServiceCard';

import { useLanguage } from '../../contexts/LanguageContext';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';

import {
  getServices,
  ServiceItem,
} from '../../lib/firebaseApi';

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
  const isConnected = useNetworkStatus();

  const { t } = useLanguage();

  const {
    data: services = [],
    isLoading,
    isError,
    refetch,
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

  const handleServicePress = useCallback((title: string) => {
    const category = serviceToCategoryMap[title] || 'All';

    router.push({
      pathname: '/workers',
      params: { category },
    });
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <AppHeaderWithPanels />

      {isConnected === false && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineIcon}>
            📡
          </Text>

          <View style={styles.offlineTextWrap}>
            <Text style={styles.offlineTitle}>
              Offline Mode
            </Text>

            <Text style={styles.offlineText}>
              No internet connection detected
            </Text>
          </View>
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {t.services}
          </Text>
        </View>

        {isLoading ? (
          <Text style={styles.loadingText}>
            Loading services...
          </Text>
        ) : isError ? (
          <View style={styles.centerBox}>
            <Text style={styles.errorText}>
              Error loading services
            </Text>

            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => refetch()}
            >
              <Text style={styles.retryButtonText}>
                Retry
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.grid}>
            {services.map((service: ServiceItem) => (
              <ServiceCard
                key={service.id}
                title={
                  translatedServiceTitles[service.title] ||
                  service.title
                }
                icon={service.icon}
                onPress={() =>
                  handleServicePress(service.title)
                }
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}