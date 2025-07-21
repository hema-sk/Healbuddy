import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // ✅ Fix applied here
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ Kept
import { registerRootComponent } from "expo";

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBKPEyMbACewWmNhf65bjy4Oz8fM_4tpDE",
  authDomain: "healthtrackerapp-7841f.firebaseapp.com",
  projectId: "healthtrackerapp-7841f",
  storageBucket: "healthtrackerapp-7841f.appspot.com",
  messagingSenderId: "800283356427",
  appId: "1:800283356427:web:8baea98d848ef37e10860e",
};

// ✅ Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

// ✅ Fix: Use getAuth instead of initializeAuth
const auth = getAuth(app); 

// ✅ Import Screens
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import VaccineTracker from "./screens/VaccineTracker";
import CheckupReports from "./screens/CheckupReports"; 
import Wellness from './screens/Wellness';
import MedicalHistory from './screens/MedicalHistory';
import Reminders from './screens/Reminders';
import EmergencyContacts from './screens/EmergencyContacts';
import SoothingMusicScreen from './screens/SoothingMusicScreen';
import HealthTipsScreen from './screens/HealthTipsScreen'; // ✅ Correct path
import HealthStats from './screens/HealthStats'; 
import RemedyScreen from './screens/RemedyScreen';



const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="VaccineTracker" component={VaccineTracker} />
          <Stack.Screen name="CheckupReports" component={CheckupReports} />
          <Stack.Screen name="Wellness" component={Wellness} />
          <Stack.Screen name="MedicalHistory" component={MedicalHistory} />
          <Stack.Screen name="Reminders" component={Reminders} />
          <Stack.Screen name="EmergencyContacts" component={EmergencyContacts} />
          <Stack.Screen name="SoothingMusic" component={SoothingMusicScreen} />
          <Stack.Screen name="HealthTips" component={HealthTipsScreen} />
          <Stack.Screen name="HealthStats" component={HealthStats} />
          <Stack.Screen name="Remedies" component={RemedyScreen} />



          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

registerRootComponent(App);
export default App;
