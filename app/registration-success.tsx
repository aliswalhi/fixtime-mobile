import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RegistrationSuccess() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={42} color="#FFF" />
        </View>

        <Text style={styles.title}>Registration Submitted</Text>

        <Text style={styles.desc}>
          Thank you for registering as a skilled worker with us. We will get back to
          you soon.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/worker-intro')}
        >
          <Text style={styles.buttonText}>Ok</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#B6B6B6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFF',
    width: '100%',
    maxWidth: 340,
    borderRadius: 28,
    padding: 28,
    alignItems: 'center',
  },
  checkCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#19C95A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkText: {
    color: '#FFF',
    fontSize: 42,
    fontWeight: '800',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#222',
    marginBottom: 14,
  },
  desc: {
    textAlign: 'center',
    color: '#7A7A7A',
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 24,
  },
  button: {
    width: '100%',
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    paddingVertical: 15,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
