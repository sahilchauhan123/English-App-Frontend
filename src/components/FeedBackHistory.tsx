import { FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient'
import { hpPortrait as hp, wpPortrait as wp } from '../utils/responsive'
import { customFetch } from '../utils/api'
import { navigateWithParams } from '../navigation/navigationService'
import { formatName, formatTime } from '../utils/extras'
import { colors, fonts } from '../../assets/constants'

const FeedBackHistory = () => {
  const [loading, setLoading] = useState(true)
  const [feedbackList, setFeedbackList] = useState([])

  async function fetchFeedBack() {

    const res = await customFetch("/api/user/get/feedback", "GET")
    console.log("feedback History ", res.data)
    setFeedbackList(res.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchFeedBack();
  }, [])

  if (loading) {
    return (
      <>
        {[0, 1, 2, 3].map((_, key) =>
          <View
            key={key}
            style={{ width: '100%', alignItems: 'center' }}>

            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              style={{ width: '90%', margin: hp(1), height: hp(10) }}
            />
          </View>

        )}

      </>
    )
  }


  const renderUserItem = ({ item }) => (
    <View
      key={item.id}
      style={{
        backgroundColor: "#D8DBDD", borderRadius: 15, paddingBottom: hp(0.2), marginHorizontal: wp(4),
      }}>
      <View style={styles.userCard}>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => (
              item.id = item.peer_id,
              navigateWithParams("OtherUserProfile", item)
            )}
            style={{ flexDirection: 'row', alignItems: 'center', flex: 2 }}>
            <Image
              source={{ uri: item.rater_pic || 'https://via.placeholder.com/50' }}
              style={styles.profilePic}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{formatName(item.rater_name) || 'Unknown User'}</Text>
              <Text style={[styles.userName, { color: colors.grey, fontFamily: fonts.regular, width: wp(35), fontSize: hp(1.65) }]}>{formatTime(item.created_at) || 'Unknown User'}</Text>

            </View>
          </TouchableOpacity>

          <View style={{ height: '100%', justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
            {Array.from({ length: 5 }).map((_, key) =>
              item.stars > key ?
                <Image
                  key={key}
                  source={require("../../assets/images/star.png")}
                  resizeMode='contain'
                  tintColor={colors.gradient.last}
                  style={{ height: hp(2), width: hp(2), }}
                />
                :
                <Image
                  key={key}
                  source={require("../../assets/images/star.png")}
                  resizeMode='contain'
                  tintColor={colors.grey}
                  style={{ height: hp(2), width: hp(2), }}
                />
            )}

          </View>
        </View>

        <View style={{}}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-start", marginVertical: hp(1) }}>

            {item.behaviour?.length > 0 && item.behaviour.map((item, key) => (
              <LinearGradient
                colors={[colors.gradient.first, colors.gradient.second, colors.gradient.last]}
                style={{ padding: 1, borderRadius: hp(2.2), margin: wp(1) }}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.9, y: 0 }}
              >
                <View style={{ backgroundColor: colors.white, borderRadius: hp(2) }}>
                  <Text style={{ margin: hp(1), fontFamily: fonts.regular, fontSize: hp(1.75) }}>{item}</Text>
                </View>
              </LinearGradient>
            ))}
          </View>
          {
            item.comment &&
            <Text
              style={{ fontFamily: fonts.regular }}
            >
              {item.comment}
            </Text>
          }

        </View>

      </View>
    </View>
  );



  return (
    <View>

      <FlatList
        data={feedbackList}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.call_id}
      />
    </View>
  )
}

export default FeedBackHistory

const styles = StyleSheet.create({
  userCard: {
    flex: 1,
    backgroundColor: colors.white,
    // alignItems: 'center',
    justifyContent: "space-between",
    borderRadius: 13,
    padding: hp(1.4),

  },
  profilePic: {
    width: hp(7),
    height: hp(7),
    borderRadius: 13,
    backgroundColor: colors.lightGrey
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