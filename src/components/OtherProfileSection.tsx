import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors, fonts } from '../../assets/constants';
import GradientText from './GradientText';
import { hpPortrait as hp, wpPortrait as wp } from '../utils/responsive';
import { navigate, navigateAndReset } from '../navigation/navigationService';

const OtherProfileSection = ({ user }) => {
    return (
        <View >



            {/* blurry image */}
            <View>
                <Image
                    source={{ uri: user.profile_pic }}
                    style={{ width: hp(100), height: hp(13), alignSelf: 'center' }}
                    resizeMode="cover"
                    blurRadius={1.2}
                />
            </View>
            {/* real image */}
            <View style={{ alignItems: 'center', backgroundColor: 'white', borderTopLeftRadius: hp(3.5), borderTopRightRadius: hp(3.5), marginTop: hp(-4.5), flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp(4) }}>
                <View
                    style={{ width: hp(3) }}
                />
                <Image
                    source={{ uri: user.profile_pic }}
                    style={{ width: hp(14), height: hp(14), borderRadius: 100, marginTop: hp(-6.5) }}
                    resizeMode="cover"
                />
                <TouchableOpacity>
                    <Image
                        source={require("../../assets/images/heart.png")}
                        style={{ width: hp(3), height: hp(3) }}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>

            {/* name , country, bio ,etc */}
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: fonts.semiBold, fontSize: hp(2.5), marginTop: hp(1) }}>
                    {user.full_name}
                </Text>
                <Text style={{ fontFamily: fonts.regular, fontSize: hp(1.8), color: colors.grey, marginTop: hp(-0.8) }}>
                    India
                </Text>
                <Text style={{ paddingHorizontal: wp(10), textAlign: "center", color: colors.mediumGrey, fontFamily: fonts.meduim, fontSize: hp(1.7), marginTop: hp(2) }}>
                    Creative mind with a strategic heart. Bold enough to start. Smart enough to scale.
                </Text>
            </View>

            {/* message & talk stats */}
            <View style={{ paddingHorizontal: wp(2), marginTop: hp(2), alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ width: '33.333%', alignItems: "center" }}>
                    <GradientText text={"22"} size={hp(2.3)} />
                    <Text style={{ fontFamily: fonts.meduim, fontSize: hp(1.8), color: colors.mediumGrey }}>
                        Talks
                    </Text>
                </View>
                <View style={{ width: '33.333%', alignItems: 'center' }}>
                    <GradientText text={"58"} size={hp(2.3)} />

                    <Text style={{ fontFamily: fonts.meduim, fontSize: hp(1.8), color: colors.mediumGrey }}>

                        Minutes
                    </Text>
                </View>
                <View style={{ width: '33.333%', alignItems: 'center' }}>
                    <GradientText text={"128"} size={hp(2.3)} />
                    <Text style={{ fontFamily: fonts.meduim, fontSize: hp(1.8), color: colors.mediumGrey }}>
                        Feedback
                    </Text>
                </View>
            </View>

        </View>
    )
}

export default OtherProfileSection

const styles = StyleSheet.create({})









// import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
// import React from 'react'
// import { colors, fonts } from '../../assets/constants';
// import GradientText from './GradientText';
// import { useResponsive } from '../utils/responsive';

// const ProfileSection = ({ user }) => {
//     console.log("user in profile : ", user)

//     // 👇 use responsive helpers
//     const { hp, wp } = useResponsive();

//     return (
//         <View>
//             {/* blurry image */}
//             <View>
//                 <Image
//                     source={{ uri: user.profile_pic }}
//                     style={{ width: wp(100), height: hp(13), alignSelf: 'center' }}
//                     resizeMode="cover"
//                     blurRadius={1.2}
//                 />
//             </View>

//             {/* real image */}
//             <View
//                 style={{
//                     alignItems: 'center',
//                     backgroundColor: 'white',
//                     borderTopLeftRadius: hp(3.5),
//                     borderTopRightRadius: hp(3.5),
//                     marginTop: hp(-4.5),
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     paddingHorizontal: wp(4),
//                 }}>
//                 <View style={{ width: hp(3) }} />
//                 <Image
//                     source={{ uri: user.profile_pic }}
//                     style={{
//                         width: hp(14),
//                         height: hp(14),
//                         borderRadius: 100,
//                         marginTop: hp(-6.5),
//                     }}
//                     resizeMode="cover"
//                 />
//                 <TouchableOpacity>
//                     <Image
//                         source={require("../../assets/images/heart.png")}
//                         style={{ width: hp(3), height: hp(3) }}
//                         resizeMode='contain'
//                     />
//                 </TouchableOpacity>
//             </View>

//             {/* name , country, bio ,etc */}
//             <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//                 <Text style={{ fontFamily: fonts.semiBold, fontSize: hp(2.5), marginTop: hp(1) }}>
//                     {user.full_name}
//                 </Text>
//                 <Text style={{ fontFamily: fonts.regular, fontSize: hp(1.8), color: colors.grey, marginTop: hp(-0.8) }}>
//                     India
//                 </Text>
//                 <Text
//                     style={{
//                         paddingHorizontal: wp(10),
//                         textAlign: "center",
//                         color: colors.mediumGrey,
//                         fontFamily: fonts.meduim,
//                         fontSize: hp(1.7),
//                         marginTop: hp(2),
//                     }}>
//                     Creative mind with a strategic heart. Bold enough to start. Smart enough to scale.
//                 </Text>
//             </View>

//             {/* message & talk stats */}
//             <View style={{ paddingHorizontal: wp(2), marginTop: hp(2), alignItems: 'center', flexDirection: 'row' }}>
//                 <View style={{ width: '33.333%', alignItems: "center" }}>
//                     <GradientText text={"128"} size={hp(2.3)} />
//                     <Text style={{ fontFamily: fonts.meduim, fontSize: hp(1.8), color: colors.mediumGrey }}>
//                         Talks
//                     </Text>
//                 </View>
//                 <View style={{ width: '33.333%', alignItems: 'center' }}>
//                     <GradientText text={"58"} size={hp(2.3)} />
//                     <Text style={{ fontFamily: fonts.meduim, fontSize: hp(1.8), color: colors.mediumGrey }}>
//                         Minutes
//                     </Text>
//                 </View>
//                 <View style={{ width: '33.333%', alignItems: 'center' }}>
//                     <GradientText text={"128"} size={hp(2.3)} />
//                     <Text style={{ fontFamily: fonts.meduim, fontSize: hp(1.8), color: colors.mediumGrey }}>
//                         Feedback
//                     </Text>
//                 </View>
//             </View>
//         </View>
//     )
// }

// export default ProfileSection

// const styles = StyleSheet.create({})
