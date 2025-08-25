import { Image, StyleSheet, Text, View, Animated, Pressable } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { menus } from '../utils/constants'
import { colors, fonts } from '../../assets/constants'
import LinearGradient from 'react-native-linear-gradient'

const BottomBar = ({ index, setIndex }) => {
    const widths = useRef(menus.map(() => new Animated.Value(wp(12)))).current

    useEffect(() => {
        widths.forEach((w, i) => {
            Animated.timing(w, {
                toValue: i === index ? wp(18) : wp(12),
                duration: 180,
                useNativeDriver: false,
            }).start()
        })
    }, [index])

    return (
        <View style={styles.container}>
            {menus.map((item, key) => {
                const isActive = item.id === index
                return (
                    <Pressable
                        onPress={() => setIndex(item.id)}
                        key={key}
                        style={styles.menuContainer}
                    >
                        {/* Fixed container to prevent layout shifts */}
                        <View style={styles.animatedContainer}>
                            <Animated.View style={{
                                width: widths[key],
                                borderRadius: 100,
                                alignSelf: 'center' // Center the animated view
                            }}>
                                <LinearGradient
                                    colors={
                                        isActive
                                            ? [colors.lightGradient.first, colors.lightGradient.second, colors.lightGradient.last]
                                            : [colors.white, colors.white]
                                    }
                                    style={styles.selectedMenu}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <Image
                                        source={isActive ? item.imagefilled : item.image}
                                        style={styles.image}
                                    />
                                </LinearGradient>
                            </Animated.View>
                        </View>
                        <Text
                            style={[
                                styles.text,
                                isActive && { color: colors.orange, fontFamily: fonts.semiBold }
                            ]}
                        >
                            {item.name}
                        </Text>
                    </Pressable>
                )
            })}
        </View>
    )
}

export default BottomBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: hp(1),
    },
    text: {
        fontFamily: fonts.meduim,
        fontSize: hp(1.5),
        color: colors.black
        // marginTop:hp(0.1)
    },
    menuContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(25),
    },
    image: {
        height: hp(3.3),
        width: hp(3.3),
        resizeMode: 'contain',
    },
    selectedMenu: {
        alignItems: 'center',
        justifyContent: "center",
        paddingVertical: hp(0.5),
        borderRadius: 100,
    },
})



// import { Image, StyleSheet, Text, Pressable } from 'react-native'
// import React from 'react'
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
// import Animated, { 
//     useAnimatedStyle, 
//     withTiming, 
//     useSharedValue,
//     runOnJS
// } from 'react-native-reanimated'
// import { menus } from '../utils/constants'
// import { colors, fonts } from '../../assets/constants'
// import LinearGradient from 'react-native-linear-gradient'

// const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
// const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

// const BottomBar = ({ index, setIndex }) => {
//     const selectedIndex = useSharedValue(index)

//     // Update shared value when index prop changes
//     React.useEffect(() => {
//         selectedIndex.value = index
//     }, [index, selectedIndex])

//     const handlePress = (itemId) => {
//         selectedIndex.value = itemId
//         runOnJS(setIndex)(itemId)
//     }

//     return (
//         <Animated.View style={styles.container}>
//             {menus.map((item, key) => {
//                 const animatedContainerStyle = useAnimatedStyle(() => {
//                     const isSelected = selectedIndex.value === item.id
                    
//                     return {
//                         width: withTiming(isSelected ? wp(18) : wp(12), {
//                             duration: 180,
//                         }),
//                         borderRadius: 100,
//                     }
//                 })

//                 const gradientStyle = useAnimatedStyle(() => {
//                     const isSelected = selectedIndex.value === item.id
                    
//                     return {
//                         opacity: withTiming(isSelected ? 1 : 0, {
//                             duration: 180,
//                         }),
//                     }
//                 })

//                 const backgroundStyle = useAnimatedStyle(() => {
//                     const isSelected = selectedIndex.value === item.id
                    
//                     return {
//                         opacity: withTiming(isSelected ? 0 : 1, {
//                             duration: 180,
//                         }),
//                     }
//                 })

//                 const textStyle = useAnimatedStyle(() => {
//                     const isSelected = selectedIndex.value === item.id
                    
//                     return {
//                         color: withTiming(
//                             isSelected ? colors.orange : colors.black,
//                             { duration: 180 }
//                         ),
//                     }
//                 })

//                 const isActive = item.id === index

//                 return (
//                     <AnimatedPressable 
//                         onPress={() => handlePress(item.id)}
//                         key={key} 
//                         style={styles.menuContainer}
//                     >
//                         <Animated.View style={styles.fixedContainer}>
//                             <Animated.View style={[animatedContainerStyle, styles.animatedContainer]}>
//                                 {/* Active gradient background */}
//                                 <AnimatedLinearGradient
//                                     colors={[
//                                         colors.lightGradient.first, 
//                                         colors.lightGradient.second, 
//                                         colors.lightGradient.last
//                                     ]}
//                                     style={[styles.selectedMenu, gradientStyle]}
//                                     start={{ x: 0, y: 0 }}
//                                     end={{ x: 1, y: 0 }}
//                                 />
                                
//                                 {/* Inactive white background */}
//                                 <Animated.View 
//                                     style={[
//                                         styles.selectedMenu, 
//                                         styles.whiteBackground,
//                                         backgroundStyle
//                                     ]} 
//                                 />

//                                 <Image
//                                     source={isActive ? item.imagefilled : item.image}
//                                     style={styles.image}
//                                 />
//                             </Animated.View>
//                         </Animated.View>
                        
//                         <Animated.Text
//                             style={[
//                                 styles.text,
//                                 textStyle,
//                                 isActive && { fontFamily: fonts.semiBold }
//                             ]}
//                         >
//                             {item.name}
//                         </Animated.Text>
//                     </AnimatedPressable>
//                 )
//             })}
//         </Animated.View>
//     )
// }

// export default BottomBar

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingVertical: hp(1),
//     },
//     text: {
//         fontFamily: fonts.meduim,
//         fontSize: hp(1.5),
//         textAlign: 'center',
//         marginTop: hp(0.3),
//     },
//     menuContainer: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: wp(25),
//     },
//     fixedContainer: {
//         height: hp(4.3), // Fixed height to prevent vertical shifts
//         width: wp(18), // Fixed width = max animated width
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     animatedContainer: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         position: 'relative',
//     },
//     image: {
//         height: hp(3.3),
//         width: hp(3.3),
//         resizeMode: 'contain',
//         zIndex: 2,
//     },
//     selectedMenu: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingVertical: hp(0.5),
//         borderRadius: 100,
//         zIndex: 1,
//     },
//     whiteBackground: {
//         backgroundColor: colors.white,
//     },
// })
