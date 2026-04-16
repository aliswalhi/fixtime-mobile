import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../../contexts/LanguageContext';
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

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState<OrderTab>('active');
  const { t, isRTL } = useLanguage();

  const orderTabs: { key: OrderTab; label: string }[] = [
    { key: 'active', label: t.active },
    { key: 'completed', label: t.completed },
  ];

  const orderItems: OrderItem[] = [
    {
      id: '1',
      title: t.orderHomeDeepCleaning,
      subtitle: t.orderHomeDeepCleaningSubtitle,
      status: 'active',
      statusLabel: t.inProgress,
      statusBg: '#E8F1FF',
      statusColor: '#2563EB',
      time: t.orderTimeToday,
    },
    {
      id: '2',
      title: t.orderKitchenPlumbingRepair,
      subtitle: t.orderKitchenPlumbingRepairSubtitle,
      status: 'active',
      statusLabel: t.confirmed,
      statusBg: '#FEF3C7',
      statusColor: '#B45309',
      time: t.orderTimeTomorrow,
    },
    {
      id: '3',
      title: t.orderAcMaintenance,
      subtitle: t.orderAcMaintenanceSubtitle,
      status: 'completed',
      statusLabel: t.completed,
      statusBg: '#EAF8EE',
      statusColor: '#22A45D',
      time: t.orderTimeCompleted,
    },
  ];

  const filteredOrders = orderItems.filter((item) => item.status === activeTab);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={[styles.pageTitle, isRTL && { textAlign: 'right' }]}>{t.orders}</Text>
        <Text style={[styles.subtitle, isRTL && { textAlign: 'right' }]}>
          {t.trackOrders}
        </Text>

        <View style={styles.tabsRow}>
          {orderTabs.map((tab) => {
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
              <Text style={styles.emptyTitle}>{t.noOrders}</Text>
              <Text style={styles.emptyText}>{t.ordersAppearHere}</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardTextWrap}>
                <Text style={[styles.cardTitle, isRTL && { textAlign: 'right' }]}>
                  {item.title}
                </Text>
                <Text style={[styles.cardSubtitle, isRTL && { textAlign: 'right' }]}>
                  {item.subtitle}
                </Text>
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
