
import { Modal, StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useCallStore } from '../store/useCallStore';
import { sendMessage } from '../services/socket';
import useAuthStore from '../store/useAuthStore';
import { acceptOffer } from '../services/webrtc';
import { navigateWithParams } from '../navigation/navigationService';
import { colors, fonts } from '../../assets/constants';
import { hpPortrait as hp, wpPortrait as wp } from '../utils/responsive';

export default function IncomingCallModal() {

  const [callIncoming, setCallIncoming] = useState(false);
  const { incomingCall, hideIncomingCallModal } = useCallStore();
  const { user } = useAuthStore();
  // const navigation = useNavigation();

  useEffect(() => {
    console.log("incomingCall changed")
    if (incomingCall != null) {
      console.log("Incoming call:", incomingCall);
      setCallIncoming(true);
    } else {
      console.log("No incoming call");
      setCallIncoming(false);
    }
  }, [incomingCall]);

  // 	FromUserData: map[string]any{
  // 	"id":          allClientsData[msg.From].Id,
  // 	"full_name":   allClientsData[msg.From].FullName,
  // 	"username":    allClientsData[msg.From].Username,
  // 	"profile_pic": allClientsData[msg.From].ProfilePic,
  // 	"gender":      allClientsData[msg.From].Gender,
  // 	"age":         allClientsData[msg.From].Age,
  // },

  const rejectCall = () => {
    const msg = {
      type: "rejectCall",
      from: user.id,
      target: incomingCall.fromUserData.id,
    }
    sendMessage(msg)
    console.log(user);
    hideIncomingCallModal();
  }

  const acceptCall = () => {
    // console.log("incoming call payload : ",incomingCall)
    acceptOffer(incomingCall.payload, incomingCall.fromUserData)
    navigateWithParams("CallScreen", incomingCall.fromUserData)
    hideIncomingCallModal();
  }

  const formatName = (name)=>{
    if(name.length > 15){
      return name.slice(0,12) + "..."
    }
    return name
  }

  return (
    
    <Modal
      visible={callIncoming}
      transparent
      animationType="slide"
    >
      <View style={styles.container}>
        <View style={styles.notification}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start", width: '95%' }}>

            <TouchableOpacity onPress={() => ToastAndroid.show("Profile Clicked", ToastAndroid.SHORT)}>
              <Image
                source={{ uri: incomingCall?.fromUserData.profile_pic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVcJBefqsqE-EgUOG0wYrNLOjflaZXsH9U_A&s" }}
                style={{ width: hp(8), height: hp(8), borderRadius: hp(100) }}
              />
            </TouchableOpacity>

            <View >

              <Text style={styles.callerName}>
                { formatName(incomingCall?.fromUserData.full_name  || "Unknown")} {"is calling you"}
              </Text>
              <Text style={[styles.callerName, { fontSize: hp(1.3), fontFamily: fonts.meduim }]}>
                {"\u2022 "}{incomingCall?.fromUserData.nativeLanguage || 'Unknown Language '}
                {"\u2022 "}{incomingCall?.fromUserData.age || 'Unknown Age '}

              </Text>
              <Text style={[styles.callerName, { fontSize: hp(1.3), fontFamily: fonts.meduim }]}>
                {"\u2022 "}{incomingCall?.fromUserData.nativeLanguage || 'No talks'}
              </Text>
            </View>

          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={rejectCall}
              style={[styles.button, styles.declineButton]}>
              <Text style={styles.buttonText}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={acceptCall}
              style={[styles.button, styles.acceptButton]}>
              <Text style={styles.buttonText}>Answer</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    </Modal>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.callModalBackground,
  },
  notification: {
    backgroundColor: colors.white,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    margin: hp(1.8),
    padding: hp(1.4),
    borderRadius: hp(2),
  },
  callerName: {
    fontFamily: fonts.semiBold,
    fontSize: hp(2),
    marginLeft: wp(3),
  
  },
  callStatus: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: hp(1),
  },
  button: {
    flex: 1,
    paddingVertical: hp(0.7),
    marginHorizontal: wp(1),
    borderRadius: hp(1.5),
    alignItems: 'center',
  },
  declineButton: {
    backgroundColor: colors.callCut,
  },
  acceptButton: {
    backgroundColor: colors.callAccept,
  },
  buttonText: {
    color: '#fff',
    fontSize: hp(2),
    fontFamily: fonts.semiBold,
    marginVertical: hp(-0.4),
    marginTop: hp(-0.2)
  },
});