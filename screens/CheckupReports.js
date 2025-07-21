import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { db, storage } from '../firebase'; // Import Firestore & Storage
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

const CheckupReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reports from Firestore
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'CheckupReports'));
        const reportList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReports(reportList);
        setLoading(false);
      } catch (error) {
        console.error('❌ Error fetching reports:', error);
      }
    };
    fetchReports();
  }, []);

  // Upload File to Firebase Storage
  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        console.log('✅ Selected File:', file.name);

        const fileRef = ref(storage, `reports/${file.name}`);
        const response = await fetch(file.uri);
        const blob = await response.blob();

        const uploadTask = uploadBytesResumable(fileRef, blob);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            console.log(`⏳ Upload Progress: ${(snapshot.bytesTransferred / snapshot.totalBytes) * 100}%`);
          },
          (error) => {
            console.error('❌ Upload Error:', error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('✅ File uploaded. URL:', downloadURL);

            const docRef = await addDoc(collection(db, 'CheckupReports'), {
              name: file.name,
              url: downloadURL,
            });

            setReports([...reports, { id: docRef.id, name: file.name, url: downloadURL }]);
          }
        );
      }
    } catch (error) {
      console.error('❌ Error picking document:', error);
    }
  };

  // Delete Report from Firebase
  const handleDelete = async (id, fileName) => {
    try {
      await deleteDoc(doc(db, 'CheckupReports', id)); // Delete from Firestore
      const fileRef = ref(storage, `reports/${fileName}`);
      await deleteObject(fileRef); // Delete from Storage
      setReports(reports.filter((report) => report.id !== id));
      console.log('✅ Report deleted');
    } catch (error) {
      console.error('❌ Error deleting report:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#6200ee" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkup Reports</Text>

      {/* Report List */}
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reportItem}>
            <Text style={styles.reportName}>{item.name}</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => console.log('Download:', item.url)}>
                <AntDesign name="download" size={20} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id, item.name)}>
                <AntDesign name="delete" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Upload Button */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <AntDesign name="upload" size={24} color="white" />
        <Text style={styles.uploadText}>Upload Report</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F3FF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#CBAACB',
  },
  reportItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    elevation: 2,
  },
  reportName: {
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  uploadButton: {
    flexDirection: 'row',
    backgroundColor: '#B4D4EE',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  uploadText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default CheckupReports;
