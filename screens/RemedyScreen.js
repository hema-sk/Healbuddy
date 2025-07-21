import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const remediesData = {
  "😬 Toothache": "🦷 Rinse your mouth with warm salt water and apply clove oil using a cotton ball.",
  "🩸 Cramps / Period Pain": "🌸 Use a heating pad, drink chamomile tea, and do light stretching.",
  "🤢 Indigestion": "🍋 Sip warm water with lemon or chew on ginger or fennel seeds.",
  "😪 Fatigue": "💤 Stay hydrated, get fresh air, and eat a banana for a natural energy boost.",
  "🐝 Insect Bites": "🦟 Apply aloe vera, ice pack, or a paste of baking soda and water.",
  "🧴 Acne / Pimples": "🌿 Dab tea tree oil or honey. Avoid touching or popping them.",
  "😤 Skin Irritation": "🧴 Apply cool compress, aloe vera gel, or calamine lotion.",
  "☀️ Heartburn": "🔥 Chew on basil leaves or drink cold milk. Avoid spicy foods temporarily.",
  "😟 Stress / Anxiety": "🧘 Try deep breathing, meditation, lavender oil, or take a short walk.",
  "😓 Dry Skin": "💧 Use coconut oil, shea butter, or oatmeal-based moisturizer.",
  "😭 Sore Throat": "🍯 Gargle with salt water and sip warm honey-lemon water.",
  "😵 Dizziness": "🌀 Sit or lie down immediately, drink water, and breathe slowly."
};

const RemedyScreen = () => {
  const [selectedRemedy, setSelectedRemedy] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌿 Natural Remedies</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {Object.keys(remediesData).map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.card}
            onPress={() => setSelectedRemedy(item)}
          >
            <Text style={styles.cardText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={selectedRemedy !== null} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{selectedRemedy}</Text>
            <Text style={styles.modalContent}>{remediesData[selectedRemedy]}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedRemedy(null)}
            >
              <Text style={styles.closeButtonText}>Got it ✅</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1F5',
    paddingTop: 40,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#A45C9C',
    textAlign: 'center',
    marginBottom: 20
  },
  scrollContainer: {
    paddingBottom: 30
  },
  card: {
    backgroundColor: '#F8D9E8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },
  cardText: {
    fontSize: 18,
    color: '#333'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBox: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    width: '85%',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#A45C9C',
    marginBottom: 10
  },
  modalContent: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20
  },
  closeButton: {
    backgroundColor: '#A45C9C',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: '600'
  }
});

export default RemedyScreen;
