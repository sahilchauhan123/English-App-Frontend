import { ActivityIndicator, Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { use, useEffect, useRef, useState } from 'react'
import { setOngoingCallId, useCallStore } from '../../store/useCallStore'
import { goBack, navigate, navigateAndReset } from '../../navigation/navigationService'
import { colors, fonts } from '../../../assets/constants'
import { hpPortrait as hp, wpPortrait as wp } from '../../utils/responsive'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Behaviour } from '../../utils/constants'
import LinearGradient from 'react-native-linear-gradient'
import { customFetch } from '../../utils/api'

const FeedBack = ({ route }) => {
    console.log("route : ", route)
    // const { ongoingCallId } = useCallStore();
    // console.log("OngoingCallId : ", ongoingCallId)
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");
    const inputRef = useRef<TextInput>(null);
    const [selectedBehaviours, setSelectedBehaviours] = useState([]);
    const [loading, setLoading] = useState(false);

    function handleAddBehaviour(item) {
        if (selectedBehaviours.includes(item.id)) {
            setSelectedBehaviours(selectedBehaviours.filter(id => id !== item.id));
        } else {
            setSelectedBehaviours([...selectedBehaviours, item.id]);
        }
    }


    async function handleSubmit() {
        // make array of behaviour names (strings) from selected behaviour ids
        setLoading(true);
        const behaviourArray = Behaviour
            .filter(b => selectedBehaviours.includes(b.id))
            .map(b => b.type);

        const data = {
            call_id: route.params,
            stars: rating,
            behaviour: behaviourArray,
            comment
        };
        console.log("behaviourArray:", behaviourArray, "data:", data);
        try {
            const res = await customFetch("/api/user/upload/feedback", "POST", data);
            console.log("res : ", res);
            setOngoingCallId(null);
            setLoading(true);
            ToastAndroid.show("Feedback submitted successfully", ToastAndroid.SHORT);
            navigateAndReset("Tabs")
        } catch (err) {
            console.log("feedback error:", err);
        }

    }


    useEffect(() => {
        console.log("rating : ", rating)
    }, [rating])
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white, justifyContent: "space-between" }}>

            <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', marginBottom: hp(-2), zIndex: 1, backgroundColor: colors.white, marginHorizontal: wp(3), marginTop: hp(2) }}>
                <Text
                    style={{
                        textAlign: 'center',
                        fontFamily: fonts.semiBold,
                        fontSize: hp(2.8),
                        backgroundColor: colors.white                  // ensure it stays on top if needed
                    }}>
                    Feedback
                </Text>
            </View>
            <View
                style={{
                    backgroundColor: '#fff',
                    elevation: 4,
                    marginBottom: hp(2),
                    height: hp(3),
                }} />


            <ScrollView>
                <KeyboardAvoidingView style={{ flex: 1, marginBottom: hp(2) }} >

                    {/* Rate Your Experience */}
                    <View style={{ marginHorizontal: hp(2), marginVertical: hp(1) }}>
                        <Text style={styles.headerTitle}>Rate your experience</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: hp(2) }}>
                            {[1, 2, 3, 4, 5].map((item) =>
                                <TouchableOpacity
                                    key={item}
                                    onPress={() => setRating(item)}>
                                    <Image
                                        source={require("../../../assets/images/star.png")}
                                        resizeMode='contain'
                                        style={[rating < item ? styles.tintText : null, { height: hp(5), width: hp(5), }]}
                                    />

                                </TouchableOpacity>
                            )}
                        </View>
                    </View>


                    {/* About other caller */}
                    <View style={{ marginHorizontal: hp(2), marginTop: hp(2) }}>
                        <Text style={styles.headerTitle}>About other caller</Text>
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {Behaviour.map((item) => {
                                const isSelected = selectedBehaviours?.includes(item.id);
                                return (
                                    <View >

                                        <TouchableOpacity
                                            key={item.id}
                                            onPress={() => handleAddBehaviour(item)}
                                        >
                                            {!isSelected ?
                                                <View
                                                    style={{
                                                        borderColor: colors.grey,
                                                        borderWidth: 0.5,
                                                        borderRadius: 10,
                                                        margin: hp(1.1),
                                                        // padding: 1,

                                                    }}
                                                >
                                                    <Text style={{
                                                        fontFamily: fonts.regular,
                                                        color: colors.black,
                                                        marginVertical: hp(0.3),
                                                        marginHorizontal: wp(2.3),
                                                    }}>
                                                        {item.type}
                                                    </Text>
                                                </View>
                                                :
                                                <LinearGradient
                                                    colors={[colors.gradient.first, colors.gradient.second, colors.gradient.last]}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 0.9, y: 0 }}
                                                    style={{
                                                        borderRadius: 11,
                                                        padding: 1,
                                                        margin: hp(1),
                                                    }}
                                                >
                                                    <View style={{
                                                        backgroundColor: colors.white,
                                                        borderRadius: 10,

                                                    }}>
                                                        <Text style={{
                                                            fontFamily: fonts.regular,
                                                            color: colors.black,
                                                            marginVertical: hp(0.3),
                                                            marginHorizontal: wp(2.3),
                                                        }}>
                                                            {item.type}
                                                        </Text>
                                                    </View>
                                                </LinearGradient>
                                            }

                                        </TouchableOpacity>
                                    </View>

                                );
                            })}
                        </View>
                    </View>



                </KeyboardAvoidingView>
            </ScrollView>

            {/* Comments */}
            <View style={{ marginHorizontal: hp(2), marginTop: hp(2) }}>
                <Text style={styles.headerTitle}>Your comment (optional)</Text>
                <Pressable
                    onPress={() => inputRef.current?.focus()}
                    style={{ height: hp(25), borderRadius: 10, borderColor: colors.grey, borderWidth: 0.5 }}
                >
                    <TextInput
                        ref={inputRef}
                        style={styles.input}
                        onChangeText={setComment}
                        value={comment}
                        placeholder="Enter Comment here"
                        placeholderTextColor={colors.grey}
                        multiline={true}
                        textAlignVertical='top'
                        textAlign='left'
                    />
                </Pressable>
            </View>


            <View style={{ marginHorizontal: hp(2), marginVertical: hp(2) }}>
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={{ width: '100%' }}>
                    <LinearGradient
                        colors={[
                            colors.gradient.first,
                            colors.gradient.second,
                            colors.gradient.last,
                        ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0.9, y: 0 }}
                        style={styles.gradientButton}>
                        {loading ?
                            <ActivityIndicator size={23} color={colors.white} /> :
                            <Text style={styles.gradientButtonText}>Submit</Text>
                        }
                    </LinearGradient>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default FeedBack

const styles = StyleSheet.create({
    headerTitle: {
        fontFamily: fonts.semiBold,
        fontSize: hp(2.3),
    },
    input: {
        color: colors.black,
        paddingHorizontal: wp(4),
        fontFamily: fonts.meduim,

    },
    gradientButton: {
        width: '100%',
        paddingVertical: hp(1.6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hp(1.2),
        marginTop: hp(2),
    },
    gradientButtonText: {
        fontFamily: fonts.bold,
        color: colors.white,
    },
    tintText: {
        tintColor: colors.grey
    },


})
