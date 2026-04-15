import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import { serviceCardStyles as styles } from '../styles/serviceCard.styles';

type ServiceCardProps = {
  title: string;
  icon: string;
  onPress?: () => void;
};

const renderServiceIcon = (icon: string) => {
  switch (icon) {
    case 'cleaning':
      return <MaterialCommunityIcons name="broom" size={22} color="#111827" />;
    case 'plumbing':
      return <MaterialCommunityIcons name="pipe-wrench" size={22} color="#111827" />;
    case 'electrician':
      return <Ionicons name="flash-outline" size={22} color="#111827" />;
    case 'carpenter':
      return <MaterialCommunityIcons name="hammer" size={22} color="#111827" />;
    case 'repairing':
      return <Feather name="tool" size={20} color="#111827" />;
    case 'painting':
      return <MaterialCommunityIcons name="palette-outline" size={22} color="#111827" />;
    case 'mechanic':
      return <MaterialCommunityIcons name="car-wrench" size={22} color="#111827" />;
    case 'ac':
      return <MaterialCommunityIcons name="snowflake" size={22} color="#111827" />;
    case 'more':
      return <Feather name="plus" size={22} color="#111827" />;
    default:
      return <Feather name="grid" size={22} color="#111827" />;
  }
};

export default function ServiceCard({ title, icon, onPress }: ServiceCardProps) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <View style={styles.iconWrap}>{renderServiceIcon(icon)}</View>

      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}