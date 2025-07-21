import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const MedicalHistory = () => {
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [visits, setVisits] = useState([]);

  const fetchVisits = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'MedicalHistory'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVisits(data);
    } catch (error) {
      console.error("❌ Error fetching visit history:", error);
    }
  };

  const handleAddVisit = async () => {
    if (!doctor || !date || !reason) return alert('Please fill all fields');
    try {
      await addDoc(collection(db, 'MedicalHistory'), {
        doctor,
        date,
        reason,
      });
      setDoctor('');
      setDate('');
      setReason('');
      fetchVisits(); // Refresh list
    } catch (error) {
      console.error('❌ Error saving visit:', error);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🩺 Medical History</Text>

      <TextInput
        style={styles.input}
        placeholder="Doctor / Hospital Name"
        value={doctor}
        onChangeText={setDoctor}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (e.g., 2025-04-11)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Reason for Visit"
        value={reason}
        onChangeText={setReason}
      />
      <Button title="➕ Add Visit" onPress={handleAddVisit} />

      <FlatList
        data={visits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.doctor}</Text>
            <Text style={styles.cardDetail}>📅 {item.date}</Text>
            <Text style={styles.cardDetail}>📝 {item.reason}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF0F6' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#555555', textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 10,
  },
  card: {
    padding: 15,
    backgroundColor: '#CBAACB',
    borderRadius: 10,
    marginVertical: 5,
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardDetail: { fontSize: 14, color: '#333' },
});

export default MedicalHistory;
