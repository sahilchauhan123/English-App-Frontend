
import { Modal, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useCallStore } from '../store/useCallStore';
import { sendMessage } from '../services/socket';
import useAuthStore from '../store/useAuthStore';
import { acceptOffer } from '../services/webrtc';
import { navigate, navigateWithParams } from '../navigation/navigationService';
// import { useNavigation } from '@react-navigation/native';

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
    navigateWithParams("CallScreen",incomingCall.fromUserData)
    hideIncomingCallModal();
  }

  return (
    <Modal
      visible={callIncoming}
      transparent
      animationType="slide"
    >
      <View style={styles.container}>
        <View style={styles.notification}>
          <Image
            source={{ uri: incomingCall?.fromUserData.profile_pic }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
          <Text style={styles.callerName}>
            {incomingCall?.fromUserData.full_name || 'Unknown Caller'}
          </Text>
          <Text style={styles.callStatus}>Incoming Call</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={rejectCall}
              style={[styles.button, styles.declineButton]}>
              <Text style={styles.buttonText}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={acceptCall}
              style={[styles.button, styles.acceptButton]}>
              <Text style={styles.buttonText}>Accept</Text>
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
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  notification: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  callerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  callStatus: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  declineButton: {
    backgroundColor: '#bd0f06ff',
  },
  acceptButton: {
    backgroundColor: '#097509ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});