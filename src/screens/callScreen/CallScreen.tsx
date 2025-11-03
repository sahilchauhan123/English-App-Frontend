import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import { hexToRgba } from '../../utils/extras'
import { colors, fonts } from '../../../assets/constants'
import { hpPortrait as hp, wpPortrait as wp } from '../../utils/responsive'
import { startCallTimer, useCallStore } from '../../store/useCallStore'
import { RTCView } from 'react-native-webrtc'
import CallBar from './CallBar'
import { goBack, navigateAndReset } from '../../navigation/navigationService'

const CallScreen = ({ route }) => {

  const data = route.params;
  const intense = 0.2;
  // console.log("data : ",data)
  const [remoteUser, setremoteUser] = useState(data)
  const { localStream, remoteStream, setIsOnCallScreen } = useCallStore();
  const callDuration = useCallStore(s => s.callDuration);
  const [speaker, setSpeaker] = useState(false)
  const [mute, setMute] = useState(false)

  useEffect(() => {
    if (callDuration === 0) {
      startCallTimer();
    }
    setIsOnCallScreen(true);
    return () => setIsOnCallScreen(false); // ← AUTO HIDE WHEN LEAVE
  }, [])



  // THIS LINE FIXES EVERYTHING
  useEffect(() => {
    const ticker = setInterval(() => {
      useCallStore.setState({}); // dummy update → forces re-render
    }, 100);
    return () => clearInterval(ticker);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>

      <LinearGradient
        style={{ flex: 1 }}
        colors={[hexToRgba(colors.gradient.first, intense), hexToRgba(colors.gradient.second, intense), hexToRgba(colors.gradient.last, intense)]}
      >
        {remoteStream && (
          <RTCView
            streamURL={remoteStream.toURL()}
            objectFit="cover"
          />
        )}

        {localStream && (
          <RTCView
            streamURL={localStream.toURL()}
            objectFit="cover"
          />
        )}
        <View style={{ flex: 2, justifyContent: "space-between", alignItems: "center", paddingBottom: hp(5) }}>
          <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginTop: hp(2), width: wp(90) }}>

            <TouchableOpacity
              onPress={()=>navigateAndReset("Tabs")}
              style={{
                backgroundColor: colors.lightGrey, padding: hp(1.5), borderRadius: hp(100), flexDirection: "row", alignItems: "center", borderColor: colors.grey, borderWidth: 0.2,
              }}>
              <Image
                style={{ height: hp(3.5), width: hp(3.5) }}
                source={require("../../../assets/images/minimize.png")}
              />
            </TouchableOpacity>

            <View>
              <Text style={styles.username}>{remoteUser.full_name}</Text>
              <Text style={{ fontSize: hp(1.8), fontWeight: "500", textAlign: 'center', fontVariant: ['tabular-nums'], }}>
                {formatTime(callDuration)}
              </Text>
            </View>

            <View style={{ backgroundColor: colors.lightGrey, padding: hp(1.5), borderRadius: hp(100), flexDirection: "row", alignItems: "center", opacity: 0 }}>
              <Image
                style={{ height: hp(3.5), width: hp(3.5) }}
                source={require("../../../assets/images/minimize.png")}
              />
            </View>

          </View>

          {/* profile_pic */}

          <View style={{ marginBottom: hp(2) }}>
            <Image
              style={{ height: hp(25), width: hp(25), borderRadius: hp(100) }}
              source={{ uri: remoteUser.profile_pic }}
            />

          </View>

        </View>

        {/* Options Bar */}
        <CallBar remoteUser={remoteUser} />

      </LinearGradient>
    </SafeAreaView>
  )
}

export default CallScreen

const styles = StyleSheet.create({
  username: {
    fontFamily: fonts.semiBold,
    fontSize: hp(2.7),
    marginBottom: hp(-0.8)
  }
})