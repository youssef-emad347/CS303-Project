import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TextInput, Pressable, Image, Alert, ActivityIndicator } from 'react-native';
import { auth } from '@/firebase/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { backgroundColor } from "@/utils/constants";
import logo from "@/assets/logo.png";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          router.replace('/(tabs)'); // Redirect if already logged in
        }
      });
      return unsubscribe;
    }, []);
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful');
            
            // Redirect to home screen after successful login
            router.replace('/(tabs)'); // Change this to your desired home screen
            
        } catch (error: any) {
            console.error('Login error:', error);
            let errorMessage = 'Login failed. Please try again.';
            
            // Handle specific auth errors
            if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address';
            } else if (error.code === 'auth/user-not-found') {
                errorMessage = 'User not found';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password';
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = 'Too many attempts. Try again later.';
            }
            
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.header}>Login to your account</Text>

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            {/* Password */}
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />

            {/* Forgot password */}
            <Pressable onPress={() => router.push('/auth/forgetPassword')}>
                <Text style={styles.forgotPassword}>
                    Forgot Password?
                </Text>
            </Pressable>

            {/* Login button */}
            <Pressable 
                style={[styles.signInButton, loading && styles.disabledButton]} 
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.signInText}>Login</Text>
                )}
            </Pressable>

            {/* Sign up link */}
            <Text style={styles.signupText}>
                Don't have an account? 
                <Pressable onPress={() => router.push('/auth/signup')}>
                    <Text style={styles.signupLink}> Sign up</Text>
                </Pressable>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
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
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: 8,
        marginBottom: 10,
        fontSize: 14,
        color: '#2e4d3f',
        fontWeight: '600',
    },
    signInButton: {
        backgroundColor: '#2e4d3f',
        paddingVertical: 14,
        borderRadius: 30,
        marginBottom: 16,
    },
    disabledButton: {
        opacity: 0.7,
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
        marginBottom: 10,
    },
    signupLink: {
        fontSize: 15,
        color: '#2e4d3f',
        fontWeight: '600',
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: "center",
        marginTop: 30,
        marginBottom: 50,
    },
});

export default Login;