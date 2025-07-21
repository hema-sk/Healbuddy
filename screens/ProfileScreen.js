import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  getFirestore,
  doc,
  setDoc
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { getAuth } from "firebase/auth";
import { app } from "../firebase"; // ✅ Make sure this path is correct

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  // 👇 Pick image from gallery
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow access to your gallery.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  // 👇 Save profile to Firestore
  const saveProfile = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "User not logged in.");
      return;
    }

    let profileImageUrl = null;

    if (profilePic) {
      try {
        const response = await fetch(profilePic);
        const blob = await response.blob();
        const storageRef = ref(storage, `profile_pics/${user.uid}.jpg`);
        await uploadBytes(storageRef, blob);
        profileImageUrl = await getDownloadURL(storageRef);
      } catch (error) {
        Alert.alert("Error uploading image", error.message);
        return;
      }
    }

    try {
      await setDoc(doc(db, "users", user.uid), {
        name,
        age,
        gender,
        height,
        weight,
        medicalCondition,
        profilePic: profileImageUrl,
      });

      Alert.alert("Success", "Profile updated successfully!");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error saving profile", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Profile</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {profilePic ? (
          <Image source={{ uri: profilePic }} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>Upload Profile Picture</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
      />
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Medical Condition (if any)"
        value={medicalCondition}
        onChangeText={setMedicalCondition}
      />

      <Button title="Save Profile" color="#A0D8B3" onPress={saveProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fdf6f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imagePicker: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imageText: {
    color: "#555",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default ProfileScreen;
