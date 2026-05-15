import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeaderWithPanels from '../../components/AppHeaderWithPanels';
import { useLanguage } from '../../contexts/LanguageContext';
import { getPromoPosts } from '../../lib/apiClient';
import { promotionsStyles as styles } from '../../styles/promotions.styles';

export default function PromotionsScreen() {
  const { isRTL } = useLanguage();
  const { width } = useWindowDimensions();

  const isLargeScreen = width >= 768;
  const numColumns = isLargeScreen ? 2 : 1;

  const {
    data: promotions = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['axios-promotions'],
    queryFn: getPromoPosts,
  });

  return (
    <SafeAreaView style={styles.screen}>
      <AppHeaderWithPanels />

      <View style={styles.content}>
        <Text style={[styles.pageTitle, isRTL && styles.textRight]}>
          Promotions
        </Text>

        {isLoading && (
          <Text style={styles.centerText}>Loading promotions...</Text>
        )}

        {isError && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>
              {error instanceof Error
                ? error.message
                : 'Error loading promotions'}
            </Text>

            <TouchableOpacity onPress={() => refetch()} style={styles.retryBtn}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {!isLoading && !isError && (
          <FlatList
            key={numColumns}
            numColumns={numColumns}
            data={promotions}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={
              isLargeScreen ? styles.columnWrapper : undefined
            }
            renderItem={({ item, index }) => (
              <View style={[styles.card, isLargeScreen && styles.cardLarge]}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardTextWrap}>
                    <Text
                      style={[styles.cardTitle, isRTL && styles.textRight]}
                      numberOfLines={2}
                    >
                      {item.title}
                    </Text>

                    <Text
                      style={[styles.cardDesc, isRTL && styles.textRight]}
                      numberOfLines={3}
                    >
                      {item.description}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tagBadge,
                      index % 2 === 0 ? styles.greenTag : styles.blueTag,
                    ]}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        index % 2 === 0
                          ? styles.greenTagText
                          : styles.blueTagText,
                      ]}
                    >
                      {item.tag}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}