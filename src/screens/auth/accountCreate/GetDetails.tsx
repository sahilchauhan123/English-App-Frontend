// import React, { useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// // Define the Login functional component
// const Login = () => {
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
//       const response = await postDataToBackend(userInfo.data?.idToken);
//       console.log('Response from backend:', response);
//     } catch (error) {
//       // Log any errors that occur during the sign-in process
//       console.error('Sign-in Error:', error);
//     }
//   };

//   // Function to send user data (Google ID token) to your backend server
//   const postDataToBackend = async (googleToken) => {
//     try {
//       console.log('User Info1:', googleToken); // Log the token being sent

//       // Make a POST request to your backend API endpoint
//       const response = await fetch("http://192.168.193.24:8082/api/auth/creategoogleuser", {
//         method: 'POST', // Specify the HTTP method as POST
//         headers: {
//           "Content-Type": "application/json" // Set content type to JSON
//         },
//         // Convert the JavaScript object to a JSON string for the request body
//         body: JSON.stringify({
//           id_token: googleToken,
//           username: "sahilfaceyou",
//           interests: ["Sports", "Coding", "Books"],
//           gender: "M",
//           age: "25",
//           native_language: "Hindi",
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
// export default Login;

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



import React, {useRef, useState} from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors, fonts} from '../../../../assets/constants';
import {TabView} from 'react-native-tab-view';
import LanguageSelector from './LanguageSelector';
import GenderScreen from './GenderScreen';
import LinearGradient from 'react-native-linear-gradient';
import EnglishLevel from './EnglishLevel';
import MainChallange from './MainChallange';

const Line = () => <View style={styles.line} />;

const GradientLine = () => {
  return (
    <LinearGradient
      colors={[colors.gradient.first, colors.gradient.last]}
      start={{x: 0, y: 0}}
      end={{x: 0.8, y: 0}}
      style={styles.gradientLine}
    />
  );
};

const GetDetails = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Language'},
    {key: 'second', title: 'GenderScreen'},
    {key: 'third', title: 'OTP'},
    {key: 'fourth', title: 'Challenge'},
  ]);

  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'first':
        return <LanguageSelector jumpTo={jumpTo} />;
      case 'second':
        return <GenderScreen jumpTo={jumpTo} />;
      case 'third':
        return <EnglishLevel jumpTo={jumpTo} />;
      case 'fourth':
        return <MainChallange jumpTo={jumpTo} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressContainer}>
        {routes.map((step, i) => (
          <View key={i}>{index >= i ? <Line /> : <GradientLine />}</View>
        ))}
      </View>
      <View style={{flex: 1, marginTop: hp(2)}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          swipeEnabled={true}
          renderTabBar={() => null}
          lazy
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  progressContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(8),
  },
  line: {
    height: hp(0.7),
    width: wp(12),
    backgroundColor: colors.gradient.first,
    borderRadius: wp(1),
    marginHorizontal: wp(0.6),
  },
  gradientLine: {
    height: hp(0.7),
    width: wp(12),
    borderRadius: wp(1),
    marginHorizontal: wp(0.6),
    opacity: 0.13,
  },
});

export default GetDetails;
