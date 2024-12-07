import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, PermissionsAndroid, Alert, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import WebViewContainer from '../components/WebViewContainer';

const RealTimeMapScreen = ({ route }) => {
    const { username } = route.params;
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [loading, setLoading] = useState(true);

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            ]);
            return (
                granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
                granted['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
            );
        }
        return true;
    };
    
    useEffect(() => {
        const startLocationUpdates = async () => {

            const permissionGranted = await requestLocationPermission();

            if(permissionGranted){
                setLoading(false);
            const watchId = Geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLatitude(latitude);
                    setLongitude(longitude);
                    setLoading(false);
                    console.log(latitude, longitude);
                },
                (error) => {
                    console.error('Error watching location:', error);
                    Alert.alert('Error', 'Unable to fetch location updates.');
                },
                { enableHighAccuracy: false, distanceFilter: 1 }
            );

            return () => {
                Geolocation.clearWatch(watchId);
            };
            }
        };

        startLocationUpdates();
    }, [username]);

    if (loading || !latitude || !longitude) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#6200ea" />
            </View>
        );
    }

    return (
        <WebViewContainer
            source={{ uri: `https://levelup-eta.vercel.app/map?username=${username}&latitude=${latitude}&longitude=${longitude}` }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            geolocationEnabled={true}
            onMessage={(event) => {
                console.log('Message from WebView:', event.nativeEvent.data);
            }}
        />
    );
};

export default RealTimeMapScreen;







// import React, { useEffect, useState, useRef } from 'react';
// import { View, ActivityIndicator, PermissionsAndroid, Alert, Platform } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
// import WebViewContainer from '../components/WebViewContainer';
// import axios from 'axios';

// const RealTimeMapScreen = ({ route }) => {
//     const { username } = route.params;
//     const [latitude, setLatitude] = useState(null);
//     const [longitude, setLongitude] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const webViewRef = useRef(null);
//     const API_URL = 'https://levelup-6gdt.onrender.com';

//     const requestLocationPermission = async () => {
//         if (Platform.OS === 'android') {
//             const granted = await PermissionsAndroid.requestMultiple([
//                 PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//                 PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
//             ]);
//             return (
//                 granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
//                 granted['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
//             );
//         }
//         return true;
//     };

//     useEffect(() => {
//         const fetchNearbyUsers = async () => {
//             try {
//                 const response = await axios.get(`${API_URL}/api/users/${username}/nearby`);
//                 console.log(response.data);
//                 if (webViewRef.current) {
//                     webViewRef.current.postMessage(
//                         JSON.stringify({
//                             type: 'nearbyUsers',
//                             data: response.data,
//                         })
//                     );
//                 }
//             } catch (error) {
//                 console.error('Error fetching nearby users:', error);
//             }
//         };

//         const startLocationUpdates = async () => {
//             const permissionGranted = await requestLocationPermission();
//             if (!permissionGranted) {
//                 Alert.alert('Permission Denied', 'Location access is required for real-time updates.');
//                 setLoading(false);
//                 return;
//             }

//             const watchId = Geolocation.watchPosition(
//                 (position) => {
//                     const { latitude, longitude } = position.coords;
//                     setLatitude(latitude);
//                     setLongitude(longitude);
//                     setLoading(false);
//                     console.log(latitude, longitude);
//                     if (webViewRef.current) {
//                         webViewRef.current.postMessage(
//                             JSON.stringify({
//                                 type: 'userLocation',
//                                 data: { latitude, longitude, username },
//                             })
//                         );
//                     }
//                 },
//                 (error) => {
//                     console.error('Error watching location:', error);
//                     Alert.alert('Error', 'Unable to fetch location updates.');
//                 },
//                 { enableHighAccuracy: false, distanceFilter: 1 }
//             );

//             const intervalId = setInterval(fetchNearbyUsers, 5000);

//             return () => {
//                 Geolocation.clearWatch(watchId);
//                 clearInterval(intervalId);
//             };
//         };

//         startLocationUpdates();
//     }, [username]);

//     if (loading || !latitude || !longitude) {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                 <ActivityIndicator size="large" color="#6200ea" />
//             </View>
//         );
//     }

//     return (
//         <WebViewContainer
//             ref={webViewRef}
//             source={{ uri: `https://levelup-eta.vercel.app/map?username=${username}&latitude=${latitude}&longitude=${longitude}` }}
//             javaScriptEnabled={true}
//             domStorageEnabled={true}
//             geolocationEnabled={true}
//             onMessage={(event) => {
//                 console.log('Message from WebView:', event.nativeEvent.data);
//             }}
//         />
//     );
// };

// export default RealTimeMapScreen;




// import React, { useEffect, useState, useRef } from 'react';
// import { View, ActivityIndicator, Alert, PermissionsAndroid, Platform } from 'react-native';
// import WebViewContainer from '../components/WebViewContainer';
// import Geolocation from '@react-native-community/geolocation';

// const MapScreen = ({ route }) => {
//   const { username } = route.params;
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const webViewRef = useRef(null);

//     const requestLocationPermission = async () => {
//       try {
//         if (Platform.OS === 'android') {
//           const granted = await PermissionsAndroid.requestMultiple([
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//             PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
//             PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
//           ]);

//           if (
//             granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
//             granted['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
//           ) {
//             console.log('Location permissions granted.');
//             return true;
//           } else {
//             Alert.alert('Permission Denied', 'Location access is required to use this feature.');
//             return false;
//           }
//         }
//         return true;
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     };


//   useEffect(() => {
//     const fetchLocation = async () => {
//       const permissionGranted = await requestLocationPermission();
//       if (!permissionGranted) {
//         Alert.alert('Permission Denied', 'Location access is required to use this feature.');
//         setLoading(false);
//         return;
//       }

//       const watchId = Geolocation.watchPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLatitude(latitude);
//           setLongitude(longitude);
//           setLoading(false);
//           console.log(latitude, longitude);
//           // Send updated coordinates to the WebView
//           if (webViewRef.current) {
//             webViewRef.current.postMessage(
//               JSON.stringify({ latitude, longitude, username })
//             );
//           }
//         },
//         (error) => {
//           switch (error.code) {
//             case 1: // PERMISSION_DENIED
//               Alert.alert('Permission Denied', 'Please grant location permissions.');
//               break;
//             case 2: // POSITION_UNAVAILABLE
//               Alert.alert('Location Unavailable', 'Unable to determine location. Try again later.');
//               break;
//             case 3: // TIMEOUT
//               Alert.alert('Timeout', 'Unable to fetch location. Ensure GPS is enabled.');
//               break;
//             default:
//               Alert.alert('Error', 'Something went wrong. Please try again.');
//           }
//         },
//         { enableHighAccuracy: false, distanceFilter: 1 }
//       );

//       // Cleanup the watchPosition listener on unmount
//       return () => Geolocation.clearWatch(watchId);
//     };

//     fetchLocation();
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#6200ea" />
//       </View>
//     );
//   }

//   if (!latitude || !longitude) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Alert.alert title="Error" message="Unable to fetch location." />
//       </View>
//     );
//   }

//       const mapUrl = `https://levelup-eta.vercel.app/map?username=${username}&latitude=${latitude}&longitude=${longitude}`;
//     return <WebViewContainer 
//             ref={webViewRef}
//             url = { mapUrl }
//             geolocationEnabled={true} // Enable geolocation
//             javaScriptEnabled={true} // Ensure JavaScript is enabled
//             domStorageEnabled={true} // Allow DOM storage
//             onMessage={(event) => {
//                 console.log('Message from WebView:', event.nativeEvent.data);
//             }}
//         />;
// };

// export default MapScreen;