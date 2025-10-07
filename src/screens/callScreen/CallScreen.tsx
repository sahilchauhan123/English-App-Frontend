// import React, { useEffect, useRef, useState } from 'react';
// import { useCallStore } from '../../store/useCallStore';
// import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
// import { RTCView } from 'react-native-webrtc';
// import useAuthStore from '../../store/useAuthStore';
// import { endCall } from '../../services/webrtc';
// import { navigate } from '../../navigation/navigationService';

// export default function CallScreen({ route }) {
//   const data = route.params;
//   // console.log("data : ",data)

//   const [remoteUser, setremoteUser] = useState(data)
//   const { localStream, remoteStream } = useCallStore();
//   const { user } = useAuthStore();
//   console.log("remote user data : ", data)
//   console.log("our data", user)

//   const HangUp = () => {
//     console.log("ending call")
//     endCall(remoteUser.id)
//     navigate("Home")
//   }

//   return (
//     <View style={styles.container}>
//       {/* Remote video */}
//       {remoteStream && (
//         <View style={styles.container}>
//           {remoteUser?.full_name && <Image
//             source={{ uri: remoteUser.profile_pic }}
//             style={{ width: 50, height: 50 }}
//           />}

//           <Text style={styles.text}>
//             YOUR NAME: {remoteUser?.full_name ? remoteUser.full_name : 'Unknown'}
//           </Text>
//           <RTCView
//             streamURL={remoteStream.toURL()}
//             // style={styles.remoteVideo}
//             objectFit="cover"
//           />
//         </View>
//       )}

//       {/* Local video (small overlay) */}
//       {localStream && (
//         <View style={styles.container}>
//           <Image
//             source={{ uri: user?.profile_pic }}
//             style={{ width: 50, height: 50 }}
//           />
//           <Text style={styles.text}>
//             YOUR NAME: {user.full_name}
//           </Text>
//           <RTCView
//             streamURL={localStream.toURL()}
//             // style={styles.localVideo}
//             objectFit="cover"
//           />
//         </View>

//       )}
//       <Text style={{ fontSize: 40, color: 'red' }}>CallScreen</Text>
//       <TouchableOpacity style={{ backgroundColor: "red" }}
//         onPress={HangUp}
//       >
//         <Text style={styles.text}>End Call</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'space-between', alignItems: 'center' },
//   text: {
//     color: "blue",
//     fontSize: 30
//   }

//   // remoteVideo: {flex: 1},
//   // localVideo: {
//   //   position: 'absolute',
//   //   right: 10,
//   //   bottom: 10,
//   //   width: 120,
//   //   height: 160,
//   //   zIndex: 10,
//   // },
// });



import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import { hexToRgba } from '../../utils/extras'
import { colors, fonts } from '../../../assets/constants'
import { hpPortrait as hp, wpPortrait as wp } from '../../utils/responsive'
import { startCallTimer, useCallStore } from '../../store/useCallStore'
import { RTCView } from 'react-native-webrtc'
import { endCall } from '../../services/webrtc'
import { navigate } from '../../navigation/navigationService'
import CallBar from './CallBar'
import { useOrientationStore } from '../../store/useOrientationStore'
// import { heightPercentageToDP as hp , widthPercentageToDP as wp} from 'react-native-responsive-screen'

const CallScreen = ({ route }) => {

  const data = route.params;
  const intense = 0.2;
  // console.log("data : ",data)
  const [remoteUser, setremoteUser] = useState(data)
  const { localStream, remoteStream, callDuration } = useCallStore();
  const [speaker, setSpeaker] = useState(false)
  const [mute, setMute] = useState(false)

  useEffect(() => {
    
    startCallTimer();
  }, [])


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

            <TouchableOpacity style={{
              backgroundColor: colors.lightGrey, padding: hp(1.5), borderRadius: hp(100), flexDirection: "row", alignItems: "center", borderColor: colors.grey, borderWidth: 0.2,
            }}>
              <Image
                style={{ height: hp(3.5), width: hp(3.5) }}
                source={require("../../../assets/images/minimize.png")}
              />
            </TouchableOpacity>

            <View>
              <Text style={styles.username}>Username</Text>
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
              source={{ uri: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" }}
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