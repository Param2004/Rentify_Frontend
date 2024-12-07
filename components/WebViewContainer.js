import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { BackHandler, Alert, RefreshControl } from 'react-native';
import WebView from 'react-native-webview';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView, StyleSheet } from 'react-native';

const WebViewContainer = forwardRef((props, ref) => {
    const webViewRef = useRef(null);
    const [canGoBack, setCanGoBack] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();

    // Handle the back button press
    const handleBackPress = () => {
        if (canGoBack && webViewRef.current) {
            webViewRef.current.goBack(); // Navigate back within the WebView
            return true; // Prevent the default back action
        } else {
            if (isFocused) {
                Alert.alert('Exit App', 'Do you want to exit the app?', [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Exit', onPress: () => BackHandler.exitApp() },
                ]);
            }
            return true; // Prevent app from closing immediately
        }
    };

    useEffect(() => {
        // Add back button listener
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            backHandler.remove();
        };
    }, [canGoBack, isFocused]);

    const onRefresh = () => {
        setRefreshing(true);
        webViewRef.current.reload();
        setRefreshing(false);
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <WebView
                {...props}
                ref={(r) => {
                    webViewRef.current = r;
                    if (typeof ref === 'function') {
                        ref(r);
                    } else if (ref) {
                        ref.current = r;
                    }
                }}
                onNavigationStateChange={(navState) => {
                    setCanGoBack(navState.canGoBack);
                }}
                startInLoadingState={true}
            />
        </ScrollView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default WebViewContainer;