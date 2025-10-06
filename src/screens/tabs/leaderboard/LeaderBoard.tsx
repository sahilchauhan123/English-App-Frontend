import { Image, ScrollView, StyleSheet} from 'react-native'
import React from 'react'
import { colors, fonts } from '../../../../assets/constants'
import { hpPortrait as hp, wpPortrait as wp } from '../../../utils/responsive'
import Winners from './Winners'
import RankHolder from './RankHolder'

const LeaderBoard = () => {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../../../../assets/images/gradient.png")}
        resizeMode="stretch"
        style={styles.bgImage}
      />
      <Winners/>
      <RankHolder/>
    </ScrollView>
  )
}

export default LeaderBoard

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
    marginTop:hp(-0.3),
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
  bottomSpace: { flex: 1.05 },
})
