import { backgroundColor } from '@/utils/constants';
import React, { useState } from 'react';
import { router } from 'expo-router';

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { addCredit } from '../../firebase/creditService';
import { Credit } from '../../utils/models/Credit';
import { router, useRouter } from 'expo-router';

const CardDetailsScreen = () => {
  const router=useRouter();
  const [cardName, setCardName] = useState('');
  const [cardNameErr, setCardNameErr] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardNumberErr, setCardNumberErr] = useState('');
  //const [expiryDate, setExpiryDate] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryMonthErr, setExpiryMonthErr] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [expiryYearErr, setExpiryYearErr] = useState('');
  const [cvv, setCvv] = useState('');
  const [cvvErr, setCvvErr] = useState('');
  const handleAddCredit = async () => {
    
  
    // Trim input values
    const trimmedName = cardName.trim();
    const trimmedNumber = cardNumber.replace(/\s+/g, '');
    const trimmedCVV = cvv.trim();
    const fullExpiryDate = `${expiryMonth}/${expiryYear}`.trim();
    const now = new Date();
    const currentYear = now.getFullYear() % 100; // two-digit year
    const currentMonth = now.getMonth() + 1;
    const yearNum = parseInt(expiryYear, 10);
    const monthNum = parseInt(expiryMonth, 10);
    if((!trimmedName || trimmedName.split(" ").length < 2)||
    (!/^\d{16}$/.test(trimmedNumber))||
    (isNaN(monthNum) || monthNum < 1 || monthNum > 12)||
    (isNaN(yearNum) || yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth))||
    (!/^\d{3,4}$/.test(trimmedCVV))
    

    ){
      if (!trimmedName || trimmedName.split(" ").length < 2) {
        setCardNameErr("Please enter the full cardholder name.");
      }
      if (!/^\d{16}$/.test(trimmedNumber)) {
        setCardNumberErr("Card number must be exactly 16 digits.");
      }
      if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
        setExpiryMonthErr("Expiry month must be between 1 and 12.");
      }
      if (isNaN(yearNum) || yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
        setExpiryYearErr("Expiry date is in the past.");
      }
      if (!/^\d{3,4}$/.test(trimmedCVV)) {
        setCvvErr("CVV must be 3 or 4 digits.");
      }

    }else{
      const credit: Credit = {
        cardName: trimmedName,
        cardNumber: trimmedNumber,
        expiryDate: fullExpiryDate,
        cvv: trimmedCVV,
      };
      
    
      try {
        await addCredit(credit);

        router.push(`/screens/successScreen`)
      } catch (err) {
        console.error("Failed to add credit:", err);
        alert("An error occurred while adding the credit card.");
      }
    }
  
  
    
  
  
    
  };
  

  return (
    <View>
         <Stack.Screen 
        options={{ 
          title: 'Card Details', // تغيير العنوان للعربية
          headerStyle: {
            backgroundColor: '#214E34', // لون أخضر داكن
            elevation: 0, // إزالة الظل في الأندرويد
          },
          headerTintColor: 'white', // لون النص أبيض
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerBackVisible: true, // إخفاء زر الرجوع
          headerTitleAlign: 'center', // توسيط العنوان
        }} 
      />

     <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Card name</Text>
      <Text style={styles.error}>{cardNameErr}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter card name"
        value={cardName}
        onChangeText={setCardName}
      />

      <Text style={styles.label}>Card number</Text>
      <Text style={styles.error}>{cardNumberErr}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter card number"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
     
      <Text style={styles.label}>Expiry Month</Text>
      <Text style={styles.error}>{expiryMonthErr}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter expiry month"
        value={expiryMonth}
        onChangeText={setExpiryMonth}
      />
      <Text style={styles.label}>Expiry Year</Text>
      <Text style={styles.error}>{expiryYearErr}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter expiry year"
        value={expiryYear}
        onChangeText={setExpiryYear}
      />

      <Text style={styles.label}>CVV</Text>
      <Text style={styles.error}>{cvvErr}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter cvv"
        keyboardType="numeric"
        secureTextEntry
        value={cvv}
        onChangeText={setCvv}
      />

      <Pressable style={styles.continueBtn} onPress={()=>handleAddCredit()}>
        <Text style={styles.continueText}>Add</Text>
        
      </Pressable>

      <Pressable style={styles.secondaryBtn} onPress={() => router.push('/(tabs)/cart')}>
        <Text style={styles.secondaryText}>Continue shopping</Text>
      </Pressable>
    </ScrollView>
  
    {/* باقي محتوى الشاشة */}
  </View>

   );
};

export default CardDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: backgroundColor,
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
  error:{
    color:"red"
  },
});
