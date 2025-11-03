import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../../../assets/constants'
import { hpPortrait as hp, wpPortrait as wp } from '../../../utils/responsive'

const RankHolder = ({ranking}) => {
    console.log("ranking in rank holder :", ranking)
    const sampledata = [
        {
            id: 1,
            profile_pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQraMl1GmQepkXHZlItoFEIUiNPk_krO1dyR7Xo1kBsZYNFb_w1kwhLnt5BO9LXYX5evAI&usqp=CAU",
            full_name: "Michael Johnson",
            nativeLanguage: "English",
            totalTime: "12h 30m",
        },
        {
            id: 2,
            profile_pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQraMl1GmQepkXHZlItoFEIUiNPk_krO1dyR7Xo1kBsZYNFb_w1kwhLnt5BO9LXYX5evAI&usqp=CAU",
            full_name: "Kira Mensah",
            nativeLanguage: "Swahili",
            totalTime: "15h 10m",
        },
        {
            id: 3,
            profile_pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQumrcwZizGBisyEEmlbllYty5O_LuswiDbj0LnbD8XSJXbALXe0IYV1yDi86ZZYzXYgHA&usqp=CAU",
            full_name: "Raman Singh",
            nativeLanguage: "Hindi",
            totalTime: "10h 45m",
        },
        {
            id: 4,
            profile_pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQraMl1GmQepkXHZlItoFEIUiNPk_krO1dyR7Xo1kBsZYNFb_w1kwhLnt5BO9LXYX5evAI&usqp=CAU",
            full_name: "Sophia Lee",
            nativeLanguage: "Korean",
            totalTime: "9h 20m",
        },
        {
            id: 5,
            profile_pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQraMl1GmQepkXHZlItoFEIUiNPk_krO1dyR7Xo1kBsZYNFb_w1kwhLnt5BO9LXYX5evAI&usqp=CAU",
            full_name: "Carlos Martínez",
            nativeLanguage: "Spanish",
            totalTime: "13h 05m",
        },
    ]


    const renderUserItem = ({ item }) => (
        <View style={{
            backgroundColor: "#D8DBDD", borderRadius: 15, paddingBottom: hp(0.2), marginHorizontal: wp(4),
        }}>
            <View style={styles.userCard}>
                <Text style={{ fontFamily: fonts.bold, fontSize: hp(2.4), marginRight: wp(4) }}>{item.id}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>

                    <Image
                        source={{ uri: item.profile_pic || 'https://via.placeholder.com/50' }}
                        style={styles.profilePic}
                    />
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{item.full_name || item.username || 'Unknown User'}</Text>
                        <Text style={styles.userDetails}>{item.nativeLanguage}
                            {/* | {item.currentEnglishLevel} */}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1, height: '100%', justifyContent: "center", alignItems: "flex-end" }}>

                    <Text style={styles.talk}>{item.totalTime}</Text>
                </View>
            </View>

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
                data={sampledata}
                scrollEnabled={false}
                renderItem={renderUserItem}
                keyExtractor={(item) => item.id.toString()}
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
        fontSize: hp(1.5)
    },
    bottomSpace: {
        flex: 1.05,
    },
});