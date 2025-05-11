import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { Stack } from 'expo-router';

export default function DisplayImage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        setName(user?.displayName || '');
        setEmail(user?.email || '');

        if (user) {
          const userId = user.uid;
          const firestore = getFirestore();
          const docRef = doc(firestore, 'users', userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setName(userData.name);
            setEmail(userData.email);

            // تحميل الصورة من Firebase Storage
            const imageRef = ref(storage, 'images/' + userData.imageName);
            const url = await getDownloadURL(imageRef);
            setImageUrl(url);
          } else {
            console.log('User document does not exist');
          }
        } else {
          console.log('No user logged in');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Profile', 
          headerStyle: { backgroundColor: '#214E34' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
          headerBackVisible: true,
          headerTitleAlign: 'center',
        }} 
      />
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </>
      ) : (
        <View style={styles.card}>
          {imageUrl && (
            <Image source={{ uri: imageUrl }} style={styles.avatar} />
          )}
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#F3F4F6', padding: 20,
  },
  card: {
    backgroundColor: '#fff', width: '90%', borderRadius: 20,
    padding: 25, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 6, elevation: 5,
  },
  avatar: {
    width: 120, height: 120, borderRadius: 60,
    marginBottom: 20, borderWidth: 2, borderColor: '#007AFF',
  },
  name: {
    fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 8,
  },
  email: {
    fontSize: 16, color: '#777',
  },
  loadingText: {
    marginTop: 10, fontSize: 16, color: '#555',
  },
});
