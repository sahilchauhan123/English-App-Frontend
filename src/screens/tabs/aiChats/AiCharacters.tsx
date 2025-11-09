import { FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { customFetch } from '../../../utils/api';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { wpPortrait as wp, hpPortrait as hp } from '../../../utils/responsive';
import { colors, fonts } from '../../../../assets/constants';
import { hexToRgba } from '../../../utils/extras';



type Character = {
    id: number,
    name: string,
    backgroundColor: string,
    picUrl: string,
    description: string
}



const AiCharacters = () => {
    const [loading, setLoading] = useState(true);
    const [characters, setCharacters] = useState<Character[]>([]);

    async function fetchAiCharacters() {
        setLoading(true)
        const res = await customFetch("/api/user/aicharacters", "GET")
        // console.log("res from ai : ", res);
        if (res.data.characters && res.data.characters.length > 0) {
            setCharacters(res.data.characters)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAiCharacters();
    }, [])


    if (loading) {
        return (
            <View>
                <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={{ hieght: hp(10), width: wp(100) }}
                >
                </ShimmerPlaceholder>
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={{ marginHorizontal: hp(2), marginVertical: hp(1) }}>
                <Text style={styles.headerTitle}>Recommended</Text>
                <View style={{ height: hp(17), width: "100%", backgroundColor: characters[0].backgroundColor, flexDirection: "row", justifyContent: "space-around", borderRadius: hp(1), alignItems: "center" }}>
                    <View style={{ width: '60%', justifyContent: "center", paddingLeft: wp(8) }}>

                        <Text style={{ fontFamily: fonts.semiBold, fontSize: hp(2.5), color: colors.white }}>
                            {characters[0].name}
                        </Text>
                        <Text style={{ fontFamily: fonts.meduim, fontSize: hp(1.8), width: '100%' }}>
                            {characters[0].description}
                        </Text>

                    </View>
                    <View style={{ width: '40%' }}>
                        <Image
                            source={{ uri: characters[0].picUrl }}
                            style={{ height: hp(20), width: hp(20), marginTop: wp(-6) }}
                        />
                    </View>

                </View>
            </View>

            <View style={{}}>
                <Text style={[styles.headerTitle, { marginHorizontal: hp(2) }]}>Popular AI</Text>


                <View style={{
                    flexDirection: 'row', flexWrap: 'wrap',
                    justifyContent: 'center',
                    width: "100%"
                }}>
                    {characters.slice(1).map((item, index) => (
                        <Pressable
                            key={index}
                            onPress={()=>console.log("pressing")}
                            style={{
                                width: hp(22),
                                height: hp(24),
                                margin: hp(1),
                                backgroundColor: item.backgroundColor,
                                borderRadius: hp(2),
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <ImageBackground
                                style={{
                                    height: hp(20),
                                    width: hp(20),
                                    borderRadius: hp(1),
                                    justifyContent: 'flex-end',
                                    backgroundColor: item.backgroundColor,
                                    paddingTop: hp(23)
                                }}
                                source={{ uri: item.picUrl }}
                            >

                                <LinearGradient
                                    start={{ x: 0.50, y: 0.00 }}
                                    end={{ x: 0.50, y: 1.00 }}
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "flex-start",
                                        height: hp(8),
                                    }}
                                    colors={[
                                        hexToRgba(item.backgroundColor, 0),
                                        hexToRgba(item.backgroundColor, 5),
                                        item.backgroundColor]}
                                >
                                    <Text style={{
                                        fontFamily: fonts.semiBold,
                                        fontSize: hp(2),
                                        color: colors.white,
                                        textAlign: "left",
                                        marginTop: hp(4),
                                        paddingLeft: wp(2)
                                    }}>
                                        {item.name}
                                    </Text>
                                </LinearGradient>

                            </ImageBackground>
                        </Pressable>
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}

export default AiCharacters

const styles = StyleSheet.create({
    headerTitle: {
        fontFamily: fonts.semiBold,
        fontSize: hp(2.3),
        width: "50%"
    },
})