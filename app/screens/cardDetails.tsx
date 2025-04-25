import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const CardDetailsScreen = () => {
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Card details</Text>

      <Text style={styles.label}>Card name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter card name"
        value={cardName}
        onChangeText={setCardName}
      />

      <Text style={styles.label}>Card number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter card number"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={setCardNumber}
      />

      <Text style={styles.label}>Expiry date</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter expiry date"
        value={expiryDate}
        onChangeText={setExpiryDate}
      />

      <Text style={styles.label}>CVV</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter cvv"
        keyboardType="numeric"
        secureTextEntry
        value={cvv}
        onChangeText={setCvv}
      />

      <TouchableOpacity style={styles.continueBtn}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryBtn}>
        <Text style={styles.secondaryText}>Continue shopping</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CardDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 20,
    color: '#222',
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#444',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  continueBtn: {
    backgroundColor: '#214E34',
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 30,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#214E34',
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 15,
    alignItems: 'center',
  },
  secondaryText: {
    color: '#214E34',
    fontSize: 16,
    fontWeight: '500',
  },
});
