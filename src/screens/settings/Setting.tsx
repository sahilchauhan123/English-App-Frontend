import { Image, StyleSheet, Text, View, Switch, TouchableOpacity, ToastAndroid, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { hpPortrait as hp, wpPortrait as wp } from '../../utils/responsive'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, fonts } from '../../../assets/constants'
import { settingsMenus } from '../../utils/constants'
import { navigate } from '../../navigation/navigationService'
import useAuthStore, { deleteAccount } from '../../store/useAuthStore'
import useBasicStore, { setNotificationEnabled } from '../../store/userBasicStore'

const Setting = () => {
  const { logout } = useAuthStore();
  const { notificationsEnabled } = useBasicStore();
  const [Enable, setEnable] = useState(notificationsEnabled);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  useEffect(() => {
    console.log("notificationsEnabled changed in settings:", notificationsEnabled);
    setEnable(notificationsEnabled);
  }, [notificationsEnabled]);


  const toggle = (state: boolean) => {
    setNotificationEnabled(state);
    setEnable(state);
  }

  function handleLogout() {
    logout();
  }

  function handleDeleteAccount() {
    console.log("account deletion started")
    deleteAccount();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white, justifyContent: 'space-between' }}>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: fonts.semiBold,
            fontSize: hp(2.8),
            marginBottom: hp(-2),
            zIndex: 1,  
            backgroundColor:colors.white                  // ensure it stays on top if needed
          }}>
          Settings
        </Text>
        <View
          style={{
            backgroundColor: '#fff',
            elevation: 4,
            marginBottom: hp(2),
            height: hp(3),
          }} />

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
                  trackColor={{ false: colors.grey, true: colors.orange }}
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
                onPress={
                  menu.name === "Delete your account" ?
                    () => (setModalVisible(true), setModalText("Are you sure you want to delete your account?")) :
                    () => navigate(menu.screen)
                }
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
          onPress={() => (setModalVisible(true), setModalText("Are you sure you want to logout?"))}
        >
          <Text style={styles.continueText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Background overlay */}
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        {/* Bottom popup content */}
        <View style={styles.bottomContainer}>

          <Image
            source={require('../../../assets/images/shock.png')}
            style={{ height: hp(8), width: hp(8), alignSelf: 'center', marginTop: hp(-7) }}
          />
          <Text style={styles.text}>{modalText}</Text>

          {modalText === "Are you sure you want to delete your account?" && (
            <Text style={styles.subText}>
              Deleting is permanent and your data will be lost.
            </Text>
          )}

          <TouchableOpacity style={styles.btn} onPress={() => setModalVisible(false)}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={modalText === "Are you sure you want to logout?" ? handleLogout : handleDeleteAccount}
            style={[styles.btn, styles.logoutBtn]}>
            <Text style={[styles.btnText, { color: 'white' }]}>{modalText === "Are you sure you want to logout?" ? "Logout" : "Delete Account"}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  overlay: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.18)',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: "100%",
    backgroundColor: colors.lightGrey,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10,
  },
  text: {
    fontSize: hp(2.2),
    marginVertical: 10,
    textAlign: 'center',
    fontFamily: fonts.semiBold,
  },
  subText: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: fonts.meduim,
  },
  btn: {
    padding: hp(1.1),
    borderRadius: 10,
    backgroundColor: '#ffffffff',
    marginTop: 10,
  },
  logoutBtn: {
    backgroundColor: 'red',
  },
  btnText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: fonts.meduim,
  },
})
