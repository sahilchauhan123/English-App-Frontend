import { Dimensions } from "react-native";
import { create } from "zustand";


export const useCallStore = create((set, get) => ({
  usersList: [],
  targetId: null,
  inRandomMatch: false,
  randomUserData: null,
  incomingCall: null,
  remoteStream: null,
  localStream: null,
  iceCandidates: null,
  ongoingCallId: null,
  callStartTime: null,
  callDuration: 0,
  intervalId: null,

  setUsersList: (data: any) => set({ usersList: data }),
  setInRandomMatch: (data: boolean) => set({ inRandomMatch: data }),
  showIncomingCallModal: (payload) => set({ incomingCall: payload }),
  hideIncomingCallModal: () => set({ incomingCall: null }),
  setRemoteStream: (stream) => set({ remoteStream: stream }),
  setLocalStream: (stream) => set({ localStream: stream }),
  setTargetId: (target) => set({ targetId: target }),
  // setIceCandidates : (candidate) => set({icecandidates:candidate}),
  // clearIceCandidates: () => set({ iceCandidates: null }),
  setIceCandidates: (candidate) => set((state) => {
    const newCandidates = state.iceCandidates ? [...state.iceCandidates, candidate] : [candidate];
    return { iceCandidates: newCandidates };
  }),
  clearIceCandidates: () => set({ iceCandidates: [] }),
  setRandomUserData: (data) => set({ randomUserData: data }),

  setOngoingCallId: (data) => set({ ongoingCallId: data }),
  startCallTimer: () => {
    const startTime = Date.now();
    const intervalId = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      set({ callDuration: elapsed });
    }, 1000);

    set({ callStartTime: startTime, intervalId, callDuration: 0 });
  },
  stopCallTimer: () => {
    const { intervalId } = get();
    if (intervalId) clearInterval(intervalId);
    set({ callDuration: 0, intervalId: null, callStartTime: null });
  },

}));

// Helper for socket.js
export const { 
  startCallTimer,
  stopCallTimer,
  setOngoingCallId
} = useCallStore.getState();



export const useOrientationStore = create((set) => ({
  orientation: Dimensions.get('window').height >= Dimensions.get('window').width ? 'portrait' : 'landscape',
}));

Dimensions.addEventListener('change', ({ window }) => {
  const orientation = window.height >= window.width ? 'portrait' : 'landscape';
  useOrientationStore.setState({ orientation });
});