import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  PermissionsAndroid,
  Alert,
  FlatList,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import VoiceToText, {
  VoiceToTextEvents,
} from '@appcitor/react-native-voice-to-text';
import Tts from 'react-native-tts';
import { retrieveUserSession } from '../../../utils/tokens';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const Chats = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inCall, setInCall] = useState(false);
  const inCallRef = useRef(false);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);

  useEffect(() => {
    // load voices
    // Tts.getInitStatus()
    //   .then(() => Tts.voices())
    //   .then((voices) => {
    //     const available = (voices || []).filter((v: any) => !v.notInstalled && v.language.startsWith("en"));
    //     if (available.length > 0) {
    //       setSelectedVoice(available[0].id);
    //     }
    //   });

    // STT listener
    const resultsListener = VoiceToText.addEventListener(
      VoiceToTextEvents.RESULTS,
      async event => {
        const text = event?.value;
        if (!text) return;

        // stop listening to avoid echo
        try {
          await VoiceToText.stopListening();
        } catch { }

        addMessage('user', text, async updatedMessages => {
          await sendToAPI(updatedMessages);
        });
      },
    );

    const errorListener = VoiceToText.addEventListener(
      VoiceToTextEvents.ERROR,
      err => {
        console.log('STT Error:', err);
        if (inCallRef.current) {
          setTimeout(() => safeStartListening(), 500);
        }
      },
    );

    // TTS listener
    const onTtsFinish = () => {
      if (inCallRef.current) {
        setTimeout(() => safeStartListening(), 400);
      }
    };
    Tts.addEventListener('tts-finish', onTtsFinish);

    return () => {
      resultsListener.remove();
      errorListener.remove();
      Tts.removeEventListener('tts-finish', onTtsFinish);
      try {
        VoiceToText.destroy();
        VoiceToText.stopListening();
        Tts.stop();
      } catch { }
    };
  }, []);

  useEffect(() => {
    inCallRef.current = inCall;
  }, [inCall]);

  async function requestMic() {
    if (Platform.OS !== 'android') return true;
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  const startCall = async () => {
    const ok = await requestMic();
    if (!ok) {
      Alert.alert('Permission required', 'Microphone permission is needed.');
      return;
    }
    setInCall(true);
    setTimeout(() => safeStartListening(), 200);
  };

  const endCall = async () => {
    setInCall(false);
    try {
      await VoiceToText.stopListening();
      await Tts.stop();
    } catch { }
  };

  const safeStartListening = async () => {
    try {
      await VoiceToText.stopListening();
    } catch { }
    try {
      await VoiceToText.startListening();
    } catch (e) {
      console.log('startListening error:', e);
    }
  };

  const addMessage = (
    role: 'user' | 'assistant',
    content: string,
    callback?: (updated: Message[]) => void,
  ) => {
    setMessages(prev => {
      const updated = [...prev, { id: Date.now().toString(), role, content }];
      if (callback) callback(updated);
      return updated;
    });
  };

  const sendToAPI = async (allMessages: Message[]) => {
    try {
      const { accessToken } = await retrieveUserSession();

      const messagetoAi = allMessages.map(m => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch(
        'https://english-convo-ai.strango.workers.dev/chat/flirty',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ messages: messagetoAi }),
        },
      );

      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content ?? 'No reply';

      addMessage('assistant', reply);
      speakWithVoice(reply);
    } catch (err) {
      console.error('API Error:', err);
      if (inCallRef.current) setTimeout(() => safeStartListening(), 500);
    }
  };

  const speakWithVoice = (text: string) => {
    // if (selectedVoice) Tts.setDefaultVoice(selectedVoice);
    Tts.setDefaultLanguage('hi-in-x-hia-local');
    // Tts.setDefaultRate(1.0);
    Tts.speak(text);
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.bubble,
        item.role === 'user' ? styles.userBubble : styles.aiBubble,
      ]}>
      <Text style={styles.bubbleText}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Voice Chat</Text>

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      {inCall ? (
        <Button title="End Call" onPress={endCall} color="red" />
      ) : (
        <Button title="Start Call" onPress={startCall} color="green" />
      )}
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  bubble: {
    maxWidth: '75%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 12,
  },
  userBubble: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  aiBubble: {
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start',
  },
  bubbleText: {
    fontSize: 16,
  },
});

// import { StyleSheet, Text, View, Button, Platform, PermissionsAndroid, Alert, FlatList } from "react-native";
// import React, { useEffect, useRef, useState } from "react";
// import VoiceToText, { VoiceToTextEvents } from "@appcitor/react-native-voice-to-text";
// import Tts from "react-native-tts";
// import { retrieveUserSession } from "../../../utils/tokens";

// type Message = {
//   id: string;
//   role: "user" | "assistant";
//   content: string;
// };

// const Chats = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inCall, setInCall] = useState(false);
//   const inCallRef = useRef(false);
//   const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
//   const [selectedPersona, setSelectedPersona] = useState<'flirty' | 'teacher' | 'motivator' | 'formal'>('flirty');

//   useEffect(() => {
//     // STT listener
//     const resultsListener = VoiceToText.addEventListener(VoiceToTextEvents.RESULTS, async (event) => {
//       const text = event?.value;
//       if (!text) return;

