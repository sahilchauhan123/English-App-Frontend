import { Image, StyleSheet, Text, View, Switch, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { hpPortrait as hp, wpPortrait as wp } from '../../utils/responsive'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, fonts } from '../../../assets/constants'
import { settingsMenus } from '../../utils/constants'
import { navigate } from '../../navigation/navigationService'

const Setting = () => {
  const [Enable, setEnable] = useState(false);

  const toggle = (state: boolean) => setEnable(state);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white, justifyContent: 'space-between' }}>
      <View>
        <Text style={{ textAlign: 'center', fontFamily: fonts.semiBold, fontSize: hp(2.8), marginBottom: hp(3), marginTop: hp(1) }}>
          Settings
        </Text>

        {settingsMenus.map((menu, key) => {
          // ✅ Conditional rendering at the top
          if (menu.name === "Notifications") {
            return (
              <View style={styles.listContainer} key={key}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={menu.image} style={styles.image} />
                  <Text style={{ fontFamily: fonts.meduim, fontSize: hp(2), marginLeft: wp(3) }}>
                    {menu.name}
                  </Text>
                </View>
                {/* <View> */}
                  <Switch
                    trackColor={{ false: colors.orange, true: colors.orange }}
                    thumbColor={colors.white}
                    onValueChange={toggle}
                    value={Enable}
                  />
                {/* </View> */}
              </View>
            )
          } else {
            return (
              <TouchableOpacity
                style={styles.listContainer}
                key={key}
                onPress={() => navigate(menu.screen)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={menu.image} style={styles.image} />
                  <Text style={{ fontFamily: fonts.meduim, fontSize: hp(2), marginLeft: wp(3) }}>
                    {menu.name}
                  </Text>
                </View>
                <Image
                  style={[styles.image, { height: hp(2.5), width: hp(2.5) }]}
                  source={require("../../../assets/images/arrow.png")}
                />
              </TouchableOpacity>
            )
          }
        })}
      </View>

      <View style={{ padding: hp(2) }}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => ToastAndroid.show("Logging Out", 1000)}
        >
          <Text style={styles.continueText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Setting

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
  },
  image: {
    height: hp(4),
    width: hp(4),
    resizeMode: 'contain',
    margin: hp(1),
  },
  continueButton: {
    borderColor: colors.bordercolor,
    borderWidth: 1,
    width: '100%',
    paddingVertical: hp(1.6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(1.2),
    marginTop: hp(2),
  },
  continueText: {
    fontFamily: fonts.bold,
  },
})
