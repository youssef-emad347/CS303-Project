import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SuccessScreen = () => {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.goBack(); // or navigate to another screen if needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Success!</Text>
      <Text style={styles.message}>Your operation was completed successfully.</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleDone}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fff0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1b5743',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    backgroundColor: '#1b5743',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
