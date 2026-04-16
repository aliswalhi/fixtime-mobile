import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function WorkerIntro() {
  const router = useRouter();

  const handleNeedHelp = async () => {
    const phoneNumber = '0590000000';
    const email = 'support@fixtime.com';

    const phoneUrl = `tel:${phoneNumber}`;
    const emailUrl = `mailto:${email}`;

    try {
      const canCall = await Linking.canOpenURL(phoneUrl);

      if (canCall) {
        await Linking.openURL(phoneUrl);
      } else {
        await Linking.openURL(emailUrl);
      }
    } catch {
      Alert.alert('Help', 'Please contact support@fixtime.com');
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.imageWrapper}>
            <Image
              source={require('../assets/images/worker.png')}
              style={styles.heroImage}
              resizeMode="cover"
            />

            <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
              <Ionicons name="close" size={20} color="#222" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>BECOME A WORKER WITH US?</Text>
            <Text style={styles.subtitle}>Join Our Workforce Today</Text>

            <View style={styles.item}>
              <Ionicons style={styles.icon} name="time-outline" size={22} color="#111" />
              <View style={styles.textBox}>
                <Text style={styles.itemTitle}>Increased Job Opportunities</Text>
                <Text style={styles.itemDesc}>
                  Expand your client base and enjoy flexible working hours.
                </Text>
              </View>
            </View>

            <View style={styles.item}>
              <Ionicons style={styles.icon} name="ribbon-outline" size={22} color="#111" />
              <View style={styles.textBox}>
                <Text style={styles.itemTitle}>Enhanced Professional Reputation</Text>
                <Text style={styles.itemDesc}>
                  Build credibility through user reviews and showcase your work.
                </Text>
              </View>
            </View>

            <View style={styles.item}>
              <Ionicons
                style={styles.icon}
                name="briefcase-outline"
                size={22}
                color="#111"
              />
              <View style={styles.textBox}>
                <Text style={styles.itemTitle}>Convenient Business Management</Text>
                <Text style={styles.itemDesc}>
                  Enjoy a hassle-free payment process, with secure and direct earnings
                  deposited into your account.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/become-worker')}
            >
              <Text style={styles.buttonText}>Register Now</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.helpButton} onPress={handleNeedHelp}>
              <Text style={styles.helpButtonText}>Need Help? Contact Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#B6B6B6',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 14,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    alignSelf: 'center',
    backgroundColor: '#F4F5FA',
    borderRadius: 30,
    overflow: 'hidden',
  },
  imageWrapper: {
    width: '100%',
    height: 330,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#DDD',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
    color: '#111',
  },
  subtitle: {
    textAlign: 'center',
    color: '#8A8A8A',
    fontSize: 15,
    marginTop: 6,
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
  },
  textBox: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: 14,
    color: '#8C8C8C',
    lineHeight: 19,
  },
  button: {
    marginTop: 12,
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
  helpButton: {
    marginTop: 14,
    paddingVertical: 10,
    alignItems: 'center',
  },
  helpButtonText: {
    color: '#5A5A5A',
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
