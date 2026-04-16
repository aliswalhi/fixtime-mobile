import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useRef, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { db } from '../constants/firebaseConfig';

export default function BecomeWorker() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [workType, setWorkType] = useState('');
  const [experience, setExperience] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [fromHour, setFromHour] = useState('');
  const [toHour, setToHour] = useState('');

  const [showWorkModal, setShowWorkModal] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [positions, setPositions] = useState<Record<string, number>>({});

  const fullNameRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const idNumberRef = useRef<TextInput>(null);
  const experienceRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);
  const fromHourRef = useRef<TextInput>(null);
  const toHourRef = useRef<TextInput>(null);

  const jobs = [
    { name: 'Plumber', icon: require('../assets/images/Plumber.png') },
    { name: 'Cleaning', icon: require('../assets/images/cleaning.png') },
    { name: 'Carpenter', icon: require('../assets/images/carpenter.png') },
    { name: 'Electrician', icon: require('../assets/images/electrician.png') },
  ];

  const countries = ['Palestine', 'Jordan', 'Syria', 'Lebanon'];

  const savePosition = (key: string, y: number) => {
    setPositions((prev) => ({ ...prev, [key]: y }));
  };

  const goToField = (
    key: string,
    ref?: React.RefObject<TextInput | null>,
    action?: () => void
  ) => {
    scrollRef.current?.scrollTo({
      y: Math.max((positions[key] || 0) - 20, 0),
      animated: true,
    });

    setTimeout(() => {
      if (ref?.current) {
        ref.current.focus();
      }
      if (action) {
        action();
      }
    }, 250);
  };

  const resetForm = () => {
    setFullName('');
    setPhone('');
    setEmail('');
    setIdNumber('');
    setWorkType('');
    setExperience('');
    setCountry('');
    setDescription('');
    setFromHour('');
    setToHour('');
  };

  const handleSubmit = async () => {
    if (!fullName.trim()) {
      Alert.alert('Required', 'Please enter Full Name');
      goToField('fullName', fullNameRef);
      return;
    }

    if (!phone.trim()) {
      Alert.alert('Required', 'Please enter Phone Number');
      goToField('phone', phoneRef);
      return;
    }

    if (!email.trim()) {
      Alert.alert('Required', 'Please enter Email Address');
      goToField('email', emailRef);
      return;
    }

    if (!idNumber.trim()) {
      Alert.alert('Required', 'Please enter ID Number');
      goToField('idNumber', idNumberRef);
      return;
    }

    if (!workType.trim()) {
      Alert.alert('Required', 'Please select Work Type');
      goToField('workType', undefined, () => setShowWorkModal(true));
      return;
    }

    if (!experience.trim()) {
      Alert.alert('Required', 'Please enter Years of experience');
      goToField('experience', experienceRef);
      return;
    }

    if (!country.trim()) {
      Alert.alert('Required', 'Please select Experience Country');
      goToField('country', undefined, () => setShowCountryModal(true));
      return;
    }

    if (!description.trim()) {
      Alert.alert('Required', 'Please enter Short Description');
      goToField('description', descriptionRef);
      return;
    }

    if (!fromHour.trim()) {
      Alert.alert('Required', 'Please enter Available Hours From');
      goToField('fromHour', fromHourRef);
      return;
    }

    if (!toHour.trim()) {
      Alert.alert('Required', 'Please enter Available Hours To');
      goToField('toHour', toHourRef);
      return;
    }

    try {
      setIsSubmitting(true);

      await addDoc(collection(db, 'workerApplications'), {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        idNumber: idNumber.trim(),
        workType: workType.trim(),
        experience: experience.trim(),
        country: country.trim(),
        description: description.trim(),
        fromHour: fromHour.trim(),
        toHour: toHour.trim(),
        status: 'pending',
        source: 'fixtime-web',
        teamMember: 'Mohammad',
        featureOwner: 'worker-registration',
        createdAt: serverTimestamp(),
      });

      resetForm();
      setShowSuccessModal(true);
    } catch (error) {
      console.log('Firestore save error:', error);
      Alert.alert('Error', 'Something went wrong while saving data.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#222" />
            </TouchableOpacity>

            <Text style={styles.title}>Become a worker</Text>

            <View style={styles.headerSpacer} />
          </View>

          <View onLayout={(e) => savePosition('fullName', e.nativeEvent.layout.y)}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              ref={fullNameRef}
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#B0B0B0"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View onLayout={(e) => savePosition('phone', e.nativeEvent.layout.y)}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              ref={phoneRef}
              style={styles.input}
              placeholder="Enter phone number"
              placeholderTextColor="#B0B0B0"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View onLayout={(e) => savePosition('email', e.nativeEvent.layout.y)}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              ref={emailRef}
              style={styles.input}
              placeholder="Enter email address"
              placeholderTextColor="#B0B0B0"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View onLayout={(e) => savePosition('idNumber', e.nativeEvent.layout.y)}>
            <Text style={styles.label}>ID Number</Text>
            <TextInput
              ref={idNumberRef}
              style={styles.input}
              placeholder="Enter ID number"
              placeholderTextColor="#B0B0B0"
              value={idNumber}
              onChangeText={setIdNumber}
              keyboardType="numeric"
            />
          </View>

          <View onLayout={(e) => savePosition('workType', e.nativeEvent.layout.y)}>
            <Text style={styles.label}>Work type</Text>
            <TouchableOpacity
              style={styles.inputButton}
              onPress={() => setShowWorkModal(true)}
            >
              <Text
                style={[
                  styles.inputButtonText,
                  !workType && styles.placeholderText,
                ]}
              >
                {workType || 'Select work type'}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#A0A0A0" />
            </TouchableOpacity>
          </View>

          <View onLayout={(e) => savePosition('experience', e.nativeEvent.layout.y)}>
            <Text style={styles.label}>Years of experience</Text>
            <TextInput
              ref={experienceRef}
              style={styles.input}
              placeholder="Enter years"
              placeholderTextColor="#B0B0B0"
              value={experience}
              onChangeText={setExperience}
              keyboardType="numeric"
            />
          </View>

          <View onLayout={(e) => savePosition('country', e.nativeEvent.layout.y)}>
            <Text style={styles.label}>Experience Country</Text>
            <TouchableOpacity
              style={styles.inputButton}
              onPress={() => setShowCountryModal(true)}
            >
              <Text
                style={[
                  styles.inputButtonText,
                  !country && styles.placeholderText,
                ]}
              >
                {country || 'Select country'}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#A0A0A0" />
            </TouchableOpacity>
          </View>

          <View onLayout={(e) => savePosition('description', e.nativeEvent.layout.y)}>
            <Text style={styles.label}>Short Description</Text>
            <TextInput
              ref={descriptionRef}
              style={[styles.input, styles.textArea]}
              placeholder="Write a short description about your skills"
              placeholderTextColor="#B0B0B0"
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>

          <Text style={styles.label}>Available Hours</Text>
          <View style={styles.row}>
            <View
              style={styles.halfWrapper}
              onLayout={(e) => savePosition('fromHour', e.nativeEvent.layout.y)}
            >
              <TextInput
                ref={fromHourRef}
                style={styles.smallInput}
                placeholder="From"
                placeholderTextColor="#B0B0B0"
                value={fromHour}
                onChangeText={setFromHour}
              />
            </View>

            <View
              style={styles.halfWrapper}
              onLayout={(e) => savePosition('toHour', e.nativeEvent.layout.y)}
            >
              <TextInput
                ref={toHourRef}
                style={styles.smallInput}
                placeholder="To"
                placeholderTextColor="#B0B0B0"
                value={toHour}
                onChangeText={setToHour}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={showWorkModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowWorkModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select work type</Text>

            {jobs.map((item) => (
              <TouchableOpacity
                key={item.name}
                style={styles.optionRow}
                onPress={() => setWorkType(item.name)}
              >
                <View style={styles.optionLeft}>
                  <Image source={item.icon} style={styles.optionIcon} />
                  <Text style={styles.optionText}>{item.name}</Text>
                </View>

                <View
                  style={[
                    styles.checkCircle,
                    workType === item.name
                      ? styles.checkCircleActive
                      : styles.checkCircleInactive,
                  ]}
                >
                  <Ionicons name="checkmark" size={12} color="#fff" />
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.modalOkButton}
              onPress={() => setShowWorkModal(false)}
            >
              <Text style={styles.modalOkText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showCountryModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCountryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select Experience Country</Text>

            {countries.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.optionRow}
                onPress={() => setCountry(item)}
              >
                <View style={styles.optionLeft}>
                  <View style={styles.countrySquare} />
                  <Text style={styles.optionText}>{item}</Text>
                </View>

                <View
                  style={[
                    styles.checkCircle,
                    country === item
                      ? styles.checkCircleActive
                      : styles.checkCircleInactive,
                  ]}
                >
                  <Ionicons name="checkmark" size={12} color="#fff" />
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.modalOkButton}
              onPress={() => setShowCountryModal(false)}
            >
              <Text style={styles.modalOkText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.successOverlay}>
          <View style={styles.successCard}>
            <View style={styles.successCircle}>
              <Ionicons name="checkmark" size={40} color="#FFFFFF" />
            </View>

            <Text style={styles.successTitle}>Registration Submitted</Text>

            <Text style={styles.successDesc}>
              Thank you for registering as a skilled worker with us. We will get back
              to you soon.
            </Text>

            <TouchableOpacity
              style={styles.successButton}
              onPress={() => {
                setShowSuccessModal(false);
                router.push('/worker-intro');
              }}
            >
              <Text style={styles.successButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    backgroundColor: '#F4F5FA',
    borderRadius: 34,
    paddingTop: 18,
    paddingHorizontal: 22,
    paddingBottom: 26,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  backButton: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 28,
    color: '#222',
    lineHeight: 28,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
  },
  headerSpacer: {
    width: 34,
  },
  label: {
    fontSize: 15,
    color: '#444',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#111',
  },
  inputButton: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputButtonText: {
    fontSize: 14,
    color: '#111',
  },
  placeholderText: {
    color: '#B0B0B0',
  },
  arrow: {
    fontSize: 20,
    color: '#A0A0A0',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  halfWrapper: {
    flex: 1,
  },
  smallInput: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#111',
  },
  submitButton: {
    marginTop: 24,
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    paddingVertical: 16,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalBox: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingBottom: 25,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#111',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 28,
    height: 28,
    marginRight: 12,
    resizeMode: 'contain',
  },
  optionText: {
    fontSize: 16,
    color: '#222',
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircleActive: {
    backgroundColor: '#333',
  },
  checkCircleInactive: {
    backgroundColor: '#ccc',
  },
  checkText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  modalOkButton: {
    marginTop: 20,
    alignSelf: 'center',
    width: '70%',
    backgroundColor: '#111',
    paddingVertical: 15,
    borderRadius: 8,
  },
  modalOkText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  countrySquare: {
    width: 28,
    height: 28,
    backgroundColor: '#E3E3E3',
    marginRight: 12,
    borderRadius: 4,
  },
  successOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  successCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#1ED760',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },
  successCheck: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '800',
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#222',
    marginBottom: 16,
    textAlign: 'center',
  },
  successDesc: {
    fontSize: 15,
    color: '#7A7A7A',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 24,
  },
  successButton: {
    width: '100%',
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    paddingVertical: 15,
  },
  successButtonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
