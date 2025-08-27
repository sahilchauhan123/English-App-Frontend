import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors, fonts } from '../../assets/constants';
import { sendMessage } from '../services/socket';
import { useCallStore } from '../store/useCallStore';


const Header = ({ index }) => {
    const { setInRandomMatch } = useCallStore();

    const handleRandomMatch = () => {
        console.log('Starting random match call');
        const data = {
            type: "randomCall",
            from: user.user.id
        }
        sendMessage(data);
        setInRandomMatch(true);
        ToastAndroid.show("Random Call Waiting", 2000)
    }
    return (
        <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft:wp(1.5) }}>
                <Image
                    style={{ height: wp(10), width: wp(10) }}
                    source={require("../../assets/images/logo.png")}
                />
                <Text style={styles.headerTitle}>Strango</Text>
            </View>
            <View>
                <TouchableOpacity >
                    <Image
                        style={{ height: wp(10), width: wp(10) }}
                        source={require("../../assets/images/filter.png")}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.white,
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(4),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    headerTitle: {
        fontSize: hp(2.5),
        color: colors.black,
        paddingLeft: wp(2),
        fontFamily: fonts.semiBold,
        marginTop: hp(0.4)
    },
})