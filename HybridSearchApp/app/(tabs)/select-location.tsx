import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useOrder } from './OrderContext';

export default function SelectLocationScreen() {

    const router = useRouter();
    const { setOrder } = useOrder();

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);

    const searchPlaces = async (text: string) => {
        setQuery(text);

        if (text.length < 3) {
            setResults([]);
            return;
        }

        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${text}`
            );

            const data = await res.json();
            setResults(data);
        } catch (e) {
            console.log(e);
        }
    };

    const selectPlace = (item: any) => {
        setOrder((prev: any) => ({
            ...prev,
            address: item.display_name,
            lat: item.lat,
            lng: item.lon,
        }));

        router.back();
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Ionicons name="arrow-back" size={22} onPress={() => router.back()} />
                <Text style={styles.headerText}>Select location</Text>
                <View style={{ width: 22 }} />
            </View>

            <View style={styles.inputRow}>
                <Ionicons name="location-outline" size={18} />
                <TextInput
                    placeholder="Enter Address"
                    style={styles.input}
                    value={query}
                    onChangeText={searchPlaces}
                />
            </View>

            <TouchableOpacity
                style={styles.mapBtn}
                onPress={() => router.push('/map')}
            >
                <Ionicons name="map-outline" size={18} color="#2979ff" />
                <Text style={styles.mapText}>Choose on map</Text>
            </TouchableOpacity>

            {results.length === 0 ? (
                <Text style={styles.noResult}>No results</Text>
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.resultItem}
                            onPress={() => selectPlace(item)}
                        >
                            <Text style={{ fontWeight: 'bold' }}>
                                {item.display_name.split(',')[0]}
                            </Text>

                            <Text style={{ color: 'gray' }}>
                                {item.display_name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dcdde1',
        padding: 15,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 15,
    },

    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 10,
    },

    input: {
        marginLeft: 10,
        flex: 1,
    },

    mapBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },

    mapText: {
        marginLeft: 10,
        color: '#2979ff',
    },

    resultItem: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },

    noResult: {
        marginTop: 40,
        textAlign: 'center',
        color: 'gray',
    },
});