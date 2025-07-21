import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const dailyTips = [
  "💧 Stay hydrated! Drink at least 8 glasses of water.",
  "🧘 Take 5 minutes to breathe deeply and relax.",
  "🍎 Eat one fruit today — your body will thank you!",
  "🚶 Go for a short walk and get some fresh air.",
  "😴 Sleep 7-8 hours to recharge your energy."
];

const moods = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😡', label: 'Stressed' }
];

const Wellness = () => {
  const [dailyTip, setDailyTip] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);

  useEffect(() => {
    // Pick a random tip on load
    const tip = dailyTips[Math.floor(Math.random() * dailyTips.length)];
    setDailyTip(tip);
  }, []);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    // You can also save it to Firebase or AsyncStorage later
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Wellness 💖</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Tip 🌿</Text>
        <Text style={styles.cardText}>{dailyTip}</Text>
      </View>

      <Text style={styles.subHeading}>How are you feeling today?</Text>
      <View style={styles.moodContainer}>
        {moods.map((mood, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.moodButton,
              selectedMood === mood.label && styles.selectedMood
            ]}
            onPress={() => handleMoodSelect(mood.label)}
          >
            <Text style={styles.moodEmoji}>{mood.emoji}</Text>
            <Text style={styles.moodLabel}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fdf6f0',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6a1b9a',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff3e6',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e65100',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#5d4037',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  moodButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  selectedMood: {
    backgroundColor: '#ffe0b2',
  },
  moodEmoji: {
    fontSize: 30,
  },
  moodLabel: {
    fontSize: 14,
    marginTop: 5,
    color: '#444',
  },
});

export default Wellness;
