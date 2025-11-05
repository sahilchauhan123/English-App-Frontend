import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts } from '../../../../assets/constants'
import { hpPortrait as hp, wpPortrait as wp } from '../../../utils/responsive'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient'
import { navigateWithParams } from '../../../navigation/navigationService'

const RankHolder = ({ ranking }) => {
    console.log("ranking in rank holder :", ranking)
    const isFetched = ranking && ranking.length > 3
    const [rankedUsers, setRankedUsers] = useState([])
    // we need rank holder after 3 users because top 3 are in winners component
    // do slicing here of array 
    useEffect(() => {
        if (ranking && ranking.length > 3) {
            console.log("sliced array :", ranking.slice(3))
            setRankedUsers(ranking.slice(3))
        }
    }, [ranking])

    if (!isFetched) {
        return (
            <View style={{ width: '100%', paddingTop: hp(8) }}>
                {[0, 1, 2].map((_, index) => (
                    <ShimmerPlaceholder
                        key={index}
                        shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
                        LinearGradient={LinearGradient}
                        style={{ marginVertical: hp(1), marginHorizontal: wp(4), borderRadius: 5, height: hp(8), width: wp(92) }}
                    />
                ))}
            </View>
        )
    }

    const renderUserItem = ({ item }) => (
        console.log("item in rank holder :", item),
        <View
            key={item.rank}
            style={{
                backgroundColor: "#D8DBDD", borderRadius: 15, paddingBottom: hp(0.2), marginHorizontal: wp(4),
            }}>
            <TouchableOpacity
                onPress={() => navigateWithParams("OtherUserProfile", item.user_data)}
                style={styles.userCard}>
                <Text style={{ fontFamily: fonts.bold, fontSize: hp(2.4), marginRight: wp(4) }}>{item.rank}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>

                    <Image
                        source={{ uri: item.user_data.profile_pic || 'https://via.placeholder.com/50' }}
                        style={styles.profilePic}
                    />
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{item.user_data.full_name || item.username || 'Unknown User'}</Text>
                        <Text style={styles.userDetails}>{item.user_data.nativeLanguage || 'Unknown Language'}
                            {/* | {item.currentEnglishLevel} */}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1, height: '100%', justifyContent: "center", alignItems: "flex-end" }}>

                    <Text style={styles.talk}>{item.total_duration + " min" || "csd"}</Text>
                </View>
            </TouchableOpacity>

        </View>

    );

    return (
        <View style={styles.bottomSpace} >
            <View style={{
                justifyContent: "space-evenly",
                alignItems: 'center',
                backgroundColor: colors.gradient.first,
                flexDirection: 'row',
                marginHorizontal: wp(7),
                borderRadius: hp(1.5),
                marginTop: hp(2),
                padding: hp(0.3),
                marginBottom: hp(1)
            }}>

                <Image
                    style={{ height: hp(2.5), width: hp(2.5), resizeMode: "contain" }}
                    source={require("../../../../assets/images/winnerCup.png")}
                />
                <Text style={{ fontFamily: fonts.semiBold, fontSize: hp(1.7), color: colors.white, marginTop: hp(0.2) }} >
                    Every talk takes you closer to the top!
                </Text>
            </View>

            <FlatList
                data={rankedUsers}
                scrollEnabled={false}
                renderItem={renderUserItem}
                keyExtractor={(item) => item.rank.toString()}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No online users available</Text>
                }
            />
        </View>
    )
}

export default RankHolder



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        // marginHorizontal: wp(2.5)
    },
    header: {
        backgroundColor: colors.orange,
        padding: 15,
        paddingTop: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    headerTitle: {
        fontFamily: fonts.semiBold,
        fontSize: hp(2.3),
        marginVertical: hp(1),
        paddingHorizontal: wp(4),

    },
    randomMatchButton: {
        backgroundColor: colors.lightGrey,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    randomMatchText: {
        color: colors.black,
        fontSize: 16,
        fontWeight: '600',
    },
    userList: {
        marginHorizontal: wp(2.5)
    },
    userCard: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: "space-between",
        borderRadius: 13,
        padding: hp(1.4),

        // marginHorizontal: wp(2.5),
    },

    //   userCard: {
    //   flexDirection: 'row',
    //   backgroundColor: '#fff',
    //   padding: 15,
    //   marginBottom: 10,
    //   borderRadius: 10,
    //   alignItems: 'center',
    //   shadowColor: '#000',
    //   shadowOffset: { width: 0, height: 2 },
    //   shadowOpacity: 0.1,
    //   shadowRadius: 4,
    //   elevation: 3,
    // },
    profilePic: {
        width: hp(6),
        height: hp(6),
        borderRadius: 13,
    },
    userInfo: {
        marginLeft: wp(3),
        justifyContent: "center",
        // backgroundColor:"red"
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
        // backgroundColor:'red',
        justifyContent: "center"
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
    gradient: {
        padding: 16,
        borderRadius: 8,
    },
    talk: {
        fontFamily: fonts.regular,
        fontSize: hp(1.8),
    },
    bottomSpace: {
        flex: 1.05,
    },
    gradientContainer: {
        paddingHorizontal: wp(0),
        width: wp(18),
        alignItems: 'center',
        borderRadius: hp(1.2),
    },
    shadowWrapper: {
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flex: 1,
        // flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "flex-end",
        // marginHorizontal: wp(20),
        // marginTop: hp(2)
    },
});