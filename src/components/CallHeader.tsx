import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, fonts } from '../../assets/constants'
import LinearGradient from 'react-native-linear-gradient'
import { hpPortrait as hp, wpPortrait as wp } from '../utils/responsive'
import { hexToRgba } from '../utils/extras'

const CallHeader = () => {
    const [waiting,setWaiting] = useState(true);
    
    if(waiting) return

    return (
        <SafeAreaView style={{ backgroundColor: colors.white }}>
            <LinearGradient
                colors={[
                    hexToRgba(colors.gradient.first, 0.8), 
                    hexToRgba(colors.gradient.second, 0.8),
                    hexToRgba(colors.gradient.last,0.8)
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.7, y: 0 }}
            >
                <View style={{ justifyContent: "space-between", alignItems: 'center', flexDirection: "row", margin: hp(2) }}>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                style={{ height: hp(6), width: hp(6), borderRadius: hp(100) }}
                                source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVcJBefqsqE-EgUOG0wYrNLOjflaZXsH9U_A&s" }}
                            />
                            <View style={{ marginLeft: wp(3) }}>
                                <Text style={styles.text}>
                                    Sahil chauhan
                                </Text>
                                <Text style={[styles.text, { fontSize: hp(1.6), fontFamily: fonts.meduim }]}>
                                    01:34
                                </Text>
                            </View>
                        </View>

                    </View>

                    <View style={{flexDirection:"row",justifyContent:'space-between',width:"45%"}}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={require('../../assets/images/mic.png')}
                                style={styles.image}
                            />
                        </View>

                        <View style={styles.imageContainer}>
                            <Image
                                source={require('../../assets/images/volumeUp.png')}
                                style={styles.image}
                            />
                        </View>
                        <View style={[styles.imageContainer,{backgroundColor:colors.red}]}>
                            <Image
                                source={require('../../assets/images/callEnd.png')}
                                style={styles.image}
                            />
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default CallHeader

const styles = StyleSheet.create({
    text:{
        fontFamily:fonts.semiBold,
        color:colors.white,
        fontSize:hp(2),
        marginBottom:hp(-0.2)
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