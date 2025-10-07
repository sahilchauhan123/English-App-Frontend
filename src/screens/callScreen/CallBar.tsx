import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../../assets/constants'
import { hpPortrait as hp, wpPortrait as wp } from '../../utils/responsive'
import { endCall } from '../../services/webrtc'
import { navigate } from '../../navigation/navigationService'


const CallBar = ({ remoteUser }) => {

    const [speaker, setSpeaker] = useState(false)
    const [mute, setMute] = useState(false)
    
    const unmutedIcon = require("../../../assets/images/mute.png")
    const mutedIcon = require("../../../assets/images/unmute.png")
    const speakerIcon = require("../../../assets/images/speaker-disabled.png")
    const unspeakerIcon = require("../../../assets/images/speaker-enabled.png")

    const HangUp = () => {
        console.log("ending call")
        endCall(remoteUser.id)
        navigate("Home")
    }
    const muteCall = () => {
        setMute(true)
    }
    const speakerCall = () => {
        setSpeaker(true)
    }
    const unMuteCall = () => {
        setMute(false)
    }
    const unSpeakerCall = () => {
        setSpeaker(false)
    }


    return (
        <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: hp(8) }}>
            <View style={{
                padding: hp(1.5),
                borderColor:colors.grey,borderWidth:0.2,
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