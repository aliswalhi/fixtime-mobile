import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useOrder } from './OrderContext';

export default function DetailsScreen() {

    const router = useRouter();
    const { order, setOrder } = useOrder();

    const [text, setText] = useState<string>(order.details || '');

    const handleSave = () => {
        setOrder((prev: any) => ({
            ...prev,
            details: text,
        }));

        router.back();
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Ionicons
                    name="arrow-back"
                    size={22}
                    onPress={() => router.back()}
                />

                <Text style={styles.headerText}>Details</Text>

                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Add Details</Text>

            <TextInput
                style={styles.textArea}
                multiline
                value={text}
                onChangeText={(val) => setText(val)}
                placeholder="Write your details here..."
            />

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
    saveBtn: {
        backgroundColor: '#000',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 8,
    },
    saveText: {
        color: 'white',
        fontWeight: 'bold',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    textArea: {
        backgroundColor: 'white',
        height: 150,
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top',
    },
});