import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { getPromotions, PromotionItem } from '../../lib/firebaseApi';
import { promotionsStyles as styles } from '../../styles/promotions.styles';
import { useLanguage } from '../../contexts/LanguageContext';

export default function PromotionsScreen() {
  const { t, isRTL } = useLanguage();

  const {
    data: promotions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['promotions'],
    queryFn: getPromotions,
  });

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={[styles.pageTitle, isRTL && { textAlign: 'right' }]}>
          {t.promotions}
        </Text>

        {isLoading && (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Loading promotions...
          </Text>
        )}

        {isError && (
          <View style={styles.listContent}>
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
              {error instanceof Error ? error.message : 'Error loading promotions'}
            </Text>
          </View>
        )}

        {!isLoading && !isError && (
          <FlatList
            data={promotions}
            keyExtractor={(item: PromotionItem) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={{ textAlign: 'center', marginTop: 20 }}>
                No promotions found
              </Text>
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.topRow}>
                  <Text style={[styles.cardTitle, isRTL && { textAlign: 'right' }]}>
                    {item.title}
                  </Text>

                  <View style={[styles.tagBadge, { backgroundColor: item.tagBg }]}>
                    <Text style={[styles.tagText, { color: item.tagColor }]}>
                      {item.tag}
                    </Text>
                  </View>
                </View>

                <Text style={[styles.cardDesc, isRTL && { textAlign: 'right' }]}>
                  {item.description}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}