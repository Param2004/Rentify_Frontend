import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';


// Backend API URL
const API_URL = 'https://likely-milka-anamana-820897df.koyeb.app/auth'; // Use localhost for Android emulator
// Register Screen
const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
      try {
          await axios.post(`${API_URL}/register`, { username, password });
          Alert.alert('Registration Successful', 'You can now log in!');
          navigation.navigate('Login');
      } catch (error) {
        console.log(error);
          if (error.response?.status === 409) {
              Alert.alert('Registration Failed', 'Username already exists. Please choose another.');
          } else if (error.response?.status === 400) {
              Alert.alert('Registration Failed', 'All fields are required.');
          } else {
              Alert.alert('Registration Failed', error.response?.data?.message || 'Error registering user');
          }
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
            <Button title="Register" onPress={handleRegister} />
            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('Login')} // Navigate to Login screen
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    input: { width: '80%', padding: 10, margin: 10, borderWidth: 1, borderRadius: 5 },
});

export default RegisterScreen;