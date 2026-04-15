import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { Worker } from '../constants/firebaseApi';
import { useLanguage } from '../contexts/LanguageContext';
import { workerCardStyles as styles } from '../styles/workerCard.styles';

type Props = {
  worker: Worker;
};

export default function WorkerCard({ worker }: Props) {
  const [userRating, setUserRating] = useState<number>(0);
  const { t, isRTL } = useLanguage();

  const handleRate = (rating: number) => {
    setUserRating(rating);
  };

  const translatedServiceMap: Record<string, string> = {
    Electrician: t.electrician,
    Plumber: t.plumber,
    Mechanic: t.mechanic,
    Carpenter: t.carpenter,
  };

  const handleShowInfo = () => {
    Alert.alert(
      worker.name,
      `${t.service}: ${translatedServiceMap[worker.service] || worker.service}
${t.workingHours}: ${worker.workingHours}
${t.phone}: ${worker.phone || t.notAvailable}
${t.email}: ${worker.email || t.notAvailable}
${t.description}: ${worker.description || t.noDescription}`
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarIcon}>👷</Text>
      </View>

      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text
            style={[styles.name, isRTL && { textAlign: 'right' }]}
            numberOfLines={1}
          >
            {worker.name}
          </Text>

          <View
            style={[
              styles.badge,
              { backgroundColor: worker.available ? '#EAF8EE' : '#FDECEC' },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                { color: worker.available ? '#22A45D' : '#D9534F' },
              ]}
            >
              {worker.available ? t.available : t.busy}
            </Text>
          </View>
        </View>

        <Text style={[styles.service, isRTL && { textAlign: 'right' }]}>
          {translatedServiceMap[worker.service] || worker.service}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.meta}>⭐ {worker.rating} ({worker.reviewsCount})</Text>
          <Text style={styles.meta}>📍 {worker.distance}</Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.meta}>💵 ${worker.pricePerHour}/hr</Text>
          <Text style={styles.meta}>🕒 {worker.workingHours}</Text>
        </View>

        <TouchableOpacity style={styles.infoButton} onPress={handleShowInfo}>
          <Text style={styles.infoButtonText}>{t.moreInfo}</Text>
        </TouchableOpacity>

        <View style={styles.ratingSection}>
          <Text style={[styles.ratingLabel, isRTL && { textAlign: 'right' }]}>
            {t.rateWorker}
          </Text>

          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleRate(star)}
                activeOpacity={0.8}
                style={styles.starButton}
              >
                <Text style={[styles.starText, userRating >= star && styles.activeStarText]}>
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {userRating > 0 && (
            <Text style={[styles.userRatingText, isRTL && { textAlign: 'right' }]}>
              {t.yourRating} {userRating}/5
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}