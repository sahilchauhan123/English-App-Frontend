import React, { useEffect, useRef, useState } from 'react';
import { useCallStore } from '../../store/useCallStore';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { RTCView } from 'react-native-webrtc';
import useAuthStore from '../../store/useAuthStore';
import { endCall } from '../../services/webrtc';
import { navigate } from '../../navigation/navigationService';

export default function CallScreen({ route }) {
  const data = route.params;
  // console.log("data : ",data)

  const [remoteUser, setremoteUser] = useState(data)
  const { localStream, remoteStream } = useCallStore();
  const { user } = useAuthStore();
  console.log("remote user data : ", data)
  console.log("our data", user.user)

  const HangUp = () => {
    console.log("ending call")
    endCall(remoteUser.id)
    navigate("Home")
  }
  
  return (
    <View style={styles.container}>
      {/* Remote video */}
      {remoteStream && (
        <View style={styles.container}>
          {remoteUser?.full_name && <Image
            source={{ uri: remoteUser.profile_pic }}
            style={{ width: 50, height: 50 }}
          />}

          <Text style={styles.text}>
            YOUR NAME: {remoteUser?.full_name ? remoteUser.full_name : 'Unknown'}
          </Text>
          <RTCView
            streamURL={remoteStream.toURL()}
            // style={styles.remoteVideo}
            objectFit="cover"
          />
        </View>
      )}

      {/* Local video (small overlay) */}
      {localStream && (
        <View style={styles.container}>
          <Image
            source={{ uri: user.user?.profile_pic }}
            style={{ width: 50, height: 50 }}
          />
          <Text style={styles.text}>
            YOUR NAME: {user.user.full_name}
          </Text>
          <RTCView
            streamURL={localStream.toURL()}
            // style={styles.localVideo}
            objectFit="cover"
          />
        </View>

      )}
      <Text style={{ fontSize: 40, color: 'red' }}>CallScreen</Text>
      <TouchableOpacity style={{ backgroundColor: "red" }}
        onPress={HangUp}
      >
        <Text style={styles.text}>End Call</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between', alignItems: 'center' },
  text: {
    color: "blue",
    fontSize: 30
  }

  // remoteVideo: {flex: 1},
  // localVideo: {
  //   position: 'absolute',
  //   right: 10,
  //   bottom: 10,
  //   width: 120,
  //   height: 160,
  //   zIndex: 10,
  // },
});