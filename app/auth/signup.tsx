import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image , Pressable } from 'react-native';
import {auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';
export default function SignUpScreen() {
    

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const handleSignUp = async () => {
    if (password !== rePassword) {
      alert("Passwords don't match");
      return;
    }
    if (!email || !password || !username || !rePassword) {
        alert('Please fill in all fields');
        return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Registered user:', user);
      alert('Account created successfully ✅');
      router.push('./login');
    } catch (error) {
      console.error(error);
      alert('Error creating account. Please try again.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>

 
      <Text style={styles.label}>User name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />

    <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Re-Password</Text>
      <TextInput
        style={styles.input}
        placeholder="confirm your password"
        placeholderTextColor="#888"
        value={rePassword}
        onChangeText={setRePassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpText}>Sign up</Text>
      </TouchableOpacity>

      <Text style={styles.logInText}>Already have an account? 
        <Text style={styles.logInLink} onPress={() => router.push('./login')}>Login</Text>
      </Text>  


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    backgroundColor: '#FDF5E6',
  },
  title: {
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
  signUpButton: {
    backgroundColor: '#2e4d3f',
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 24,
    marginBottom: 16,
  },
  signUpText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  logInText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#444',
    marginBottom: 20,
  },
  logInLink: {
    fontSize: 15,
    color: '#2e4d3f',
    fontWeight: '600',
    marginLeft: 5,
  },

});

  