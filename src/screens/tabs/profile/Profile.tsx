import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useState } from 'react'
import useAuthStore from '../../../store/useAuthStore'
import ProfileSection from '../../../components/ProfileSection';
import Pictures from '../../../components/Pictures';
import { colors, fonts } from '../../../../assets/constants';
import { hpPortrait as hp } from '../../../utils/responsive';
import LinearGradient from 'react-native-linear-gradient';
import FeedBackHistory from '../../../components/FeedBackHistory';

const Profile = () => {

  const { user } = useAuthStore();
  const [onLeftSide, setOnLeftSide] = useState(true);


  return (
    <View style={{ flex: 1 }}>

      <ScrollView>
        {/* profile picture  */}
        <ProfileSection user={user} />

        {/* tab View */}
        <View style={{ flexDirection: "row", marginTop: hp(2), marginBottom: hp(1) }}>
          <Pressable
            onPress={() => setOnLeftSide(true)}
            style={{ width: '50%', justifyContent: "center", alignItems: 'center' }}>
            <Text style={[styles.tabText, { color: onLeftSide ? colors.black : colors.grey }]}>Photos</Text>
            {onLeftSide &&
              <LinearGradient
                colors={[colors.gradient.first, colors.gradient.second, colors.gradient.last]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.indicator}
              />
            }

          </Pressable>
          <Pressable
            onPress={() => setOnLeftSide(false)}
            style={{ width: '50%', justifyContent: "center", alignItems: 'center' }}>
            <Text style={[styles.tabText, { color: !onLeftSide ? colors.black : colors.grey }]}>Feedback</Text>
            {!onLeftSide &&
              <LinearGradient
                colors={[colors.gradient.first, colors.gradient.second, colors.gradient.last]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.indicator}
              />
            }
          </Pressable>
        </View>
        {
          onLeftSide ? <Pictures /> : <FeedBackHistory/>
        }
      </ScrollView>

    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  tabText: {
    fontFamily: fonts.semiBold,
    fontSize: hp(2),
    marginBottom: hp(1)
  },
  indicator: {
    position: 'absolute',
    bottom: -1,
    height: 3,
    width: '60%',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
})