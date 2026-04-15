import React from 'react';
import { Text, FlatList, TouchableOpacity, Alert, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { menuItems } from '../../data/mock';
import { menuStyles as styles } from '../../styles/menu.styles';

export default function MenuScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Menu</Text>

        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => Alert.alert(item.title, `${item.title} pressed`)}
            >
              <Text style={styles.itemText}>{item.title}</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}