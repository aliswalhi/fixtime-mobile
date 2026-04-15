import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ordersStyles as styles } from '../../styles/orders.styles';

type OrderTab = 'active' | 'completed';

type OrderItem = {
  id: string;
  title: string;
  subtitle: string;
  status: OrderTab;
  statusLabel: string;
  statusBg: string;
  statusColor: string;
  time: string;
};

const ORDER_TABS: { key: OrderTab; label: string }[] = [
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

const ORDER_ITEMS: OrderItem[] = [
  {
    id: '1',
    title: 'Home deep cleaning',
    subtitle: 'Scheduled with a cleaner for today',
    status: 'active',
    statusLabel: 'In Progress',
    statusBg: '#E8F1FF',
    statusColor: '#2563EB',
    time: 'Today, 2:30 PM',
  },
  {
    id: '2',
    title: 'Kitchen plumbing repair',
    subtitle: 'Worker is on the way to your location',
    status: 'active',
    statusLabel: 'Confirmed',
    statusBg: '#FEF3C7',
    statusColor: '#B45309',
    time: 'Tomorrow, 11:00 AM',
  },
  {
    id: '3',
    title: 'AC maintenance',
    subtitle: 'Service completed and payment received',
    status: 'completed',
    statusLabel: 'Completed',
    statusBg: '#EAF8EE',
    statusColor: '#22A45D',
    time: 'Apr 10, 4:15 PM',
  },
];

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState<OrderTab>('active');

  const filteredOrders = ORDER_ITEMS.filter((item) => item.status === activeTab);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Orders</Text>
        <Text style={styles.subtitle}>Track your current and completed requests.</Text>

        <View style={styles.tabsRow}>
          {ORDER_TABS.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <TouchableOpacity
                key={tab.key}
                style={styles.tabButton}
                activeOpacity={0.85}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                  {tab.label}
                </Text>
                {isActive ? <View style={styles.activeLine} /> : null}
              </TouchableOpacity>
            );
          })}
        </View>

        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyTitle}>No orders found</Text>
              <Text style={styles.emptyText}>Your requests will appear here.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardTextWrap}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </View>

              <View style={styles.bottomRow}>
                <View style={[styles.statusBadge, { backgroundColor: item.statusBg }]}>
                  <Text style={[styles.statusText, { color: item.statusColor }]}>
                    {item.statusLabel}
                  </Text>
                </View>

                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
