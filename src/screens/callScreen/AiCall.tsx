import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hpPortrait as hp, wpPortrait as wp } from '../../utils/responsive'
import { SafeAreaView } from 'react-native-safe-area-context'

const AiCall = () => {
    return (
        <SafeAreaView style={{ flex: 1  }}>

            <View style={{ justifyContent: 'flex-start',marginHorizontal:wp(4) }}>
                <Image
                    style={{ height: hp(3), width: hp(3) }}
                    resizeMode="contain"
                    source={require("../../../assets/images/back.png")}
                />
                <Text>sassas</Text>
            </View>
        </SafeAreaView>
    )
}

export default AiCall

const styles = StyleSheet.create({})