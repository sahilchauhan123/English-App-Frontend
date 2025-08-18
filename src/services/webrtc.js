// import {
//   mediaDevices,
//   RTCIceCandidate,
//   RTCSessionDescription,
//   RTCPeerConnection,
// } from 'react-native-webrtc';

// import {sendMessage} from './socket';
// import useAuthStore from '../store/useAuthStore';
// import {useCallStore} from '../store/useCallStore';
// import {requestMicrophonePermission} from './permission';

// let pc;
// var peerConstraints = {
//   iceServers: [
//     {urls: 'stun:stun.l.google.com:19302'},
//     {
//       urls: 'turn:relay1.expressturn.com:3478',
//       username: 'efP1LUPHPXL09ERRTN',
//       credential: 'S8dZLnys5SU7B8CU',
//     },
//   ],
// };

// // type Message struct {
// // 	Type         string     `json:"type"`
// // 	User         types.User `json:"user,omitempty"`
// // 	Target       int64      `json:"target,omitempty"`
// // 	Payload      any        `json:"payload,omitempty"`
// // 	From         int64      `json:"from,omitempty"`
// // 	FromUserData any        `json:"fromUserData,omitempty"`
// // }

// export async function initWebRTC() {
//   pc = new RTCPeerConnection(peerConstraints);

//   await requestMicrophonePermission();
//   const stream = await mediaDevices.getUserMedia({
//     audio: true,
//     video: false,
//   });
//   useCallStore.getState().setLocalStream(stream);

//   stream.getTracks().forEach(track => {
//     pc.addTrack(track, stream);
//   });

//   pc.onicecandidate = event => {
//     if (event.candidate) {
//       sendMessage({
//         type: 'icecandidate',
//         payload: event.candidate,
//         from: useAuthStore.getState().user.user.id,
//         // fromUserData: useAuthStore.getState().user.user,
//         target: useAuthStore.getState().targetId
//       });
//     }
//   };

//   pc.onconnectionstatechange = () => {
//     console.log('WebRTC connection state:', pc.connectionState);
//   };

//   pc.ontrack = event => {
//     console.log('Received track:', event.streams[0]);
//     // Handle the  received remote track (e.g., display it in a video element)
//     useCallStore.getState().setRemoteStream(event.streams[0]);
//   };
// }

// export async function sendOffer(targetId) {

//   await initWebRTC();
//   const offer = await pc.createOffer();
//   await pc.setLocalDescription(offer);
//   sendMessage({
//     type: 'offer',
//     payload: offer,
//     from: useAuthStore.getState().user.user.id,
//     target: targetId,
//   });
// }

// export async function acceptOffer(offer, from) {
//   await initWebRTC();
//   await pc.setRemoteDescription(new RTCSessionDescription(offer));
//   const answer = await pc.createAnswer();
//   await pc.setLocalDescription(answer);
//   sendMessage({
//     type: 'answer',
//     payload: answer,
//     from: useAuthStore.getState().user.user.id,
//     target: from,
//   });
// }

// export async function acceptAnswer(answer) {
//   await pc.setRemoteDescription(new RTCSessionDescription(answer));
// }

// export async function insertICECandidate(candidate) {
//   await pc.addIceCandidate(new RTCIceCandidate(candidate));
// }

// export async function endCall(targetId) {
//   sendMessage({
//     type: 'endCall',
//     from: useAuthStore.getState().user.user.id,
//     target: targetId,
//   });
//   pc.close();
//   pc = null;
//   useCallStore.getState().setRemoteStream(null);
//   useCallStore.getState().setLocalStream(null);
//   useCallStore.getState().hideIncomingCallModal();
// }

// export async function remoteEndCall() {
//   pc.close();
//   pc = null;
//   useCallStore.getState().setRemoteStream(null);
//   useCallStore.getState().hideIncomingCallModal();
//   useCallStore.getState().setLocalStream(null);
// }

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
import {navigate} from '../navigation/navigationService';

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

export async function initWebRTC(targetId) {
  // console.log('[initWebRTC] Initializing WebRTC...');

  pc = new RTCPeerConnection(peerConstraints);
  console.log('[initWebRTC] RTCPeerConnection created:', peerConstraints);

  // console.log('[initWebRTC] Requesting microphone permission...');
  await requestMicrophonePermission();
  // console.log('[initWebRTC] Microphone permission granted');

  // console.log('[initWebRTC] Getting local media stream...');
  const stream = await mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });
  // console.log('[initWebRTC] Local stream obtained:', stream);

  useCallStore.getState().setLocalStream(stream);
  // console.log('[initWebRTC] Local stream stored in call store');

  stream.getTracks().forEach(track => {
    console.log('[initWebRTC] Adding track to PeerConnection:', track.kind);
    pc.addTrack(track, stream);
  });

  pc.onicecandidate = event => {
    // console.log('[initWebRTC] ICE candidate event triggered:', event.candidate);
    if (event.candidate) {
      if (targetId) {
        sendMessage({
          type: 'icecandidate',
          payload: event.candidate,
          from: useAuthStore.getState().user.user.id,
          target: targetId,
        });
        console.log('ICE candidate sent to target');
      } else {
        console.log('added single candidate');
        useCallStore.getState().setIceCandidates(event.candidate);
      }
    }
  };

  pc.onconnectionstatechange = () => {
    if (pc.connectionState != null) {
      console.log('[initWebRTC] Connection state changed:', pc.connectionState);
    }
  };

  pc.ontrack = event => {
    // console.log('[initWebRTC] Received remote track:', event.streams[0]);
    useCallStore.getState().setRemoteStream(event.streams[0]);
    console.log('[initWebRTC] Remote stream stored in call store');
  };
}

