import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import OtherProfileSection from '../../../components/OtherProfileSection'
import OtherPicture from '../../../components/OtherPicture'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, fonts } from '../../../../assets/constants'
import { hpPortrait as hp, wpPortrait as wp } from '../../../utils/responsive'
import { navigateAndReset } from '../../../navigation/navigationService'

const OtherUserProfile = ({ route }) => {
    const [user, setUser] = useState(route.params)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: wp(4), marginVertical: hp(2) }}>
                <TouchableOpacity
                    style={{ width: hp(3), height: hp(3) }}
                    onPress={() => navigateAndReset("Tabs")}
                >
                    <Image
                        style={{
                            width: hp(3), height: hp(3),
                        }}
                        source={require("../../../../assets/images/back.png")}
                        resizeMode='contain'
                    />
                </TouchableOpacity>

                <Text
                    style={{
                        textAlign: 'center',
                        fontFamily: fonts.semiBold,
                        fontSize: hp(2.8),
                        zIndex: 1,
                    }}>
                    Profile
                </Text>
                <View
                    style={{ width: hp(3), height: hp(3) }}
                />
            </View>

            <ScrollView>

                {/* profile picture  */}
                <OtherProfileSection user={user} />
                {/* description & talk section */}
                <OtherPicture user={user} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default OtherUserProfile

const styles = StyleSheet.create({})