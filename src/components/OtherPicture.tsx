import { Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View, Button, ToastAndroid } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import { colors, fonts } from '../../assets/constants'
import { hpPortrait as hp, hpPortrait, wpPortrait as wp } from '../utils/responsive'
import ImagePicker from "react-native-image-crop-picker";
import { customFetch } from '../utils/api';
import useAuthStore from '../store/useAuthStore';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const OtherPicture = ({ user ,loading}) => {
    const [show, setShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState(user?.pictures || []); // initial from user profile

    useEffect(() => {
        if (user) {
            console.log("user changed", user)
            setImages(user?.pictures)
        }
    }, [user])

    if (loading) {
        return (
            <View style={{ width: '100%', paddingTop: hp(8),flexDirection:"row" ,alignItems:"center" ,flexWrap:"wrap",justifyContent:"center"}}>
                {[0, 1, 2].map((_, index) => (
                    <ShimmerPlaceholder
                        key={index}
                        shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
                        LinearGradient={LinearGradient}
                        style={{ marginVertical: hp(1), marginHorizontal: wp(2), borderRadius: 5, height: hp(30), width: wp(42) }}
                    />
                ))}
            </View>
        )
    }

    return (
        <View style={{ justifyContent: "center", alignItems: "center", paddingTop: hp(1.5), flex: 1 }} >
            <Text style={{ fontFamily: fonts.semiBold, fontSize: hp(1.8), marginBottom: hp(1) }}>Photos</Text>
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: "space-around",
                width: wp(100),
                paddingHorizontal: wp(2),
                alignItems: 'flex-start',
                // backgroundColor:"yellow",

            }}>

                {images && images.length > 0 ? (
                    images.map((item, key) => (
                        <Pressable
                            key={key}
                            onPress={() => {
                                setShow(true);
                                setSelectedImage(item);
                            }}
                            style={{
                                width: wp(46),
                                backgroundColor: colors.lightGrey,
                                marginVertical: hp(1),
                                borderWidth: 1,
                                borderColor: colors.grey,
                                borderRadius: hp(0.5),
                                overflow: 'hidden',
                            }}>
                            <View
                                style={{
                                    height: hp(30),
                                }}>
                                <Image
                                    style={{ height: '100%', width: '100%' }}
                                    resizeMode="contain"
                                    source={{ uri: item }}
                                />
                            </View>
                        </Pressable>
                    ))
                ) : (
                    <Text
                        style={{
                            textAlign: 'center',
                            color: colors.grey,
                            fontFamily: fonts.regular,
                            fontSize: hp(2.2),
                            marginVertical: hp(2),
                        }}>
                        No images available
                    </Text>
                )}

            </View>

            <Modal
                visible={show}
                transparent
                animationType="fade"
                onRequestClose={() => setShow(false)}
                style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", flex: 1 }}
            >
                <Pressable
                    onPress={() => setShow(false)}
                    style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.8)", justifyContent: 'center', alignItems: 'center' }}
                >
                    <Image
                        source={{ uri: selectedImage }}
                        style={{ height: "95%", width: "95%", }}
                        resizeMode="contain"
                    />
                </Pressable>


            </Modal>
        </View>
    )
}

export default OtherPicture

const styles = StyleSheet.create({})