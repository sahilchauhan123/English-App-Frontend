import {Platform, StatusBar, StyleSheet, View } from 'react-native'
import React from 'react'
import Navigation from './src/navigation/Navigation'

StatusBar.setBarStyle("light-content");
if (Platform.OS === "android") {
  StatusBar.setBackgroundColor("rgba(0,0,0,0)");
  StatusBar.setTranslucent(true);
}

const App = () => {
  return (
    <View style={{ flex: 1 }} >
      <Navigation />
    </View>

  )
}

export default App

const styles = StyleSheet.create({})




// import React, { useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// // Define the Login functional component
// const App = () => {
//   // useEffect hook to configure Google Sign-In when the component mounts
//   useEffect(() => {
//     GoogleSignin.configure({
//       // webClientId is essential for authenticating with your backend server
//       // This client ID is specific to your Google Cloud Project
//       webClientId: '654497521442-4kdbkr8v9gker2ndkbadseu8ufmp33j2.apps.googleusercontent.com',
//       // offlineAccess: false means you won't request a refresh token for offline access
//       offlineAccess: false,
//     });
//   }, []); // Empty dependency array ensures this runs only once on mount

//   // Function to handle Google Sign-Up process
//   const GoogleSignUp = async () => {
//     try {
//       // Check if Google Play Services are available on the device
//       await GoogleSignin.hasPlayServices();
//       // Initiate the Google Sign-In flow and get user information
//       const userInfo = await GoogleSignin.signIn();
//       // Log the user's ID token (commented out in original, but useful for debugging)
//       // console.log('User Info:', userInfo.data?.idToken);

//       // Post the obtained Google ID token to your backend
//       const response = await postDataToBackend1(userInfo.data?.idToken);
//       console.log('Response from backend:', response);
//     } catch (error) {
//       // Log any errors that occur during the sign-in process
//       console.error('Sign-in Error:', error);
//     }
//   };

//   // Function to send user data (Google ID token) to your backend server
//   // const postDataToBackend = async (googleToken) => {
//   //   try {
//   //     console.log('User Info1:', googleToken); // Log the token being sent

//   //     // Make a POST request to your backend API endpoint
//   //     const response = await fetch("http://10.90.137.24:8080/api/auth/google/signup", {
//   //       method: 'POST', // Specify the HTTP method as POST
//   //       headers: {
//   //         "Content-Type": "application/json" // Set content type to JSON
//   //       },
//   //       // Convert the JavaScript object to a JSON string for the request body
//   //       body: JSON.stringify({
//   //         id_token: googleToken,
//   //         username: "sahilfaceyou",
//   //         interests: ["Sports", "Coding", "Books"],
//   //         gender: "M",
//   //         age: "25",
//   //         native_language: "Hindi",
//   //       }),
//   //     });
//   //     // Parse the JSON response from the backend
//   //     return await response.json();
//   //   } catch (error) {
//   //     // Log any errors that occur during the backend communication
//   //     console.error('Error posting data to backend:', error);
//   //   }
//   // };

//     const postDataToBackend1 = async (googleToken:string) => {
//     try {
//       console.log('User Info1:', googleToken); // Log the token being sent

//       // Make a POST request to your backend API endpoint
//       const response = await fetch("http://10.90.137.24:8080/api/auth/google/login", {
//         method: 'POST', // Specify the HTTP method as POST
//         headers: {
//           "Content-Type": "application/json" // Set content type to JSON
//         },
//         // Convert the JavaScript object to a JSON string for the request body
//         body: JSON.stringify({
//           id_token: googleToken,
//           // username: "sahilfaceyou",
//           // interests: ["Sports", "Coding", "Books"],
//           // gender: "M",
//           // age: "25",
//           // native_language: "Hindi",
//         }),
//       });
//       // Parse the JSON response from the backend
//       return await response.json();
//     } catch (error) {
//       // Log any errors that occur during the backend communication
//       console.error('Error posting data to backend:', error);
//     }
//   };

//   // Function to fetch data from a different backend endpoint (for testing/demonstration)
//   const fetchData = async () => {
//     try {
//       const res = await fetch("http://192.168.229.24:8082/ping/sahil");
//       const data = await res.json();
//       console.log(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   // Render the UI for the Login component
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>App</Text>

//       {/* Button to trigger Google Sign-Up */}
//       <TouchableOpacity onPress={GoogleSignUp} style={styles.button}>
//         <Text style={styles.buttonText}>Create Account</Text>
//       </TouchableOpacity>

//       {/* Button to fetch data from the Golang backend */}
//       <TouchableOpacity onPress={fetchData} style={styles.button}>
//         <Text style={styles.buttonText}>Get Data From Golang</Text>
//       </TouchableOpacity>

//       {/* The commented-out button from the original snippet */}
//       {/* <TouchableOpacity onPress={fetchData} style={{ padding: 10, backgroundColor: 'green' }}>
//         <Text>Create Account</Text>
//       </TouchableOpacity> */}
//     </View>
//   );
// };

// // Export the Login component as the default export
// export default App;

// // Define styles for the component using StyleSheet
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f0f0f0', // Light background for better visibility
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     color: '#333',
//   },
//   button: {
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     backgroundColor: '#4CAF50', // Green button
//     borderRadius: 8,
//     marginBottom: 15,
//     elevation: 3, // Android shadow
//     shadowColor: '#000', // iOS shadow
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });
