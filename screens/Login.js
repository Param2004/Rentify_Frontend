import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';


// Backend API URL
const API_URL = 'https://likely-milka-anamana-820897df.koyeb.app/auth'; // Use localhost for Android emulator

// Login Screen
const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/login`, { username, password });
            await AsyncStorage.setItem('jwt', response.data.token);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home', params: { username } }],
            }); // Navigate to the Home screen after login
        } catch (error) {
            Alert.alert('Login Failed', error.response?.data?.message || 'Error logging in');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Username"
                style={styles.input}
                onChangeText={setUsername}
                value={username}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.input}
                onChangeText={setPassword}
                value={password}
            />
            <Button style={styles.btn} title="Login" onPress={handleLogin} />
            <Button
                title="Go to Register"
                style={styles.btn}
                onPress={() => navigation.navigate('Register')} // Navigate to Register screen
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    input: { width: '80%', color:'#000', padding: 10, margin: 10, borderWidth: 2, borderRadius: 8 },
    btn: { margin: 10, padding: 10 },
});

export default LoginScreen;