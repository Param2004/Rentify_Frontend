// src/components/Navbar.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Navbar = ({ username }) => {
    return (
        <View style={styles.container}>
            {username ? (
                <Text style={styles.welcomeText}>Welcome, {username}!</Text>
            ) : (
                <Text style={styles.welcomeText}>Welcome to the Home Screen!</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        height: 60,
        backgroundColor: '#6200ea',
        justifyContent: 'center',
        alignItems: 'center',
    },
    username: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Navbar;