export async function sendOffer(targetId, randomCall) {
  // console.log('[sendOffer] Creating and sending offer to:', targetId);
  if (randomCall) {
    await initWebRTC(targetId);
  } else {
    await initWebRTC(null);
  }

  // console.log('[sendOffer] Creating offer...');
  const offer = await pc.createOffer();
  console.log('Offer created:', offer);

  // console.log('Setting local description...');
  await pc.setLocalDescription(offer);
  const data = {
    type: 'offer',
    payload: offer,
    from: useAuthStore.getState().user.user.id,
    target: targetId,
    randomCall: randomCall,
  };
  console.log('Offer sent to target', data);
  sendMessage(data);
  // console.log('Offer sent to target', targetId);
}

export async function acceptOffer(offer, from) {
  try {
    // console.log('[acceptOffer] Accepting offer from:', from);
    // console.log('[acceptOffer] Offer payload:', offer);

    await initWebRTC(from.id);

    console.log('[acceptOffer] Setting remote description...');
    console.log('[acceptOffer] Offer payload:', offer);
    await pc.setRemoteDescription(new RTCSessionDescription(offer));

    console.log('[acceptOffer] Creating answer...');
    const answer = await pc.createAnswer();
    console.log('[acceptOffer] Answer created:', answer);

    console.log('[acceptOffer] Setting local description...');
    await pc.setLocalDescription(answer);
    const data = {
      type: 'answer',
      payload: answer,
      from: useAuthStore.getState().user.user.id,
      target: from.id,
    };
    sendMessage(data);
    // sendICECandidate(from);

    console.log('[acceptOffer] Answer sent to target', data);
  } catch (error) {
    console.log(error);
  }
}

export async function acceptAnswer(answer, from) {
  console.log('[acceptAnswer] Accepting answer:', answer);
  await pc.setRemoteDescription(new RTCSessionDescription(answer));
  sendICECandidate(from);
  try {
    // navigate('CallScreen');
    console.log('navigated to CallScreen');
  } catch (error) {
    console.log(error);
  }
  console.log('[acceptAnswer] Remote description set');
}

export async function insertICECandidate(candidate) {
  console.log('Adding ICE candidate:', candidate);
  if (pc != null) {
    await pc.addIceCandidate(new RTCIceCandidate(candidate));
    console.log('ICE candidate added');
  } else {
    console.log('Ice Candidate PeerConnection is null');
  }
}

// you ended the call
export async function endCall(targetId) {
  console.log('[endCall] Ending call with target:', targetId);
  sendMessage({
    type: 'endCall',
    from: useAuthStore.getState().user.user.id,
    target: targetId,
  });

  pc.close();
  console.log('[endCall] PeerConnection closed');
  pc = null;

  useCallStore.getState().setRemoteStream(null);
  useCallStore.getState().setLocalStream(null);
  useCallStore.getState().hideIncomingCallModal();
  console.log('[endCall] Local & remote streams cleared, modal hidden');
}

// call ended by other side
export async function remoteEndCall() {
  console.log('[remoteEndCall] Remote ended the call');
  pc.close();
  console.log('[remoteEndCall] PeerConnection closed');
  pc = null;

  useCallStore.getState().setRemoteStream(null);
  useCallStore.getState().hideIncomingCallModal();
  useCallStore.getState().setLocalStream(null);
  console.log('[remoteEndCall] Local & remote streams cleared, modal hidden');
}

function sendICECandidate(targetID) {
  try {
    console.log(
      'Local Ice Candidates: ',
      useCallStore.getState().iceCandidates,
    );

    for (let i = 0; i < useCallStore.getState().iceCandidates.length; i++) {
      const candidate = useCallStore.getState().iceCandidates[i];
      const data = {
        type: 'icecandidate',
        payload: candidate,
        from: useAuthStore.getState().user.user.id,
        target: targetID,
      };
      sendMessage(data);
    }
  } catch (error) {
    console.log('error in sending ice candidate', error);
  }
}
