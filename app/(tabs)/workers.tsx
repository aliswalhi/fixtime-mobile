import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeaderWithPanels from '../../components/AppHeaderWithPanels';
import WorkerCard from '../../components/WorkerCard';
import { useLanguage } from '../../contexts/LanguageContext';
import { useWorkerRatings } from '../../hooks/useWorkerRatings';
import { getWorkers } from '../../lib/firebaseApi';
import { workersStyles as styles } from '../../styles/workers.styles';

const categories = ['All', 'Electrician', 'Plumber', 'Mechanic', 'Carpenter'];

export default function WorkersScreen() {
  const params = useLocalSearchParams<{ category?: string }>();
  const { t, isRTL } = useLanguage();
  const { ratings, rateWorker } = useWorkerRatings();

  const initialCategory =
    typeof params.category === 'string' && categories.includes(params.category)
      ? params.category
      : 'All';

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const {
    data: workers = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['workers'],
    queryFn: getWorkers,
  });

  useEffect(() => {
    if (
      typeof params.category === 'string' &&
      categories.includes(params.category)
    ) {
      setSelectedCategory(params.category);
    } else {
      setSelectedCategory('All');
    }
  }, [params.category]);

  const translatedCategories: Record<string, string> = {
    All: t.all,
    Electrician: t.electrician,
    Plumber: t.plumber,
    Mechanic: t.mechanic,
    Carpenter: t.carpenter,
  };

  const filteredWorkers = useMemo(() => {
    return workers.filter((worker) => {
      const matchesSearch =
        worker.name.toLowerCase().includes(search.toLowerCase()) ||
        worker.service.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || worker.service === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [workers, search, selectedCategory]);

  return (
    <SafeAreaView style={styles.screen}>
      <AppHeaderWithPanels />

      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={[styles.title, isRTL && styles.textRight]}>
            {t.workerList}
          </Text>

          <Text style={[styles.subtitle, isRTL && styles.textRight]}>
            {t.findNearbyWorkers}
          </Text>

          <TextInput
            style={[styles.searchInput, isRTL && styles.textRight]}
            placeholder={t.searchWorker}
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.filtersWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.filtersContainer,
              isRTL && styles.rowReverse,
            ]}
          >
            {categories.map((item) => {
              const isActive = selectedCategory === item;

              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => setSelectedCategory(item)}
                  activeOpacity={0.85}
                  style={[
                    styles.filterChip,
                    isActive && styles.activeFilterChip,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterText,
                      isActive && styles.activeFilterText,
                    ]}
                  >
                    {translatedCategories[item]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {isLoading && (
          <Text style={styles.loadingText}>Loading workers...</Text>
        )}

        {isError && (
          <View style={styles.errorBox}>
            <Text style={styles.errorTitle}>Error loading workers</Text>

            <Text style={styles.errorText}>
              {error instanceof Error ? error.message : 'Unknown error'}
            </Text>
          </View>
        )}

        {!isLoading && !isError && (
          <FlatList
            data={filteredWorkers}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <WorkerCard
                worker={item}
                savedRating={ratings[item.id]}
                onRateWorker={rateWorker}
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                <Text style={styles.emptyTitle}>{t.noWorkers}</Text>
                <Text style={styles.emptyText}>{t.tryAnother}</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}