import React, { useEffect, useRef } from 'react';
import { useCallStore } from '../../store/useCallStore';
import { View ,StyleSheet, Text} from 'react-native';
import { RTCView } from 'react-native-webrtc';

export default function CallScreen() {
  const {localStream, remoteStream} = useCallStore();

  return (
    <View style={styles.container}>
      {/* Remote video */}
      {remoteStream && (
        <RTCView
          streamURL={remoteStream.toURL()}
          style={styles.remoteVideo}
          objectFit="cover"
        />
      )}

      {/* Local video (small overlay) */}
      {localStream && (
        <RTCView
          streamURL={localStream.toURL()}
          style={styles.localVideo}
          objectFit="cover"
        />
      )}
      <Text style={{fontSize:40, color:'red'}}>CallScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  remoteVideo: {flex: 1},
  localVideo: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 120,
    height: 160,
    zIndex: 10,
  },
});