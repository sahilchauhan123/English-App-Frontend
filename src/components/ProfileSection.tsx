import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const ProfileSection = ({ user }) => {

    return (
        <View>
            {/* blurry image */}
            <View>
                <Image
                    source={{ uri: user.user.profile_pic }}
                    style={{ width: hp(50), height: hp(13), alignSelf: 'center' }}
                    resizeMode="cover"
                    blurRadius={1.2}
                />
            </View>
            {/* real image */}
            <View style={{ alignItems: 'center', backgroundColor: 'white', borderTopLeftRadius: hp(3.5), borderTopRightRadius: hp(3.5), marginTop: hp(-4.5), flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp(4) }}>
                <View
                    style={{ width: hp(3.5) }}
                />
                <Image
                    source={{ uri: user.user.profile_pic }}
                    style={{ width: hp(14), height: hp(14), borderRadius: 100, marginTop: hp(-6.5) }}
                    resizeMode="cover"
                />
                <TouchableOpacity>
                    <Image
                        source={require("../../assets/images/heart.png")}
                        style={{ width: hp(3.5), height: hp(3.5) }}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>

            {/* name , country, bio ,etc */}
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text>
                    {user.user.full_name}
                </Text>
                <Text>
                    
                </Text>
            </View>
        </View>
    )
}

export default ProfileSection

const styles = StyleSheet.create({})