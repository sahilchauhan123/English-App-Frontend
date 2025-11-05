import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { hexToRgba } from '../../../utils/extras'
import { colors, fonts } from '../../../../assets/constants'
import { hpPortrait as hp, wpPortrait as wp } from '../../../utils/responsive'
import ShimmerPlaceholder, { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { navigateWithParams } from '../../../navigation/navigationService'

const Winners = ({ ranking }) => {
  console.log("ranking in winners :", ranking)
  const isFetched = ranking && ranking.length > 0


  function formatName(name) {
    // format name with only first name before space with max 10 characters
    if (!name) return "Unknown User";
    const firstName = name.split(' ')[0];
    return firstName.length > 10 ? firstName.slice(0, 10) + '...' : firstName;
  }

  function navigateToProfile(userData) {
    navigateWithParams("OtherUserProfile", userData)
  }

  if (!isFetched) {
    return (
      <View style={styles.row}>
        {[0, 1, 2].map((_, index) => (
          <ShimmerPlaceholder
            key={index}
            style={[styles.gradientContainer, styles.shadowWrapper, { height: hp(30), marginVertical: hp(2) }]}
            shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
            width={wp(18)}
            LinearGradient={LinearGradient}
          />
        ))}
      </View>
    );
  }

  return (
    <View style={styles.row}>
      {/* 2nd position */}

      <View style={styles.positionWrapper}>
        <TouchableOpacity
          onPress={() => navigateWithParams("OtherUserProfile", ranking[1].user_data)}
          style={styles.centerItems}>
          <Image
            source={require("../../../../assets/images/crown.png")}
            style={styles.crown}
          />
          <Image
            style={styles.profilePic}
            source={{ uri: ranking[1].user_data.profile_pic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQraMl1GmQepkXHZlItoFEIUiNPk_krO1dyR7Xo1kBsZYNFb_w1kwhLnt5BO9LXYX5evAI&usqp=CAU" }}
          />
          <Text style={styles.winnerName}>{formatName(ranking[1].user_data.full_name)}</Text>
          <Text style={styles.countryText}>{ranking[1].user_data.nativeLanguage}</Text>
        </TouchableOpacity>

        <LinearGradient
          colors={[
            hexToRgba(colors.gradient.first, 0.65),
            hexToRgba(colors.gradient.second, 0.65),
            hexToRgba(colors.gradient.last, 0.65)
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.7 }}
          style={[styles.gradientContainer, styles.shadowWrapper, { paddingVertical: hp(4) }]}
        >
          <Text style={styles.rankNumber}>2</Text>
        </LinearGradient>
      </View>

      {/* 1st position */}
      <View style={styles.positionWrapper}>
        <TouchableOpacity
          onPress={() => navigateWithParams("OtherUserProfile", ranking[0].user_data)}
          style={styles.centerItems}>
          <Image
            source={require("../../../../assets/images/crown.png")}
            style={styles.crown}
          />
          <Image
            style={styles.profilePic}
            source={{ uri: ranking[0].user_data.profile_pic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTht0CJiQlX5WNR5Qe7avmqNMj1kesweoIYY_xY1WTxrJC7S1Y4gv2SRLTh2l6kU8c7ytU&usqp=CAU" }}
          />
          <Text style={styles.winnerName}>{formatName(ranking[0].user_data.full_name)}</Text>
          <Text style={styles.countryText}>{ranking[0].user_data.nativeLanguage}</Text>
        </TouchableOpacity>

        <LinearGradient
          colors={[
            hexToRgba(colors.gradient.first, 0.65),
            hexToRgba(colors.gradient.second, 0.65),
            hexToRgba(colors.gradient.last, 0.65)
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.7 }}
          style={[styles.gradientContainer, styles.shadowWrapper, { paddingVertical: hp(9) }]}
        >
          <Text style={styles.rankNumber}>1</Text>
        </LinearGradient>
      </View>

      {/* 3rd position */}
      <View style={styles.positionWrapper}>
        <TouchableOpacity
          onPress={() => navigateWithParams("OtherUserProfile", ranking[2].user_data)}
          style={styles.centerItems}>
          <Image
            source={require("../../../../assets/images/crown.png")}
            style={styles.crown}
          />
          <Image
            style={styles.profilePic}
            source={{ uri: ranking[2].user_data.profile_pic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQumrcwZizGBisyEEmlbllYty5O_LuswiDbj0LnbD8XSJXbALXe0IYV1yDi86ZZYzXYgHA&usqp=CAU" }}
          />
          <Text style={styles.winnerName}>{formatName(ranking[2].user_data.full_name)}</Text>
          <Text style={styles.countryText}>{ranking[2].user_data.nativeLanguage}</Text>
        </TouchableOpacity>

        <LinearGradient
          colors={[
            hexToRgba(colors.gradient.first, 0.65),
            hexToRgba(colors.gradient.second, 0.65),
            hexToRgba(colors.gradient.last, 0.65)
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.7 }}
          style={[styles.gradientContainer, styles.shadowWrapper, { paddingVertical: hp(2) }]}
        >
          <Text style={styles.rankNumber}>3</Text>
        </LinearGradient>
      </View>
    </View>
  )
}

export default Winners

const styles = StyleSheet.create({
  container: { flex: 1 },
  bgImage: {
    flex: 1,
    width: "100%",
    position: "absolute",
    opacity: 0.6,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginHorizontal: wp(20),
    marginTop: hp(2)
  },
  positionWrapper: {
    justifyContent: "flex-end"
  },
  centerItems: {
    alignItems: "center"
  },
  crown: {
    height: hp(2.6),
    width: hp(2.6),
    marginBottom: hp(0.4)
  },
  profilePic: {
    height: hp(6.5),
    width: hp(6.5),
    borderRadius: hp(0.8),
  },
  winnerName: {
    fontFamily: fonts.meduim,
    fontSize: hp(1.8),
  },
  countryText: {
    fontFamily: fonts.regular,
    marginTop: hp(-0.3),
    fontSize: hp(1.6),
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
  rankNumber: {
    fontFamily: fonts.bold,
    color: colors.white,
    fontSize: hp(3),
    textShadowColor: 'rgba(59, 59, 59, 0.75)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 2,
  },
  pointsText: {
    fontFamily: fonts.regular,
    fontSize: hp(1.2),
    color: colors.orange,
    marginTop: hp(0.2),
  },
  bottomSpace: { flex: 1.05 },
})
