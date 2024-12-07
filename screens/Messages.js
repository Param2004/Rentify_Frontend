// src/screens/MessagesScreen.js
import React from 'react';
import WebViewContainer from '../components/WebViewContainer';

const MessagesScreen = ({ route }) => {
    const { username } = route.params;
    return <WebViewContainer source={{ uri: `https://chat-app-navy-tau.vercel.app/messages/${username}` }} />;
};

export default MessagesScreen;
