import {
  mediaDevices,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCPeerConnection,
} from 'react-native-webrtc';

import {sendMessage} from './socket';
import useAuthStore from '../store/useAuthStore';
import {
  setOngoingCallData,
  useCallStore,
  stopCallTimer,
} from '../store/useCallStore';
import {requestMicrophonePermission} from './permission';
import {navigate, navigateAndReset} from '../navigation/navigationService';
import inCallManager from 'react-native-incall-manager';
import analytics from '@react-native-firebase/analytics';

let pc;
// let connectionType;
var peerConstraints = {
  iceServers: [
    {urls: 'stun:stun.l.google.com:19302'},
    {
      urls: 'turn:global.relay.metered.ca:80',
      username: '3d87f7f5bcc238b508f250bb',
      credential: 'VmG30ZbDD8yolAQW',
    },
    {
      urls: 'turn:global.relay.metered.ca:80?transport=tcp',
      username: '3d87f7f5bcc238b508f250bb',
      credential: 'VmG30ZbDD8yolAQW',
    },
    {
      urls: 'turn:global.relay.metered.ca:443',
      username: '3d87f7f5bcc238b508f250bb',
      credential: 'VmG30ZbDD8yolAQW',
    },
    {
      urls: 'turns:global.relay.metered.ca:443?transport=tcp',
      username: '3d87f7f5bcc238b508f250bb',
      credential: 'VmG30ZbDD8yolAQW',
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
          from: useAuthStore.getState().user.id,
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
    try {
      if (pc.connectionState != null) {
        console.log(
          '[initWebRTC] Connection state changed:',
          pc.connectionState,
        );
      }
    } catch (error) {
      console.log('error in webrtc state change', error);
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
    from: useAuthStore.getState().user.id,
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
      from: useAuthStore.getState().user.id,
      target: from.id,
    };
    sendMessage(data);
    // sendICECandidate(from);
    startCallAudio();
    console.log('[acceptOffer] Answer sent to target', data);
  } catch (error) {
    console.log(error);
  }
}

export async function acceptAnswer(answer, from) {
  console.log('[acceptAnswer] Accepting answer:', answer);
  await pc.setRemoteDescription(new RTCSessionDescription(answer));
  sendICECandidate(from);
  startCallAudio();
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
  const callID = useCallStore.getState().ongoingCallId;
  setOngoingCallData(null);
  stopCallTimer();
  sendMessage({
    type: 'endCall',
    from: useAuthStore.getState().user.id,
    target: targetId,
    callID,
  });
  stopCallAudio();
  let connectionType = await checkConnectionType();
  connectionType = getConnectionTypeString(connectionType);
  await analytics().logEvent('webrtc_conn_type', {
    callID,
    connectionType,
  });
  pc.close();
  console.log('[endCall] PeerConnection closed');
  pc = null;

  useCallStore.getState().setRemoteStream(null);
  useCallStore.getState().setLocalStream(null);
  useCallStore.getState().hideIncomingCallModal();
  // useCallStore.getState().setOngoingCallId(null);
  console.log('[endCall] Local & remote streams cleared, modal hidden');
}

// call ended by other side
export async function remoteEndCall() {
  console.log('[remoteEndCall] Remote ended the call');
  pc.close();
  console.log('[remoteEndCall] PeerConnection closed');
  pc = null;
  stopCallAudio();
  setOngoingCallData(null);
  stopCallTimer();
  useCallStore.getState().setRemoteStream(null);
  useCallStore.getState().hideIncomingCallModal();
  useCallStore.getState().setLocalStream(null);
  // useCallStore.getState().setOngoingCallId(null);
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
        from: useAuthStore.getState().user.id,
        target: targetID,
      };
      sendMessage(data);
    }
  } catch (error) {
    console.log('error in sending ice candidate', error);
  }
}

export const startCallAudio = () => {
  try {
    inCallManager.start({media: 'audio'});
    inCallManager.setForceSpeakerphoneOn(false); // default to earpiece
    inCallManager.setKeepScreenOn(true);
    inCallManager.startProximitySensor();
  } catch (err) {
    console.log('Error starting InCallManager:', err);
  }
};

export const stopCallAudio = () => {
  try {
    inCallManager.setKeepScreenOn(false);
    inCallManager.stopProximitySensor();
    inCallManager.stop();
  } catch (err) {
    console.log('Error stopping InCallManager:', err);
  }
};

