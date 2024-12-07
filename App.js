import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode} from 'jwt-decode'; 
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import HomeScreen from './screens/Home';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [initialRoute, setInitialRoute] = useState('Login');
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = await AsyncStorage.getItem('jwt');
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    if (decodedToken && decodedToken.username) {
                        setUsername(decodedToken.username);
                        setInitialRoute('Home');
                    } else {
                        console.warn('Invalid token payload, username not found.');
                    }
                } catch (err) {
                    console.error('Error decoding token:', err);
                }
            }
            setIsLoading(false);
        };        
        checkLoginStatus();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#6200ea" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen
                    name="Home"
                    options={{ headerShown: false }}
                >
                    {(props) => <HomeScreen {...props} username={username} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
