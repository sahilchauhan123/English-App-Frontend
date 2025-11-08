import { FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, fonts } from '../../../assets/constants'
import { hpPortrait as hp, wpPortrait as wp } from '../../utils/responsive'
import { customFetch } from '../../utils/api'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'
import { navigateWithParams, goBack } from '../../navigation/navigationService'
import LinearGradient from 'react-native-linear-gradient'

const CallHistory = () => {
    const [callHistory, setCallHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    async function fetchCallHistory(timestamp: string = "") {
        var url;
        if (timestamp.length > 0) {
            url = `/api/user/call/history?timestamp=${timestamp}`;
            const res = await customFetch(url, "GET")
            if (res.data.history && res.data.history.length > 0) {
                console.log("in timestamp ")
                setCallHistory(callHistory.concat(res.data.history));
            } else {
                setHasMore(false);
            }

        } else {
            setLoading(true)
            url = "/api/user/call/history";
            const res = await customFetch(url, "GET")
            console.log("running")
            setCallHistory(res.data.history);
        }
        console.log("Call history state :", callHistory)
        setLoading(false);
    }


    useEffect(() => {
        console.log("CallHistory screen mounted");
        fetchCallHistory();
    }, []);


    const renderUserItem = ({ item }) => (
        <View style={{
            backgroundColor: "#D8DBDD", borderRadius: 15, paddingBottom: hp(0.2), marginHorizontal: wp(4),
        }}>
            <View style={styles.userCard}>

                <TouchableOpacity
                    onPress={() => (
                        item.id = item.peer_id,
                        navigateWithParams("OtherUserProfile", item)
                    )}
                    style={{ flexDirection: 'row', alignItems: 'center', flex: 2 }}>
                    <Image
                        source={{ uri: item.peer_pic || 'https://via.placeholder.com/50' }}
                        style={styles.profilePic}
                    />
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{item.peer_name || 'Unknown User'}</Text>
                        <Text style={styles.userDetails}>
                            {item.ended_at}
                        </Text>
                    </View>
                </TouchableOpacity>

                <View style={{ flex: 2, height: '100%', justifyContent: "center", alignItems: "flex-end" }}>
                    <Text style={styles.talk}>{item.duration_in_min}</Text>
                </View>

            </View>
        </View>
    );


    return (
        <SafeAreaView style={{ backgroundColor: colors.white, flex: 1 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: hp(-2), zIndex: 1, backgroundColor: colors.white, paddingHorizontal: wp(3), marginTop: hp(2) }}>
                <TouchableOpacity
                    style={{ width: hp(3), height: hp(3) }}
                    onPress={goBack}
                >
                    <Image
                        style={{
                            width: hp(3), height: hp(3),
                        }}
                        source={require("../../../assets/images/back.png")}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        textAlign: 'center',
                        fontFamily: fonts.semiBold,
                        fontSize: hp(2.8),
                        // zIndex: 1,
                        backgroundColor: colors.white                  // ensure it stays on top if needed
                    }}>
                    Call History
                </Text>
                <View
                    style={{ width: hp(3), height: hp(3) }}
                />
            </View>

            <View
                style={{
                    backgroundColor: '#fff',
                    elevation: 4,
                    // marginBottom: hp(2),
                    height: hp(3),
                }} />

            <View style={{ flex: 1, paddingVertical: hp(1) }}>


                {loading ?
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        {
                            Array.from({ length: 10 }).map((_, key) =>
                                <ShimmerPlaceholder
                                    key={key}
                                    style={{ width: wp(90), height: hp(8), borderRadius: hp(1), marginBottom: hp(2) }}
                                    LinearGradient={LinearGradient}
                                    shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
                                />
                            )
                        }
                    </View> :
                    callHistory && callHistory.length > 0 ?
                        <FlatList
                            data={callHistory}
                            renderItem={renderUserItem}
                            keyExtractor={(item) => item.call_id}
                            refreshControl={
                                <RefreshControl
                                    refreshing={loading}
                                    onRefresh={fetchCallHistory}
                                    colors={[colors.gradient.first, colors.gradient.second, colors.gradient.last]} // An array of colors for the spinner animation
                                    progressBackgroundColor="#ffffff" // Background color of the circle
                                />
                            }
                            onEndReached={() => {
                                if (hasMore) fetchCallHistory(callHistory[callHistory.length - 1].ended_at)
                            }}

                        /> :
                        <Text style={{ textAlign: 'center', marginTop: hp(3), fontSize: hp(2.5), color: colors.grey, fontFamily: fonts.semiBold }}>No call history found. Go make some calls</Text>
                }

            </View>
        </SafeAreaView>
    )
}

export default CallHistory

const styles = StyleSheet.create({
    userCard: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: "space-between",
        borderRadius: 13,
        padding: hp(1.4),
    },
    profilePic: {
        width: hp(10 / 1.4),
        height: hp(10 / 1.4),
        borderRadius: 13,
    },
    userInfo: {
        marginLeft: wp(3),
        justifyContent: "center",
    },
    userName: {
        fontFamily: fonts.semiBold,
        marginBottom: hp(-0.3),
        fontSize: hp(1.8),
        color: colors.black,
    },
    userDetails: {
        marginTop: hp(-0.3),
        fontFamily: fonts.regular,
        fontSize: hp(1.8),
        color: colors.black,
    },
    callButton: {
        marginRight: wp(0),
        alignItems: "flex-end",
        justifyContent: "center"
    },
    talk: {
        fontFamily: fonts.regular,
        fontSize: hp(1.5),
        marginTop: hp(0.3)
    }
})