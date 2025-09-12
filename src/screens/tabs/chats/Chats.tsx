// import { ScrollView, StyleSheet, Text, View,Button } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import ProfileSection from '../../../components/ProfileSection'
// import useAuthStore from '../../../store/useAuthStore'  

// import Tts from "react-native-tts"; // for text-to-speech
// import { retrieveUserSession } from '../../../utils/tokens';


// const Chats = () => {
//   const [recognizedText, setRecognizedText] = useState("");
//   const [aiResponse, setAiResponse] = useState("");
//   const [isListening, setIsListening] = useState(false);

//   useEffect(() => {
//     console.log("Voice module:", Voice);

//     // Voice event handlers
//     Voice.onSpeechResults = (event) => {
//       const text = event.value[0]; // take the first recognized result
//       setRecognizedText(text);
//       sendToAPI(text);
//     };

//     Voice.onSpeechError = (err) => {
//       console.error("Speech Error:", err);
//       setIsListening(false);
//     };

//     return () => {
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);

//   const startListening = async () => {
//     try {
//       setIsListening(true);
//       await Voice.start("en-US");
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const stopListening = async () => {
//     try {
//       await Voice.stop();
//       setIsListening(false);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const sendToAPI = async (userText: string) => {
//     try {
//       const { accessToken } = await retrieveUserSession();
//       const response = await fetch(
//         "https://english-convo-ai.strango.workers.dev/chat/motivator",
//         {
//           method: "POST",
//           headers: { 
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${accessToken}`
//            },

//           body: JSON.stringify({
//             messages: [{ role: "user", content: userText }],
//           }),
//         }
//       );

//       const data = await response.json();
//       const reply = data.choices[0].message.content;

//       setAiResponse(reply);
//       Tts.speak(reply); // speak response
//     } catch (error) {
//       console.error("API Error:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🎙 AI Voice Chat</Text>

//       <Button
//         title={isListening ? "Stop Listening" : "Start Talking"}
//         onPress={isListening ? stopListening : startListening}
//       />

//       <Text style={styles.label}>You said:</Text>
//       <Text style={styles.text}>{recognizedText}</Text>

//       <Text style={styles.label}>AI replied:</Text>
//       <Text style={styles.text}>{aiResponse}</Text>
//     </View>
//   );
// }

// export default Chats;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 18,
//     marginTop: 20,
//     fontWeight: "600",
//   },
//   text: {
//     fontSize: 16,
//     marginTop: 10,
//     textAlign: "center",
//   },
// });






import { StyleSheet, Text, View, Button, Platform, PermissionsAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import VoiceToText, { VoiceToTextEvents } from "@appcitor/react-native-voice-to-text";
import Tts from "react-native-tts"; // for text-to-speech
import { retrieveUserSession } from "../../../utils/tokens";

const Chats = () => {
  const [recognizedText, setRecognizedText] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isListening, setIsListening] = useState(false);

  // useEffect(() => {
  //   requestMicrophonePermission();

  //   // Listen for final results
  //   const resultsListener = VoiceToText.addEventListener(
  //     VoiceToTextEvents.RESULTS,
  //     (event) => {
  //       const text = event.value; // recognized speech
  //       setRecognizedText(text);
  //       sendToAPI(text);
  //     }
  //   );

  //   // Handle errors
  //   const errorListener = VoiceToText.addEventListener(
  //     VoiceToTextEvents.ERROR,
  //     (err) => {
  //       console.error("Speech Error:", err);
  //       setIsListening(false);
  //     }
  //   );

  //   // Listening state handlers
  //   const startListener = VoiceToText.addEventListener(
  //     VoiceToTextEvents.START,
  //     () => setIsListening(true)
  //   );

  //   const endListener = VoiceToText.addEventListener(
  //     VoiceToTextEvents.END,
  //     () => setIsListening(false)
  //   );

  //   return () => {
  //     VoiceToText.destroy();
  //     resultsListener.remove();
  //     errorListener.remove();
  //     startListener.remove();
  //     endListener.remove();
  //   };
  // }, []);


  async function requestMicrophonePermission() {
    if (Platform.OS !== 'android') return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'This app needs access to your microphone for speech recognition',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  // const startListening = async () => {
  //   try {
  //     await VoiceToText.startListening();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // const stopListening = async () => {
  //   try {
  //     await VoiceToText.stopListening();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const sendToAPI = async (userText: string) => {
    console.log("Sending to API:", userText);

    try {
      const { accessToken } = await retrieveUserSession();
      console.log("accessToken in chat", accessToken);

      const response =  await fetch(
        "https://english-convo-ai.strango.workers.dev/chat/flirty",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            messages: [{ role: "user", content: "hi" }],
          }),
        }
      );

      console.log("✅ API Response Status:", response);

      // const data = await response.json();
      // console.log("✅ API Response Data:", data);

      // const reply = data?.choices?.[0]?.message?.content ?? "No reply";
      // setAiResponse(reply);
      // Tts.speak(reply);

    } catch (err) {
      console.error("❌ API Fetch Error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎙 AI Voice Chat</Text>

      {/* <Button
        title={isListening ? "Stop Listening" : "Start Talking"}
        onPress={isListening ? stopListening : startListening}
      /> */}
{/* 
      <Text style={styles.label}>You said:</Text>
      <Text style={styles.text}>{recognizedText}</Text>

      <Text style={styles.label}>AI replied:</Text> */}
      <Button onPress={()=>sendToAPI("hiiii")} title="sasa"/>
      {/* <Text style={styles.text}>{aiResponse}</Text> */}
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "600",
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
});
