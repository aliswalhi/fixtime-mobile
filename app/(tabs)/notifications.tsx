import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { notifications } from '../../data/mock';
import { notificationsStyles as styles } from '../../styles/notifications.styles';

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Notifications</Text>

        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                <Text style={styles.iconText}>!</Text>
              </View>

              <View style={styles.textWrap}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardMessage}>{item.message}</Text>
              </View>

              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}