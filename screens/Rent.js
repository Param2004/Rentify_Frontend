// src/screens/RentScreen.js
import React from 'react';
import WebViewContainer from '../components/WebViewContainer';

const RentScreen = ({route}) => {
    const { username } = route.params;
    // const rentUrl = `https://chat-app-navy-tau.vercel.app/lease/${username}`;
    return <WebViewContainer source={{ uri: `https://chat-app-navy-tau.vercel.app/lease/${username}` }} />;
};

export default RentScreen;
