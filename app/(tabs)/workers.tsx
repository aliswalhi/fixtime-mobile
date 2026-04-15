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
import WorkerCard from '../../components/WorkerCard';
import { getWorkers } from '../../constants/firebaseApi';
import { useLanguage } from '../../contexts/LanguageContext';
import { workersStyles as styles } from '../../styles/workers.styles';

const categories = ['All', 'Electrician', 'Plumber', 'Mechanic', 'Carpenter'];

export default function WorkersScreen() {
  const params = useLocalSearchParams<{ category?: string }>();
  const { t, isRTL } = useLanguage();

  const initialCategory =
    typeof params.category === 'string' && categories.includes(params.category)
      ? params.category
      : 'All';

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const { data: workers = [], isLoading, isError, error } = useQuery({
    queryKey: ['workers'],
    queryFn: getWorkers,
  });

  useEffect(() => {
    if (typeof params.category === 'string' && categories.includes(params.category)) {
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
      <View style={styles.content}>
        <Text style={[styles.pageTitle, isRTL && { textAlign: 'right' }]}>{t.workerList}</Text>
        <Text style={[styles.subtitle, isRTL && { textAlign: 'right' }]}>
          {t.findNearbyWorkers}
        </Text>

        <TextInput
          style={[styles.input, isRTL && { textAlign: 'right' }]}
          placeholder={t.searchWorker}
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.filtersWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContainer}
          >
            {categories.map((item) => {
              const isActive = selectedCategory === item;

              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.filterChip, isActive && styles.activeFilterChip]}
                  onPress={() => setSelectedCategory(item)}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.filterText, isActive && styles.activeFilterText]}>
                    {translatedCategories[item]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {isLoading && (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading workers...</Text>
        )}

        {isError && (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>Error loading workers</Text>
            <Text style={styles.emptyText}>
              {error instanceof Error ? error.message : 'Unknown error'}
            </Text>
          </View>
        )}

        {!isLoading && !isError && (
          <FlatList
            style={styles.list}
            data={filteredWorkers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <WorkerCard worker={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
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