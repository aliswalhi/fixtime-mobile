import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useLanguage } from '../contexts/LanguageContext';
import { Worker } from '../lib/firebaseApi';
import { workerCardStyles as styles } from '../styles/workerCard.styles';

type Props = {
  worker: Worker;
  savedRating?: number;
  onRateWorker: (workerId: string, rating: number) => void;
};

export default function WorkerCard({
  worker,
  savedRating,
  onRateWorker,
}: Props) {
  const { t, isRTL } = useLanguage();

  const translatedServiceMap: Record<string, string> = {
    Electrician: t.electrician,
    Plumber: t.plumber,
    Mechanic: t.mechanic,
    Carpenter: t.carpenter,
  };

  const displayRating =
    savedRating !== undefined ? savedRating : worker.rating;

  return (
    <View style={styles.card}>
      <View style={[styles.headerRow, isRTL && styles.rowReverse]}>
        <View style={styles.avatarBox}>
          <Text style={styles.avatarIcon}>👷</Text>
        </View>

        <View style={styles.info}>
          <View style={[styles.nameRow, isRTL && styles.rowReverse]}>
            <Text
              numberOfLines={1}
              style={[styles.name, isRTL && styles.textRight]}
            >
              {worker.name}
            </Text>

            <View
              style={[
                styles.badge,
                worker.available ? styles.availableBadge : styles.busyBadge,
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  worker.available
                    ? styles.availableText
                    : styles.busyText,
                ]}
              >
                {worker.available ? t.available : t.busy}
              </Text>
            </View>
          </View>

          <Text style={[styles.service, isRTL && styles.textRight]}>
            {translatedServiceMap[worker.service] || worker.service}
          </Text>

          <View style={[styles.metaRow, isRTL && styles.rowReverse]}>
            <Text style={styles.meta}>⭐ {displayRating} ({worker.reviewsCount})</Text>
            <Text style={styles.meta}>📍 {worker.distance}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.detailsRow, isRTL && styles.rowReverse]}>
        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>Price</Text>
          <Text style={styles.detailValue}>${worker.pricePerHour}/hr</Text>
        </View>

        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>Hours</Text>
          <Text style={styles.detailValue}>{worker.workingHours}</Text>
        </View>
      </View>

      <View style={styles.ratingBox}>
        <View style={[styles.ratingHeader, isRTL && styles.rowReverse]}>
          <View>
            <Text style={[styles.ratingTitle, isRTL && styles.textRight]}>
              {t.rateWorker}
            </Text>

            {savedRating !== undefined && (
              <Text style={[styles.ratingSubtitle, isRTL && styles.textRight]}>
                {t.yourRating} {savedRating}/5
              </Text>
            )}
          </View>
        </View>

        <View style={[styles.starsRow, isRTL && styles.rowReverse]}>
          {[1, 2, 3, 4, 5].map((star) => {
            const active = savedRating !== undefined && star <= savedRating;

            return (
              <TouchableOpacity
                key={star}
                onPress={() => onRateWorker(worker.id, star)}
                activeOpacity={0.7}
              >
                <Text style={[styles.star, active && styles.activeStar]}>
                  ★
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}