import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors, mutedIcon, speakerIcon, unmutedIcon, unspeakerIcon } from '../../../assets/constants'
import { hpPortrait as hp, wpPortrait as wp } from '../../utils/responsive'
import { endCall, toggleMute, toggleSpeaker } from '../../services/webrtc'
import { navigate, navigateAndReset } from '../../navigation/navigationService'
import { setOngoingCallData, stopCallTimer } from '../../store/useCallStore'


const CallBar = ({ remoteUser }) => {

    const [speaker, setSpeaker] = useState(false)
    const [mute, setMute] = useState(false)



    const HangUp = () => {
        console.log("ending call")
        endCall(remoteUser.id);
        navigateAndReset("Tabs")
    }
    const muteCall = () => {
        toggleMute(true);
        setMute(true)
    }
    const unMuteCall = () => {
        toggleMute(false)
        setMute(false)
    }
    const speakerCall = () => {
        toggleSpeaker(true)
        setSpeaker(true)
    }

    const unSpeakerCall = () => {
        toggleSpeaker(false)
        setSpeaker(false)
    }


    return (
        <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: hp(8) }}>
            <View style={{
                padding: hp(1.5),
                borderColor: colors.grey, borderWidth: 0.2,
                marginHorizontal: wp(8), justifyContent: "space-between", alignItems: "center", backgroundColor: colors.greyLighter, borderRadius: hp(100), flexDirection: "row"
            }}>
                <TouchableOpacity onPress={mute ? unMuteCall : muteCall}>
                    <Image
                        source={mute ? mutedIcon : unmutedIcon}
                        style={{ height: hp(6.5), width: hp(6.5) }}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={speaker ? unSpeakerCall : speakerCall}>
                    <Image
                        source={speaker ? unspeakerIcon : speakerIcon}
                        style={{ height: hp(6.5), width: hp(6.5) }}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={HangUp}>
                    <Image
                        source={require("../../../assets/images/call-end.png")}
                        style={{ height: hp(6.5), width: hp(6.5) }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CallBar

const styles = StyleSheet.create({})