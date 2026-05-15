import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { actionCardStyles as styles } from '../styles/actionCard.styles';

type Props = {
  title: string;
  subtitle: string;
  onPress?: () => void;
};

export default function ActionCard({
  title,
  subtitle,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View>
        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      </View>

      <Text style={styles.arrow}>
        ›
      </Text>
    </TouchableOpacity>
  );
}