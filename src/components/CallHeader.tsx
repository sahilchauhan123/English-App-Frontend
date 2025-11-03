import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, fonts } from '../../assets/constants'
import LinearGradient from 'react-native-linear-gradient'
import { hpPortrait as hp, wpPortrait as wp } from '../utils/responsive'
import { hexToRgba } from '../utils/extras'
import { useCallStore } from '../store/useCallStore'
import { endCall, toggleMute, toggleSpeaker } from '../services/webrtc'
const CallHeader = () => {

    const { ongoingCallData, ongoingCallId, isOnCallScreen, callDuration } = useCallStore();
    const [waiting, setWaiting] = useState(true);
    const [callUserData, setCallUserData] = useState(null);
    const sampleProfilePic = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQraMl1GmQepkXHZlItoFEIUiNPk_krO1dyR7Xo1kBsZYNFb_w1kwhLnt5BO9LXYX5evAI&usqp=CAU"
    const [speaker, setSpeaker] = useState(false)
    const [mute, setMute] = useState(false)


    useEffect(() => {
        if (ongoingCallData) {
            setCallUserData(ongoingCallData);
            setWaiting(false);
        }else{
            setWaiting(true);
            setCallUserData(null);
        }
    }, [ongoingCallData])

    const HangUp = () => {
        console.log("ending call")
        endCall(ongoingCallData.id);
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


    if (waiting || isOnCallScreen) return null

    return (
        <SafeAreaView style={{ backgroundColor: colors.white }}>
            <TouchableOpacity>

                <LinearGradient
                    colors={[
                        hexToRgba(colors.gradient.first, 0.65),
                        hexToRgba(colors.gradient.second, 0.65),
                        hexToRgba(colors.gradient.last, 0.65)
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.7, y: 0 }}
                >
                    <View style={{ justifyContent: "space-between", alignItems: 'center', flexDirection: "row", margin: hp(2) }}>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Image
                                    style={{ height: hp(6), width: hp(6), borderRadius: hp(100) }}
                                    source={{ uri: callUserData?.profile_pic || sampleProfilePic }}
                                />
                                <View style={{ marginLeft: wp(3) }}>
                                    <Text style={styles.text}>
                                        {callUserData?.full_name || "User Name"}
                                    </Text>
                                    <Text style={[styles.text, { fontSize: hp(1.6), fontFamily: fonts.meduim }]}>
                                        {callDuration ? `${Math.floor(callDuration / 60).toString().padStart(2, '0')}:${(callDuration % 60).toString().padStart(2, '0')}` : "Connecting..."}
                                    </Text>
                                </View>
                            </View>

                        </View>

                        <View style={{ flexDirection: "row", justifyContent: 'space-between', width: "45%" }}>
                            <TouchableOpacity onPress={mute ? unMuteCall : muteCall}
                                style={styles.imageContainer}>
                                <Image
                                    source={require('../../assets/images/mic.png')}
                                    style={styles.image}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={speaker ? unSpeakerCall : speakerCall}
                                style={styles.imageContainer}>
                                <Image
                                    source={require('../../assets/images/volumeUp.png')}
                                    style={styles.image}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={HangUp}
                                style={[styles.imageContainer, { backgroundColor: colors.red }]}>
                                <Image
                                    source={require('../../assets/images/callEnd.png')}
                                    style={styles.image}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default CallHeader

const styles = StyleSheet.create({
    text: {
        fontFamily: fonts.semiBold,
        color: colors.white,
        fontSize: hp(2),
        marginBottom: hp(-0.2)
    },
    imageContainer: {
        padding: hp(1),
        backgroundColor: colors.white,
        borderRadius: hp(100),
    },
    image: {
        height: hp(2.5),
        width: hp(2.5),
        borderRadius: hp(100),
        // backgroundColor: colors.white,
        margin: wp(1),
        resizeMode: 'contain',
    }
})