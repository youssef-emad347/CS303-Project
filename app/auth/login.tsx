import React , { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text , StyleSheet  , TextInput , Pressable} from 'react-native'
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        try {
          await signInWithEmailAndPassword(auth, email, password);
          console.log('Login successful');
          setError('');
          router.push('/(tabs)/cart');
        } catch (err) {
          console.error('Login error:', err);
          setError('Invalid email or password');
          alert('Invalid email or password');
        }
      };

    return (
    <View style={styles.container} >
      <Text style={styles.header}>login</Text>

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={email => setEmail(email)}
        keyboardType="email-address"
      />
      {/* password */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={password => setPassword(password)}
        secureTextEntry // to hide the password
        
      />

      {/* forgot password */}
        <Pressable>
            <Text style={styles.forgotPassword} onPress={() => {router.push('/auth/forgetPassord') }}>
            Forgot Password?
            </Text>
        </Pressable>

        {/* login button */}
        <Pressable style={styles.signInButton} onPress={() => {handleLogin()}}>
            <Text style={styles.signInText} >
            Login
            </Text>
        </Pressable>

        {/* Sign up link */}
        <Text style={styles.signupText}>
            Don't have an account? 
            <Pressable onPress={() => router.push('/auth/signup') }>
                <Text style={styles.signupLink}> Sign up</Text>
            </Pressable>
        </Text>
    </View>
  )
}


export default login



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        justifyContent: 'center',
        backgroundColor: '#FDF5E6',
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
      forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: 6,
        marginBottom: 20,
        color: '#2e4d3f',
        fontWeight: '600',
      },
      signInButton: {
        backgroundColor: '#2e4d3f',
        paddingVertical: 14,
        borderRadius: 30,
        marginBottom: 16,
      },
      signInText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '500',
        fontSize: 16,
      },
      signupText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#444',
        marginBottom: 20,
      },
      signupLink: {
        fontSize: 15,
        color: '#2e4d3f',
        fontWeight: '600',
      },
})