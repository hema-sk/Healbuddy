import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const HealthStats = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bp, setBp] = useState('');
  const [pulse, setPulse] = useState('');
  const [oxygen, setOxygen] = useState('');
  const [result, setResult] = useState('');

  const checkStats = () => {
    let message = '';

    // Convert inputs to numbers
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm to meters
    const bpVal = parseInt(bp);
    const pulseVal = parseInt(pulse);
    const oxyVal = parseInt(oxygen);

    // BMI Calculation
    const bmi = (w / (h * h)).toFixed(1);
    message += `👉 Your BMI is ${bmi} (${getBMICategory(bmi)})\n\n`;

    // BP Check
    if (bpVal > 120) {
      message += `⚠️ Blood Pressure is high. Normal is around 120 mmHg.\n`;
    } else if (bpVal < 90) {
      message += `⚠️ Blood Pressure is low. Normal is around 120 mmHg.\n`;
    } else {
      message += `✅ Blood Pressure is perfect!\n`;
    }

    // Pulse Check
    if (pulseVal > 100 || pulseVal < 60) {
      message += `⚠️ Pulse should be between 60-100 bpm.\n`;
    } else {
      message += `✅ Pulse Rate is perfect!\n`;
    }

    // Oxygen Level
    if (oxyVal < 95) {
      message += `⚠️ Oxygen level is low. Normal is 95% or higher.\n`;
    } else {
      message += `✅ Oxygen level is good!\n`;
    }

    setResult(message);
  };

  const getBMICategory = (bmi) => {
    const value = parseFloat(bmi);
    if (value < 18.5) return 'Underweight';
    if (value >= 18.5 && value <= 24.9) return 'Normal';
    if (value >= 25 && value <= 29.9) return 'Overweight';
    return 'Obese';
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🩻 Health Stats Checker</Text>

      <TextInput
        placeholder="Enter Weight (kg)"
        keyboardType="numeric"
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
      />

      <TextInput
        placeholder="Enter Height (cm)"
        keyboardType="numeric"
        style={styles.input}
        value={height}
        onChangeText={setHeight}
      />

      <TextInput
        placeholder="Enter Blood Pressure"
        keyboardType="numeric"
        style={styles.input}
        value={bp}
        onChangeText={setBp}
      />

      <TextInput
        placeholder="Enter Pulse Count"
        keyboardType="numeric"
        style={styles.input}
        value={pulse}
        onChangeText={setPulse}
      />

      <TextInput
        placeholder="Enter Oxygen Level (%)"
        keyboardType="numeric"
        style={styles.input}
        value={oxygen}
        onChangeText={setOxygen}
      />

      <TouchableOpacity style={styles.button} onPress={checkStats}>
        <Text style={styles.buttonText}>Analyze</Text>
      </TouchableOpacity>

      {result ? <Text style={styles.result}>{result}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF1F5',
    flexGrow: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6E9BC5',
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  button: {
    backgroundColor: '#6E9BC5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    color: '#333',
    lineHeight: 22
  }
});

export default HealthStats;
