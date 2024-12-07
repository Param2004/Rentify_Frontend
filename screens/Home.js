// src/screens/HomeScreen.js
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessagesScreen from './Messages';
import MapScreen from './Map';
import RentScreen from './Rent';
import Icon from 'react-native-vector-icons/Ionicons';
import Navbar from '../components/Navbar';
import { View, StyleSheet, Button } from 'react-native';

const Tab = createBottomTabNavigator();
const HomeScreen = ({ username , route, navigation}) => {
    username = route.params?.username || username;

    const handleLogout = async () => {
        try {
            // Clear AsyncStorage
            await AsyncStorage.removeItem('jwt');
            username = null;

            // Navigate to Login Screen
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Navbar username={username} />
            <Button title="Logout" onPress={handleLogout} />
            <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Messages') {
                        iconName = 'chatbox-ellipses-outline'; // Icon for Messages
                    } else if (route.name === 'Rent') {
                        iconName = 'pricetag-outline'; // Icon for Rent
                    } else if (route.name === 'Map') {
                        iconName = 'map-outline'; // Icon for Map
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#6200ea',
                tabBarInactiveTintColor: 'gray',
            })}
            >
                <Tab.Screen
                    name="Messages"
                    component={MessagesScreen}
                    initialParams={{ username }}
                />
                <Tab.Screen 
                    name="Map" 
                    component={MapScreen} 
                    initialParams={{ username }}
                />
                <Tab.Screen
                    name="Rent"
                    component={RentScreen}
                    initialParams={{ username }}
                />
            </Tab.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default HomeScreen;