//       // stop listening to avoid echo
//       try {
//         await VoiceToText.stopListening();
//       } catch { }

//       // Add user message first, then send to API
//       const userMessage: Message = { id: Date.now().toString(), role: "user", content: text };
//       setMessages(prev => [...prev, userMessage]);

//       await sendToAPI(text, [...messages, userMessage]); // Pass updated messages array
//     });

//     const errorListener = VoiceToText.addEventListener(VoiceToTextEvents.ERROR, (err) => {
//       console.log("STT Error:", err);
//       if (inCallRef.current) {
//         setTimeout(() => safeStartListening(), 500);
//       }
//     });

//     // TTS listener
//     const onTtsFinish = () => {
//       if (inCallRef.current) {
//         setTimeout(() => safeStartListening(), 400);
//       }
//     };
//     Tts.addEventListener("tts-finish", onTtsFinish);

//     return () => {
//       resultsListener.remove();
//       errorListener.remove();
//       Tts.removeEventListener("tts-finish", onTtsFinish);
//       try {
//         VoiceToText.destroy();
//         VoiceToText.stopListening();
//         Tts.stop();
//       } catch { }
//     };
//   }, [messages]); // Add messages to dependency array

//   useEffect(() => {
//     inCallRef.current = inCall;
//   }, [inCall]);

//   async function requestMic() {
//     if (Platform.OS !== "android") return true;
//     const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   }

//   const startCall = async () => {
//     const ok = await requestMic();
//     if (!ok) {
//       Alert.alert("Permission required", "Microphone permission is needed.");
//       return;
//     }
//     setInCall(true);
//     setTimeout(() => safeStartListening(), 200);
//   };

//   const endCall = async () => {
//     setInCall(false);
//     try {
//       await VoiceToText.stopListening();
//       await Tts.stop();
//     } catch { }
//   };

//   const safeStartListening = async () => {
//     try {
//       await VoiceToText.stopListening();
//     } catch { }
//     try {
//       await VoiceToText.startListening();
//     } catch (e) {
//       console.log("startListening error:", e);
//     }
//   };

//   const addMessage = (role: "user" | "assistant", content: string) => {
//     setMessages((prev) => [...prev, { id: Date.now().toString(), role, content }]);
//   };

//   // Modified to accept current messages array directly
//   const sendToAPI = async (userText: string, currentMessages: Message[]) => {
//     try {
//       const { accessToken } = await retrieveUserSession();

//       // Convert messages to API format
//       const messageToAi = currentMessages.map((m) => ({
//         role: m.role === "user" ? "user" : "assistant",
//         content: m.content,
//       }));

//       console.log("Sending messages to API:", messageToAi); // Debug log

//       const response = await fetch(`https://english-convo-ai.strango.workers.dev/chat/${selectedPersona}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({
//           messages: messageToAi,
//         }),
//       });

//       const data = await response.json();
//       const reply = data?.choices?.[0]?.message?.content ?? "No reply";

//       addMessage("assistant", reply);
//       speakWithVoice(reply);
//     } catch (err) {
//       console.error("API Error:", err);
//       if (inCallRef.current) setTimeout(() => safeStartListening(), 500);
//     }
//   };

//   const speakWithVoice = (text: string) => {
//     Tts.setDefaultLanguage("en-US"); // Changed to English for better pronunciation
//     Tts.speak(text);
//   };

//   // Add persona selector buttons
//   const renderPersonaSelector = () => (
//     <View style={styles.personaContainer}>
//       <Text style={styles.personaTitle}>Select AI Personality:</Text>
//       <View style={styles.personaButtons}>
//         {(['flirty', 'teacher', 'motivator', 'formal'] as const).map((persona) => (
//           <Button
//             key={persona}
//             title={persona.charAt(0).toUpperCase() + persona.slice(1)}
//             onPress={() => setSelectedPersona(persona)}
//             color={selectedPersona === persona ? "#007AFF" : "#8E8E93"}
//           />
//         ))}
//       </View>
//     </View>
//   );

//   const renderItem = ({ item }: { item: Message }) => (
//     <View style={[styles.bubble, item.role === "user" ? styles.userBubble : styles.aiBubble]}>
//       <Text style={styles.bubbleText}>{item.content}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>AI Voice Chat</Text>

//       {renderPersonaSelector()}

//       <FlatList
//         data={messages}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={{ paddingVertical: 10 }}
//       />

//       {inCall ? (
//         <Button title="End Call" onPress={endCall} color="red" />
//       ) : (
//         <Button title="Start Call" onPress={startCall} color="green" />
//       )}
//     </View>
//   );
// };

// export default Chats;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 10,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginVertical: 10,
//   },
//   personaContainer: {
//     marginBottom: 15,
//     padding: 10,
//     backgroundColor: "#f5f5f5",
//     borderRadius: 8,
//   },
//   personaTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   personaButtons: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     flexWrap: "wrap",
//   },
//   bubble: {
//     maxWidth: "75%",
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 12,
//   },
//   userBubble: {
//     backgroundColor: "#DCF8C6",
//     alignSelf: "flex-end",
//   },
//   aiBubble: {
//     backgroundColor: "#E5E5EA",
//     alignSelf: "flex-start",
//   },
//   bubbleText: {
//     fontSize: 16,
//   },
// });
