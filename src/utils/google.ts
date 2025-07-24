

import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const GoogleSignUp = async () => {
    try {
        GoogleSignin.configure({
            webClientId: '654497521442-4kdbkr8v9gker2ndkbadseu8ufmp33j2.apps.googleusercontent.com',
            offlineAccess: false,
        });
        // Check if Google Play Services are available on the device
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        return userInfo.data?.idToken
    } catch (error) {
        // Log any errors that occur during the sign-in process
        console.error('Sign-in Error:', error);
    }
};
// }
// Function to send user data (Google ID token) to your backend server
// const postDataToBackend = async (googleToken) => {
//   try {
//     console.log('User Info1:', googleToken); // Log the token being sent

//     // Make a POST request to your backend API endpoint
//     const response = await fetch("http://10.90.137.24:8080/api/auth/google/signup", {
//       method: 'POST', // Specify the HTTP method as POST
//       headers: {
//         "Content-Type": "application/json" // Set content type to JSON
//       },
//       // Convert the JavaScript object to a JSON string for the request body
//       body: JSON.stringify({
//         id_token: googleToken,
//         username: "sahilfaceyou",
//         interests: ["Sports", "Coding", "Books"],
//         gender: "M",
//         age: "25",
//         native_language: "Hindi",
//       }),
//     });
//     // Parse the JSON response from the backend
//     return await response.json();
//   } catch (error) {
//     // Log any errors that occur during the backend communication
//     console.error('Error posting data to backend:', error);
//   }
// };

//     const postDataToBackend1 = async (googleToken: string) => {
//         try {
//             console.log('User Info1:', googleToken); // Log the token being sent

//             // Make a POST request to your backend API endpoint
//             const response = await fetch("http://10.90.137.24:8080/api/auth/google/login", {
//                 method: 'POST', // Specify the HTTP method as POST
//                 headers: {
//                     "Content-Type": "application/json" // Set content type to JSON
//                 },
//                 // Convert the JavaScript object to a JSON string for the request body
//                 body: JSON.stringify({
//                     id_token: googleToken,
//                     // username: "sahilfaceyou",
//                     // interests: ["Sports", "Coding", "Books"],
//                     // gender: "M",
//                     // age: "25",
//                     // native_language: "Hindi",
//                 }),
//             });
//             // Parse the JSON response from the backend
//             return await response.json();
//         } catch (error) {
//             // Log any errors that occur during the backend communication
//             console.error('Error posting data to backend:', error);
//         }
//     };

//     // Function to fetch data from a different backend endpoint (for testing/demonstration)
//     const fetchData = async () => {
//         try {
//             const res = await fetch("http://192.168.229.24:8082/ping/sahil");
//             const data = await res.json();
//             console.log(data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     // Render the UI for the Login component
//     return (
//         <View style= { styles.container } >
//         <Text style={ styles.title }> App </Text>

//     {/* Button to trigger Google Sign-Up */ }
//     <TouchableOpacity onPress={ GoogleSignUp } style = { styles.button } >
//         <Text style={ styles.buttonText }> Create Account </Text>
//             </TouchableOpacity>

//     {/* Button to fetch data from the Golang backend */ }
//     <TouchableOpacity onPress={ fetchData } style = { styles.button } >
//         <Text style={ styles.buttonText }> Get Data From Golang </Text>
//             </TouchableOpacity>

//     {/* The commented-out button from the original snippet */ }
//     {/* <TouchableOpacity onPress={fetchData} style={{ padding: 10, backgroundColor: 'green' }}>
//         <Text>Create Account</Text>
//       </TouchableOpacity> */}
//     </View>
//   );
// };

// // Export the Login component as the default export
// export default App;

// // Define styles for the component using StyleSheet
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//         backgroundColor: '#f0f0f0', // Light background for better visibility
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 30,
//         color: '#333',
//     },
//     button: {
//         paddingVertical: 12,
//         paddingHorizontal: 25,
//         backgroundColor: '#4CAF50', // Green button
//         borderRadius: 8,
//         marginBottom: 15,
//         elevation: 3, // Android shadow
//         shadowColor: '#000', // iOS shadow
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 3,
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: '600',
//     },
// });
