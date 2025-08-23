import { Image, StyleSheet, Text, View, Animated, Pressable } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { menus } from '../utils/constants'
import { colors, fonts } from '../../assets/constants'
import LinearGradient from 'react-native-linear-gradient'

const BottomBar = ({ index, setIndex }) => {
    const widths = useRef(menus.map(() => new Animated.Value(wp(12)))).current // start small

    useEffect(() => {
        widths.forEach((w, i) => {
            Animated.timing(w, {
                toValue: i === index ? wp(18) : wp(12), // expand selected, shrink others
                duration: 180, // fast & smooth
                useNativeDriver: false, // width animation needs false
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
                    key={key} style={styles.menuContainer}>
                        <Animated.View style={{ width: widths[key], borderRadius: 100 }}>
                            <LinearGradient
                                colors={
                                    isActive
                                        ? [colors.lightGradient.first, colors.lightGradient.second, colors.lightGradient.last]
                                        : [colors.white, colors.white]
                                }
                                style={[styles.selectedMenu, { width: "100%" }]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Image
                                    source={isActive ? item.imagefilled : item.image}
                                    style={styles.image}
                                />
                            </LinearGradient>
                        </Animated.View>
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

export default BottomBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: hp(1),
    },
    text: {
        fontFamily: fonts.meduim,
        fontSize: hp(1.5),
        marginTop: 4
    },
    menuContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(25),
    },
    image: {
        height: hp(3.5),
        width: hp(3.5),
        resizeMode: 'contain',
    },
    selectedMenu: {
        alignItems: 'center',
        justifyContent: "center",
        paddingVertical: hp(0.5),
        borderRadius: 100,
    },
})
