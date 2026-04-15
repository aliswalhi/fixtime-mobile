import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useOrder } from './OrderContext';

export default function AddPhotoScreen() {

    const router = useRouter();
    const { setOrder } = useOrder();

    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {

        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
            alert('Camera permission required');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const savePhoto = () => {
        if (!image) return;

        setOrder((prev: any) => ({
            ...prev,
            photo: image,
        }));

        router.back();
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Ionicons name="arrow-back" size={22} onPress={() => router.back()} />
                <Text style={styles.headerText}>Add photo</Text>

                <TouchableOpacity onPress={savePhoto}>
                    <Text style={[styles.saveBtn, { opacity: image ? 1 : 0.4 }]}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.imageBox}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Ionicons name="image-outline" size={50} color="gray" />
                )}
            </View>

            <TouchableOpacity style={styles.btn} onPress={pickImage}>
                <Ionicons name="image-outline" size={20} />
                <Text style={styles.btnText}>Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={takePhoto}>
                <Ionicons name="camera-outline" size={20} />
                <Text style={styles.btnText}>Take Photo</Text>
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
        marginBottom: 20,
    },

    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    saveBtn: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },

    imageBox: {
        height: 150,
        backgroundColor: '#eee',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },

    image: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },

    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#cfd5e6',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },

    btnText: {
        marginLeft: 10,
    },
});