import * as ImagePicker from "expo-image-picker";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../integrations/firebase/config";

type Screen = "profile" | "photo" | "name" | "email" | "phone" | "gender";

const TEST_USER_ID = "1PjNXH4c5sdckK70aQ9mwfA7tnh2";

export default function ProfileScreen() {
  const [screen, setScreen] = useState<Screen>("profile");
  const [loading, setLoading] = useState(true);

  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  const [tempName, setTempName] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [tempPhone, setTempPhone] = useState("");
  const [tempGender, setTempGender] = useState("");

  const [successText, setSuccessText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isErrorModal, setIsErrorModal] = useState(false);

  const userRef = doc(db, "users", TEST_USER_ID);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        Alert.alert("Error", "User not found in Firebase");
        return;
      }

      const data = snap.data();

      setName(data.name || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setGender(data.gender || "");
      setPhoto(data.photoURL || null);

      setTempName(data.name || "");
      setTempEmail(data.email || "");
      setTempPhone(data.phone || "");
      setTempGender(data.gender || "");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  const showDone = (message: string, isError = false) => {
    setSuccessText(message);
    setIsErrorModal(isError);
    setShowSuccess(true);
  };

  const chooseFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Please allow gallery access.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Please allow camera access.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const savePhoto = async () => {
    if (!photo) return;

    try {
      await updateDoc(userRef, { photoURL: photo });
      setScreen("profile");
      showDone("Image updated successfully");
    } catch (error) {
      console.log(error);
      showDone("Image update failed", true);
    }
  };

  const saveName = async () => {
    if (!tempName.trim()) {
      Alert.alert("Required", "Please enter your name.");
      return;
    }

    try {
      await updateDoc(userRef, { name: tempName.trim() });
      setName(tempName.trim());
      setScreen("profile");
      showDone("Name updated successfully");
    } catch (error) {
      console.log(error);
      showDone("Name update failed", true);
    }
  };

  const saveEmail = async () => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|icloud\.com|yahoo\.com|live\.com)$/;

    if (!emailRegex.test(tempEmail.trim())) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    try {
      await updateDoc(userRef, { email: tempEmail.trim() });
      setEmail(tempEmail.trim());
      setScreen("profile");
      showDone("Verify your email");
    } catch (error) {
      console.log(error);
      showDone("Email update failed", true);
    }
  };

  const savePhone = async () => {
    if (!tempPhone.trim()) {
      Alert.alert("Required", "Please enter your phone number.");
      return;
    }

    try {
      await updateDoc(userRef, { phone: tempPhone.trim() });
      setPhone(tempPhone.trim());
      setScreen("profile");
      showDone("Phone number updated successfully");
    } catch (error) {
      console.log(error);
      showDone("Phone update failed", true);
    }
  };

  const saveGender = async () => {
    if (!tempGender) {
      Alert.alert("Required", "Please select gender.");
      return;
    }

    try {
      await updateDoc(userRef, { gender: tempGender });
      setGender(tempGender);
      setScreen("profile");
      showDone("Gender updated successfully");
    } catch (error) {
      console.log(error);
      showDone("Gender update failed", true);
    }
  };

  const Header = ({
    title,
    canSave,
    onSave,
  }: {
    title: string;
    canSave?: boolean;
    onSave?: () => void;
  }) => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setScreen("profile")}>
        <Text style={styles.back}>‹</Text>
      </TouchableOpacity>

      <Text style={styles.headerTitle}>{title}</Text>

      {onSave ? (
        <TouchableOpacity
          disabled={!canSave}
          onPress={onSave}
          style={[styles.saveBtn, !canSave && styles.saveDisabled]}
        >
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ width: 58 }} />
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.screen}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (screen === "photo") {
    return (
      <View style={styles.screen}>
        <Header title="Edit photo" canSave={!!photo} onSave={savePhoto} />

        <View style={styles.photoContent}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.bigPhoto} />
          ) : (
            <View style={styles.emptyPhoto}>
              <Text style={styles.emptyIcon}>👤</Text>
            </View>
          )}

          <TouchableOpacity style={styles.imageBtn} onPress={chooseFromGallery}>
            <Text style={styles.imageBtnText}>🖼️ Choose from Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.imageBtn} onPress={takePhoto}>
            <Text style={styles.imageBtnText}>📷 Take Photo</Text>
          </TouchableOpacity>
        </View>

        <SuccessModal
          visible={showSuccess}
          text={successText}
          isError={isErrorModal}
          onClose={() => setShowSuccess(false)}
        />
      </View>
    );
  }

  if (screen === "name") {
    return (
      <EditTextScreen
        title="Edit Name"
        value={tempName}
        setValue={setTempName}
        onBack={() => setScreen("profile")}
        onSave={saveName}
      />
    );
  }

  if (screen === "email") {
    return (
      <EditTextScreen
        title="Edit Email"
        value={tempEmail}
        setValue={setTempEmail}
        onBack={() => setScreen("profile")}
        onSave={saveEmail}
        keyboardType="email-address"
      />
    );
  }

  if (screen === "phone") {
    return (
      <EditTextScreen
        title="Edit phone number"
        value={tempPhone}
        setValue={setTempPhone}
        onBack={() => setScreen("profile")}
        onSave={savePhone}
        keyboardType="phone-pad"
      />
    );
  }

  if (screen === "gender") {
    return (
      <View style={styles.screen}>
        <Header
          title="Edit Gender"
          canSave={!!tempGender}
          onSave={saveGender}
        />

        <View style={styles.genderBox}>
          {["Male", "Female", "Other"].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.genderRow}
              onPress={() => setTempGender(item)}
            >
              <View
                style={[
                  styles.radio,
                  tempGender === item && styles.radioActive,
                ]}
              />
              <Text style={styles.genderText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <SuccessModal
          visible={showSuccess}
          text={successText}
          isError={isErrorModal}
          onClose={() => setShowSuccess(false)}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="My profile" />

      <View style={styles.list}>
        <ProfileRow
          label="Profile photo"
          value={
            photo ? (
              <Image source={{ uri: photo }} style={styles.smallPhoto} />
            ) : (
              <View style={styles.defaultSmallPhoto}>
                <Text>👤</Text>
              </View>
            )
          }
          onPress={() => setScreen("photo")}
        />

        <ProfileRow
          label="Name"
          text={name}
          onPress={() => {
            setTempName(name);
            setScreen("name");
          }}
        />

        <ProfileRow
          label="Email"
          text={email}
          verified={!!email}
          onPress={() => {
            if (email) {
              showDone("Your email is not verified!", true);
            } else {
              setTempEmail(email);
              setScreen("email");
            }
          }}
        />

        <ProfileRow
          label="Contact"
          text={phone}
          onPress={() => {
            setTempPhone(phone);
            setScreen("phone");
          }}
        />

        <ProfileRow
          label="Gender"
          text={gender}
          onPress={() => {
            setTempGender(gender);
            setScreen("gender");
          }}
        />
      </View>

      <SuccessModal
        visible={showSuccess}
        text={successText}
        isError={isErrorModal}
        onClose={() => setShowSuccess(false)}
      />
    </View>
  );
}

function ProfileRow({
  label,
  text,
  value,
  verified,
  onPress,
}: {
  label: string;
  text?: string;
  value?: React.ReactNode;
  verified?: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.rowItem} onPress={onPress}>
      <Text style={styles.rowLabel}>{label}</Text>

      <View style={styles.rowRight}>
        {verified && <Text style={styles.verified}>✓</Text>}
        {value || <Text style={styles.rowValue}>{text || ""}</Text>}
        <Text style={styles.chevron}>›</Text>
      </View>
    </TouchableOpacity>
  );
}

