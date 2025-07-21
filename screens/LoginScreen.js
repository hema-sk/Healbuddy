import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebase'; // Make sure the import path is correct
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Home'); // On successful login, navigate to the Home screen
    } catch (error) {
      Alert.alert('Login Error', error.message); // Display error message if login fails
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" color="#A0D8B3" onPress={handleLogin} />
      <Button title="Create Account" color="#A0D8B3"  onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#F0FDF4' // Light aesthetic background
  },
  title: { 
    fontSize: 28, 
    marginBottom: 20, 
    color: '#75C9B7', // Aesthetic color for title
    fontWeight: 'bold' 
  },
  input: {
    width: '80%',
    height: 45,
    borderWidth: 2,
    borderColor: '#3D3D3D', // Light purple border for input fields
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: '#F0FDF4', // White background for inputs
  },
});

export default LoginScreen;
