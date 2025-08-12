import {
  mediaDevices,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCPeerConnection,
} from 'react-native-webrtc';

import {sendMessage} from './socket';
import useAuthStore from '../store/useAuthStore';
import {useCallStore} from '../store/useCallStore';
import {requestMicrophonePermission} from './permission';

let pc;
var peerConstraints = {
  iceServers: [
    {urls: 'stun:stun.l.google.com:19302'},
    {
      urls: 'turn:relay1.expressturn.com:3478',
      username: 'efP1LUPHPXL09ERRTN',
      credential: 'S8dZLnys5SU7B8CU',
    },
  ],
};

// type Message struct {
// 	Type         string     `json:"type"`
// 	User         types.User `json:"user,omitempty"`
// 	Target       int64      `json:"target,omitempty"`
// 	Payload      any        `json:"payload,omitempty"`
// 	From         int64      `json:"from,omitempty"`
// 	FromUserData any        `json:"fromUserData,omitempty"`
// }

export async function initWebRTC() {
  pc = new RTCPeerConnection(peerConstraints);

  await requestMicrophonePermission();
  const stream = await mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });
  useCallStore.getState().setLocalStream(stream);

  stream.getTracks().forEach(track => {
    pc.addTrack(track, stream);
  });

  pc.onicecandidate = event => {
    if (event.candidate) {
      sendMessage({
        type: 'icecandidate',
        payload: event.candidate,
        from: useAuthStore.getState().user.user.id,
        // fromUserData: useAuthStore.getState().user.user,
        // target: useAuthStore.getState().user.targetId
      });
    }
  };

  pc.onconnectionstatechange = () => {
    console.log('WebRTC connection state:', pc.connectionState);
  };

  pc.ontrack = event => {
    console.log('Received track:', event.streams[0]);
    // Handle the  received remote track (e.g., display it in a video element)
    useCallStore.getState().setRemoteStream(event.streams[0]);
  };
}

export async function sendOffer(targetId) {
  await initWebRTC();
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  sendMessage({
    type: 'offer',
    payload: offer,
    from: useAuthStore.getState().user.user.id,
    target: targetId,
  });
}

export async function acceptOffer(offer, from) {
  await initWebRTC();
  await pc.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  sendMessage({
    type: 'answer',
    payload: answer,
    from: useAuthStore.getState().user.user.id,
    target: from,
  });
}

export async function acceptAnswer(answer) {
  await pc.setRemoteDescription(new RTCSessionDescription(answer));
}

export async function insertICECandidate(candidate) {
  await pc.addIceCandidate(new RTCIceCandidate(candidate));
}

export async function endCall(targetId) {
  sendMessage({
    type: 'endCall',
    from: useAuthStore.getState().user.user.id,
    target: targetId,
  });
  pc.close();
  pc = null;
  useCallStore.getState().setRemoteStream(null);
  useCallStore.getState().setLocalStream(null);
  useCallStore.getState().hideIncomingCallModal();
}

export async function remoteEndCall() {
  pc.close();
  pc = null;
  useCallStore.getState().setRemoteStream(null);
  useCallStore.getState().hideIncomingCallModal();
  useCallStore.getState().setLocalStream(null);
}