function EditTextScreen({
  title,
  value,
  setValue,
  onBack,
  onSave,
  keyboardType,
}: {
  title: string;
  value: string;
  setValue: (text: string) => void;
  onBack: () => void;
  onSave: () => void;
  keyboardType?: any;
}) {
  const canSave = value.trim().length > 0;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{title}</Text>

        <TouchableOpacity
          disabled={!canSave}
          onPress={onSave}
          style={[styles.saveBtn, !canSave && styles.saveDisabled]}
        >
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.editArea}>
        <TextInput
          style={styles.editInput}
          value={value}
          onChangeText={setValue}
          keyboardType={keyboardType}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}

function SuccessModal({
  visible,
  text,
  isError,
  onClose,
}: {
  visible: boolean;
  text: string;
  isError: boolean;
  onClose: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.successCard}>
          <View style={[styles.successCircle, isError && styles.errorCircle]}>
            <Text style={styles.successIcon}>{isError ? "!" : "✓"}</Text>
          </View>

          <Text style={styles.successText}>{text}</Text>

          <Pressable style={styles.okBtn} onPress={onClose}>
            <Text style={styles.okText}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F6FF",
  },

  loadingText: {
    marginTop: 80,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },

  header: {
    height: 100,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF0F6",
  },

  back: {
    fontSize: 34,
    color: "#222",
    width: 34,
    lineHeight: 34,
  },

  headerTitle: {
    flex: 1,
    fontSize: 25,
    fontWeight: "800",
    color: "#222",
  },

  saveBtn: {
    backgroundColor: "#222",
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 4,
  },

  saveDisabled: {
    backgroundColor: "#C8C8C8",
  },

  saveText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  list: {
    backgroundColor: "#FFFFFF",
    marginTop: 8,
  },

  rowItem: {
    height: 88,
    paddingHorizontal: 22,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF0F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  rowLabel: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
  },

  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    maxWidth: "68%",
  },

  rowValue: {
    fontSize: 16,
    color: "#6E6E6E",
  },

  chevron: {
    fontSize: 30,
    color: "#C7C7C7",
  },

  verified: {
    color: "#11B66A",
    borderWidth: 1.5,
    borderColor: "#11B66A",
    borderRadius: 11,
    width: 22,
    height: 22,
    textAlign: "center",
    lineHeight: 18,
    fontSize: 14,
    fontWeight: "800",
  },

  smallPhoto: {
    width: 52,
    height: 52,
    borderRadius: 5,
  },

  defaultSmallPhoto: {
    width: 52,
    height: 52,
    backgroundColor: "#D9DDE2",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },

  photoContent: {
    alignItems: "center",
    paddingTop: 70,
  },

  emptyPhoto: {
    width: 140,
    height: 140,
    backgroundColor: "#DDE1E6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },

  emptyIcon: {
    fontSize: 70,
  },

  bigPhoto: {
    width: 140,
    height: 140,
    borderRadius: 10,
    marginBottom: 40,
  },

  imageBtn: {
    width: "62%",
    minWidth: 230,
    height: 54,
    backgroundColor: "#E2E7FF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  imageBtnText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
  },

  editArea: {
    paddingHorizontal: 28,
    paddingTop: 44,
  },

  editInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#D7D9E0",
    height: 50,
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
  },

  genderBox: {
    paddingHorizontal: 32,
    paddingTop: 46,
  },

  genderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#777",
    marginRight: 12,
  },

  radioActive: {
    borderWidth: 6,
    borderColor: "#111",
  },

  genderText: {
    color: "#555",
    fontSize: 15,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  successCard: {
    width: "82%",
    maxWidth: 330,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 34,
    paddingHorizontal: 26,
    alignItems: "center",
    marginBottom: 54,
  },

  successCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#36B34A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 26,
  },

  errorCircle: {
    backgroundColor: "#FF5252",
  },

  successIcon: {
    fontSize: 42,
    color: "#FFFFFF",
    fontWeight: "800",
  },

  successText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#222",
    textAlign: "center",
    marginBottom: 30,
  },

  okBtn: {
    backgroundColor: "#222",
    width: "80%",
    paddingVertical: 16,
    borderRadius: 5,
  },

  okText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "800",
    fontSize: 16,
  },
});
