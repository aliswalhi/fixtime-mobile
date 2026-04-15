import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useOrder } from './OrderContext';

export default function MapScreen() {

    const router = useRouter();
    const { setOrder } = useOrder();

    const mapRef = useRef<any>(null);

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<any>(null);

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
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lon);

        const coords = {
            latitude: lat,
            longitude: lng,
        };

        setSelectedLocation(coords);
        setResults([]);
        setQuery(item.display_name);

        mapRef.current.animateToRegion({
            ...coords,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    };

    const onMapPress = (event: any) => {
        const coords = event.nativeEvent.coordinate;
        setSelectedLocation(coords);
        setResults([]);
    };

    const onDone = () => {
        if (!selectedLocation) return;

        setOrder((prev: any) => ({
            ...prev,
            address: query || 'Selected from map',
            lat: selectedLocation.latitude,
            lng: selectedLocation.longitude,
        }));

        router.back();
    };

    return (
        <View style={styles.container}>

            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: 32.2211,
                    longitude: 35.2544,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                onPress={onMapPress}
            >
                {selectedLocation && (
                    <Marker coordinate={selectedLocation} />
                )}
            </MapView>

            <View style={styles.searchContainer}>
                <View style={styles.searchBox}>
                    <Ionicons name="search" size={18} />
                    <TextInput
                        placeholder="Search location"
                        value={query}
                        onChangeText={searchPlaces}
                        style={styles.input}
                    />
                </View>

                {results.length > 0 && (
                    <FlatList
                        data={results.slice(0, 5)}
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.results}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.resultItem}
                                onPress={() => selectPlace(item)}
                            >
                                <Text style={styles.resultTitle}>
                                    {item.display_name.split(',')[0]}
                                </Text>
                                <Text style={styles.resultSub}>
                                    {item.display_name}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>

            <TouchableOpacity style={styles.doneBtn} onPress={onDone}>
                <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    map: {
        flex: 1,
    },

    searchContainer: {
        position: 'absolute',
        top: 50,
        left: 15,
        right: 15,
    },

    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 10,
        height: 45,
        elevation: 3,
    },

    input: {
        marginLeft: 10,
        flex: 1,
    },

    results: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginTop: 5,
        maxHeight: 200,
        elevation: 3,
    },

    resultItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },

    resultTitle: {
        fontWeight: 'bold',
    },

    resultSub: {
        fontSize: 12,
        color: 'gray',
    },

    doneBtn: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    doneText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});