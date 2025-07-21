import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // ✅ ONLY this for Firestore


const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Pill'); // "Pill" or "Appointment"
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const fetchReminders = async () => {
    const snapshot = await getDocs(collection(db, 'reminders'));
    const today = new Date();

    const filtered = snapshot.docs
      .map(doc => ({ ...doc.data(), id: doc.id }))
      .filter(reminder => {
        const reminderDate = new Date(`${reminder.date}T${reminder.time}`);
        return reminderDate >= today;
      });

    setReminders(filtered);
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const addReminder = async () => {
    if (!title || !date || !time) return;

    await addDoc(collection(db, 'reminders'), {
      title,
      type,
      date,
      time,
    });

    setTitle('');
    setDate('');
    setTime('');
    fetchReminders();
  };

  const deleteReminder = async (id) => {
    await deleteDoc(doc(db, 'reminders', id));
    fetchReminders();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>💊 Reminders</Text>

      <TextInput
        placeholder="Title (e.g., Take BP Tablet)"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Type (Pill / Appointment)"
        value={type}
        onChangeText={setType}
        style={styles.input}
      />

      <TextInput
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
        style={styles.input}
      />

      <TextInput
        placeholder="Time (HH:MM)"
        value={time}
        onChangeText={setTime}
        style={styles.input}
      />

      <Button title="Add Reminder" color="#8777D9" onPress={addReminder} />

      <Text style={styles.subHeading}>📅 Upcoming Reminders</Text>

      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reminderItem}>
            <Text style={styles.reminderText}>
              [{item.type}] {item.title} — {item.date} at {item.time}
            </Text>
            <TouchableOpacity onPress={() => deleteReminder(item.id)}>
              <Text style={styles.deleteBtn}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Reminders;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F7F3FF' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subHeading: { fontSize: 18, marginTop: 30, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#A267AC',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  reminderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D8B4E2',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  reminderText: { fontSize: 16 },
  deleteBtn: { fontSize: 18, color: 'red' },
});
