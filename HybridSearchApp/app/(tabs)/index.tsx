import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useOrder } from './OrderContext';

export default function CategoriesScreen() {

    const router = useRouter();
    const { setOrder } = useOrder();

    const selectCategory = (title: string, iconName: string, iconType: string) => {
        setOrder((prev: any) => ({
            ...prev,
            category: title,
            icon: iconName,
            type: iconType,
        }));

        router.push('/place-order');
    };

    const renderIcon = (name: string, type: string) => {
        if (type === 'fa') {
            return <FontAwesome5 name={name as any} size={28} color="#6c63ff" />;
        }
        return <MaterialIcons name={name as any} size={28} color="#ff9800" />;
    };

    const renderCard = (title: string, iconName: string, iconType: string) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => selectCategory(title, iconName, iconType)}
        >
            {renderIcon(iconName, iconType)}
            <Text style={styles.cardText}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={22} />
                <Text style={styles.headerText}>Categories</Text>
                <View style={{ width: 22 }} />
            </View>

            <View style={styles.grid}>
                {renderCard("Cleaning", "broom", "fa")}
                {renderCard("Repairing", "build", "material")}
                {renderCard("Electrician", "electrical-services", "material")}
                {renderCard("Carpenter", "tools", "fa")}
                {renderCard("Painting", "format-paint", "material")}
                {renderCard("Plumbing", "plumbing", "material")}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dcdde1',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: 'white',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 15,
    },
    card: {
        width: '30%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        marginBottom: 15,
        elevation: 3,
    },
    cardText: {
        marginTop: 8,
        fontSize: 12,
    },
});