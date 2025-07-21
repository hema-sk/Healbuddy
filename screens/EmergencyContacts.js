import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // ✅ NOT firebaseConfig


const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const querySnapshot = await getDocs(collection(db, 'emergencyContacts'));
    const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setContacts(data);
  };

  const handleAddOrUpdate = async () => {
    if (!name || !role || !phone) return;

    if (editingId) {
      const contactRef = doc(db, 'emergencyContacts', editingId);
      await updateDoc(contactRef, { name, role, phone });
      setEditingId(null);
    } else {
      await addDoc(collection(db, 'emergencyContacts'), { name, role, phone });
    }

    setName('');
    setRole('');
    setPhone('');
    fetchContacts();
  };

  const handleEdit = (contact) => {
    setName(contact.name);
    setRole(contact.role);
    setPhone(contact.phone);
    setEditingId(contact.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📞 Emergency Contacts</Text>

      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Role" value={role} onChangeText={setRole} style={styles.input} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />

      <Button title={editingId ? "Update Contact" : "Add Contact"} onPress={handleAddOrUpdate} />

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleEdit(item)}>
            <Text style={styles.name}>{item.name} ({item.role})</Text>
            <Text style={styles.phone}>📱 {item.phone}</Text>
            <Text style={styles.edit}>Tap to Edit</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F0FDF4', flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#75C9B7', padding: 10, marginBottom: 10, borderRadius: 6 },
  card: { padding: 15, backgroundColor: '#88C9BF', borderRadius: 8, marginBottom: 10 },
  name: { fontSize: 16, fontWeight: 'bold' },
  phone: { color: '#3D3D3D' },
  edit: { fontSize: 12, color: '#3D3D3D', marginTop: 5 }
});

export default EmergencyContacts;
