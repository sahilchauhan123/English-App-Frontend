import { create } from "zustand";


export const useCallStore = create((set, get) => ({
  usersList: [],
  targetId: null,
  inRandomMatch: false,
  randomUserData:null,
  incomingCall: null,
  remoteStream: null,
  localStream: null,
  iceCandidates: null,
  

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

}));

// Helper for socket.js
// export const { showIncomingCallModal } = useCallStore.getState();
