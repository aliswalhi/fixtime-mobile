import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useOrder } from './OrderContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function PlaceOrderScreen() {

    const router = useRouter();
    const { order, setOrder } = useOrder();

    const renderIcon = () => {
        if (!order.icon) return null;

        if (order.type === 'fa') {
            return <FontAwesome5 name={order.icon as any} size={28} color="#6c63ff" />;
        }
        return <MaterialIcons name={order.icon as any} size={28} color="#ff9800" />;
    };

    const handleConfirm = async () => {
        try {
            await addDoc(collection(db, 'orders'), {
                category: order.category || '',
                icon: order.icon || '',
                type: order.type || '',
                address: order.address || '',
                lat: order.lat || '',
                lng: order.lng || '',
                details: order.details || '',
                photo: order.photo || '',
                createdAt: new Date(),
            });

            alert('Order saved successfully');

        } catch (error) {
            console.log(error);
            alert('Error saving order');
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Ionicons name="arrow-back" size={22} onPress={() => router.back()} />
                <Text style={styles.headerText}>Place order</Text>
                <View style={{ width: 22 }} />
            </View>

            <Text style={styles.label}>Category</Text>

            <View style={styles.row}>
                <View style={styles.card}>
                    {order.category ? (
                        <>
                            {renderIcon()}
                            <Text style={styles.cardText}>{order.category}</Text>

                            <TouchableOpacity
                                style={styles.removeBtn}
                                onPress={() =>
                                    setOrder((prev: any) => ({
                                        ...prev,
                                        category: null,
                                        icon: null,
                                        type: null,
                                    }))
                                }
                            >
                                <Text style={{ fontSize: 12 }}>✕</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <Text>No category</Text>
                    )}
                </View>

                <TouchableOpacity
                    style={styles.addCard}
                    onPress={() => router.push('/')}
                >
                    <Text style={{ fontSize: 20 }}>+</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => router.push('/select-location')}
            >
                <Ionicons name="location-outline" size={18} />
                <Text style={styles.actionText}>
                    {order.address ? order.address : "Add Address"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => router.push('/details')}
            >
                <Ionicons name="document-text-outline" size={18} />
                <Text style={styles.actionText}>
                    {order.details ? "Edit details" : "Add details"}
                </Text>
            </TouchableOpacity>

            {order.details && (
                <View style={styles.detailsBox}>
                    <Text>{order.details}</Text>
                </View>
            )}

            <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => router.push('/add-photo')}
            >
                <Ionicons name="image-outline" size={18} />
                <Text style={styles.actionText}>Add photos</Text>
            </TouchableOpacity>

            {order.photo && (
                <Image
                    source={{ uri: order.photo }}
                    style={{ width: 80, height: 80, marginTop: 10, borderRadius: 10 }}
                />
            )}

            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
                <Text style={styles.confirmText}>Confirm Order</Text>
            </TouchableOpacity>

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

    label: {
        marginBottom: 10,
        fontWeight: 'bold',
    },

    row: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
    },

    card: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    addCard: {
        width: 100,
        height: 100,
        backgroundColor: '#eee',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardText: {
        marginTop: 5,
        fontSize: 12,
    },

    removeBtn: {
        position: 'absolute',
        top: 5,
        right: 5,
    },

    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#cfd4e6',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },

    actionText: {
        marginLeft: 10,
    },

    detailsBox: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },

    confirmBtn: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },

    confirmText: {
        color: 'white',
        fontWeight: 'bold',
    },
});