export const toggleMute = mute => {
  try {
    inCallManager.setMicrophoneMute(mute);
  } catch (err) {
    console.log('Error toggling mute:', err);
  }
};

export const toggleSpeaker = enableSpeaker => {
  console.log('Toggling speaker to:', enableSpeaker);
  try {
    inCallManager.setForceSpeakerphoneOn(enableSpeaker);
  } catch (err) {
    console.log('Error toggling speaker:', err);
  }
};

export async function checkConnectionType() {
  if (!pc) {
    console.log('[checkConnectionType] pc is null');
    return null;
  }

  try {
    const stats = await pc.getStats();
    let candidatePair = null;
    let localCandidate = null;
    let remoteCandidate = null;

    // stats may be Map-like or an object; normalize iteration
    const entries = [];
    if (typeof stats.forEach === 'function') {
      stats.forEach(r => entries.push(r));
    } else if (Array.isArray(stats)) {
      entries.push(...stats);
    } else {
      for (const k in stats) entries.push(stats[k]);
    }

    // find selected/succeeded candidate-pair
    for (const r of entries) {
      if (!r || !r.type) continue;
      const t = r.type.toLowerCase();
      if (
        t === 'candidate-pair' &&
        (r.state === 'succeeded' || r.selected === true || r.nominated === true)
      ) {
        candidatePair = r;
        break;
      }
    }

    // fallback: some implementations expose selectedCandidatePairId
    if (!candidatePair) {
      const sel = entries.find(
        e =>
          e &&
          (e.type === 'transport' || e.type === 'candidate-pair') &&
          (e.selected === true || e.state === 'succeeded'),
      );
      if (sel) candidatePair = sel;
    }

    if (candidatePair) {
      const localId =
        candidatePair.localCandidateId ||
        candidatePair.localCandidate ||
        candidatePair.local;
      const remoteId =
        candidatePair.remoteCandidateId ||
        candidatePair.remoteCandidate ||
        candidatePair.remote;

      if (localId) {
        localCandidate = entries.find(
          e =>
            e &&
            (e.id === localId ||
              e.localCandidateId === localId ||
              (e.type === 'local-candidate' && e.id === localId)),
        );
      }
      if (!localCandidate) {
        // try to find any local-candidate record
        localCandidate = entries.find(e => e && e.type === 'local-candidate');
      }

      if (remoteId) {
        remoteCandidate = entries.find(
          e =>
            e &&
            (e.id === remoteId ||
              e.remoteCandidateId === remoteId ||
              (e.type === 'remote-candidate' && e.id === remoteId)),
        );
      }
      if (!remoteCandidate) {
        remoteCandidate = entries.find(e => e && e.type === 'remote-candidate');
      }
    } else {
      // no candidate pair found, try to infer from any local/remote candidate entries
      localCandidate = entries.find(e => e && e.type === 'local-candidate');
      remoteCandidate = entries.find(e => e && e.type === 'remote-candidate');
    }

    const result = {
      usedTurn: false,
      localType: localCandidate?.candidateType || localCandidate?.type || null,
      remoteType:
        remoteCandidate?.candidateType || remoteCandidate?.type || null,
      localProtocol:
        localCandidate?.protocol || localCandidate?.transport || null,
      remoteProtocol:
        remoteCandidate?.protocol || remoteCandidate?.transport || null,
      candidatePair,
      localCandidate,
      remoteCandidate,
    };

    if (result.localType === 'relay' || result.remoteType === 'relay')
      result.usedTurn = true;
    else if (
      result.localType === 'srflx' ||
      result.remoteType === 'srflx' ||
      result.localType === 'prflx' ||
      result.remoteType === 'prflx'
    )
      result.usedTurn = false;

    console.log('[checkConnectionType] result:', result);
    return result;
  } catch (err) {
    console.error('[checkConnectionType] error:', err);
    return null;
  }
}

export function getConnectionTypeString(info) {
  if (!info) return 'Unknown';
  if (info.usedTurn)
    return `TURN (${
      (info.localProtocol || info.remoteProtocol || '').toUpperCase() ||
      'UDP/TCP'
    })`;
  if (info.localType === 'srflx' || info.remoteType === 'srflx')
    return `STUN (${
      (info.localProtocol || info.remoteProtocol || '').toUpperCase() ||
      'UDP/TCP'
    })`;
  if (info.localType === 'host' || info.remoteType === 'host')
    return `Direct (Host)`;
  return 'Unknown';
}
// ...existing code...
