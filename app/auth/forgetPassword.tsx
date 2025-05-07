import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { backgroundColor } from '@/utils/constants';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Please enter your email');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent! Please check your inbox.');
    } catch (error) {
      console.error(error);
      alert('Error sending password reset email. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forgot Password</Text>

      <Text style={styles.label}>Enter your email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email address"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />


      <Pressable style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.resetButtonText}>Send Reset Link</Text>
      </Pressable>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    backgroundColor: backgroundColor,
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    color: '#2e4d3f',
    marginBottom: 30,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: '#bbb',
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  message: {
    marginTop: 10,
    color: 'green',
    textAlign: 'center',
    fontWeight: '500',
  },
  resetButton: {
    backgroundColor: '#2e4d3f',
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 20,
  },
  resetButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
});
