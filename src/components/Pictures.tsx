import { Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors, fonts } from '../../assets/constants'
import { hpPortrait as hp, hpPortrait, wpPortrait as wp } from '../utils/responsive'
import ImagePicker from "react-native-image-crop-picker";
import { customFetch } from '../utils/api';
import useAuthStore from '../store/useAuthStore';

const Pictures = () => {
    const [show, setShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const { user ,setUser} = useAuthStore();
    const [images, setImages] = useState(user?.pictures || []); // initial from user profile


    const pickAndUploadImage = async () => {
        try {
            const image = await ImagePicker.openPicker({
                width: 600,
                height: 900,
                cropping: true,           // enables crop UI
                compressImageQuality: 0.8,
                includeBase64: false,
            });

            if (image && image.path) {
                console.log("Selected image:", image.path);

                // prepare form data
                const formData = new FormData();
                formData.append("image", {
                    uri: image.path,          // e.g. "file:///storage/emulated/0/.../photo.jpg"
                    type: image.mime,         // e.g. "image/jpeg"
                    name: "upload.jpg",       // must have a file name
                });
                const response = await customFetch("/api/user/upload/image", "POST", formData);
                console.log("Upload response:", response);
                setImages([...images, response.data.url]); // append new image to state
                const userData = await customFetch("/api/user/profile","GET") // for refreshing App Data
                setUser(userData.data.profile)
            }
        } catch (error) {
            console.log("Image selection cancelled", error);
        }
    };


    return (
        <View style={{ justifyContent: "center", alignItems: "center", paddingTop: hp(1.5), flex: 1 }} >
            <Text style={{ fontFamily: fonts.semiBold, fontSize: hp(1.8) ,marginBottom:hp(1)}}>Photos</Text>
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: "space-around",
                width: wp(100),
                paddingHorizontal: wp(2),
                alignItems: 'flex-start',
                // backgroundColor:"yellow",

            }}>

                {images.map((item, key) =>

                    <Pressable
                        key={key}
                        onPress={() => { setShow(true), setSelectedImage(item) }}
                        style={{
                            width: images.length < 3 ? wp(46) : wp(30),
                            backgroundColor: colors.lightGrey,
                            marginVertical: hp(1),
                            borderWidth: 1,
                            borderColor: colors.grey,
                            borderRadius: hp(0.5),
                            overflow: "hidden"
                        }}>
                        <View
                            style={{
                                height: images.length < 3 ? hp(30) : hp(20),
                            }}>
                            <Image
                                style={{ height: "100%", width: "100%" }}
                                resizeMode='contain'
                                source={{ uri: item }}
                            />
                        </View>

                    </Pressable>

                )}

                {images.length < 4 &&

                    <TouchableOpacity

                        onPress={pickAndUploadImage}
                        style={{
                            width: images.length < 3 ? wp(46) : wp(30),
                        }}>
                        <View
                            style={{
                                borderStyle: 'dotted',
                                backgroundColor: "#FD0C0C0D",
                                borderColor: colors.black,
                                justifyContent: "space-evenly",
                                alignItems: 'center',
                                borderWidth: 1,
                                paddingVertical: hp(5),
                                height: images.length < 3 ? hp(30) : hp(20),
                                borderRadius: hp(0.5),
                                marginBottom: hp(0.6)
                            }}>
                            <Image
                                style={{ height: hp(2), width: hp(2) }}
                                source={require("../../assets/images/+.png")}
                            />
                            <Text style={{ fontFamily: fonts.meduim, fontSize: hp(1.7) }}>
                                Add Image
                            </Text>
                        </View>

                    </TouchableOpacity>
                }

            </View>

            <Modal
                visible={show}
                transparent
                animationType="fade"
                onRequestClose={() => setShow(false)}

            >
                <Pressable
                    onPress={() => setShow(false)}
                    style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.8)", justifyContent: 'center', alignItems: 'center' }}
                >
                    <Image
                        source={{ uri: selectedImage, }}
                        style={{ height: "95%", width: "95%", }}
                        resizeMode="contain"
                    />
                </Pressable>
            </Modal>
        </View>
    )
}

export default Pictures

const styles = StyleSheet.create({})