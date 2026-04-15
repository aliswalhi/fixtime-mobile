import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors } from '../styles/theme';

type Props = {
  title: string;
  subtitle: string;
  onPress?: () => void;
};

export default function ActionCard({ title, subtitle, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: colors.subtext,
  },
  arrow: {
    fontSize: 22,
    color: '#9CA3AF',
  },
});