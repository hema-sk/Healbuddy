import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Switch, ActivityIndicator, StyleSheet } from 'react-native';
import { db } from '../firebase'; // ✅ Import Firestore instance
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const VaccineTracker = () => {
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Vaccines'));
        const vaccineList = querySnapshot.docs.map(doc => ({
          id: doc.id, // ✅ Store document ID separately
          ...doc.data(),
        }));

        console.log("✅ Fetched Vaccine Data:", vaccineList); // ✅ Debugging Line

        setVaccines(vaccineList);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching vaccines:", error);
      }
    };

    fetchVaccines();
  }, []);

  const toggleTakenStatus = async (vaccineName, currentStatus) => {
    try {
      const vaccinesRef = collection(db, 'Vaccines');
      const querySnapshot = await getDocs(vaccinesRef);
      
      let docId = null;

      querySnapshot.forEach((doc) => {
        if (doc.data().name === vaccineName) {
          docId = doc.id;
        }
      });

      if (!docId) {
        console.error(`❌ No document found for vaccine: ${vaccineName}`);
        return;
      }

      console.log(`🛠️ Updating vaccine: ${vaccineName}, New Status: ${!currentStatus}`); // ✅ Debugging Line

      const vaccineRef = doc(db, 'Vaccines', docId);
      await updateDoc(vaccineRef, { taken: !currentStatus });

      // ✅ Update local state immediately
      setVaccines(prevVaccines =>
        prevVaccines.map(vaccine =>
          vaccine.name === vaccineName ? { ...vaccine, taken: !currentStatus } : vaccine
        )
      );

      console.log(`✅ Updated ${vaccineName} successfully!`);
    } catch (error) {
      console.error(`❌ Error updating vaccine status:`, error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#6200ee" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vaccine Tracker</Text>
      <FlatList
        data={vaccines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.vaccineItem}>
            <View>
              <Text style={styles.vaccineName}>{item.name}</Text>
              <Text style={styles.vaccineDetail}>For: {item.disease}</Text>
              <Text style={styles.vaccineDetail}>Age: {item.age}</Text>
            </View>
            <Switch
              value={item.taken}
              onValueChange={() => toggleTakenStatus(item.name, item.taken)} // ✅ Pass name instead of ID
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#3C3C43',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#F5F5F7',
  },
  vaccineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#CBA6F7',
    elevation: 2,
  },
  vaccineName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  vaccineDetail: {
    fontSize: 14,
    color: '#F5F5F7',
  },
});

export default VaccineTracker;
