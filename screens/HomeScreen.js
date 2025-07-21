import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // double-check the path if needed

const HomeScreen = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, []);

  return (
    <View style={styles.container}>
      {userData && (
        <View style={styles.profileContainer}>
          <Text style={styles.profileName}>Hi, {userData.name} 👋</Text>
        </View>
      )}

      <Text style={styles.title}> Welcome to HealBuddy ❤️‍🩹</Text>

      <ScrollView contentContainerStyle={styles.featureBox}>
        <Button
          title="👤 Profile"
          onPress={() => navigation.navigate('Profile')}
          color="#6E9BC5"
        />
        <View style={styles.spacer} />

        <Button
          title="📈 Health Stats Checker"
          onPress={() => navigation.navigate('HealthStats')}
          color="#6E9BC5"
        />
        <View style={styles.spacer} />

        <Button
          title="🌿 Natural Remedies"
          onPress={() => navigation.navigate('Remedies')}
          color="#6E9BC5"
        />
        <View style={styles.spacer} />

        <Button
          title="💊 Medicine & 📅 Appointment Reminders"
          onPress={() => navigation.navigate('Reminders')}
          color="#6E9BC5"
        />
        <View style={styles.spacer} />

        <Button
          title="🤒 Doctor Visit"
          onPress={() => navigation.navigate('MedicalHistory')}
          color="#6E9BC5"
        />
        <View style={styles.spacer} />

        <Button
          title="🩺 Medical Checkup Reports"
          onPress={() => navigation.navigate('CheckupReports')}
          color="#6E9BC5"
        />
        <View style={styles.spacer} />

        <Button
          title="‼️ Emergency contacts"
          onPress={() => navigation.navigate('EmergencyContacts')}
          color="#6E9BC5"
        />
        <View style={styles.spacer} />

        <Button
          title="💉 Vaccine Tracker"
          onPress={() => navigation.navigate('VaccineTracker')}
          color="#6E9BC5"
        />
        <View style={styles.spacer} />

        <Button
          title="🧘 Wellness & Mindfulness"
          onPress={() => navigation.navigate('Wellness')}
          color="#6E9BC5"
        />
        <View style={styles.spacer} />

        <Button
          title="🎵 Soothing Music"
          onPress={() => navigation.navigate('SoothingMusic')}
          color="#6E9BC5"
        />
        <View style={styles.spacer} />
        
        <Button
          title="🧠 Health Tips & Articles"
          onPress={() => navigation.navigate('HealthTips')}
          color="#6E9BC5"
        />
      </ScrollView>

      <Button
        title="🚪 Logout"
        color="#FF6B6B"
        onPress={() => auth.signOut()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF1F5', // light background
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#88C9BF' // primary minty-green heading
  },
  featureBox: {
    width: '90%',
    paddingBottom: 20,
    alignItems: 'center'
  },
  spacer: {
    height: 15
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 10
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: '#333' // soft dark gray text
  }
});

export default HomeScreen;
