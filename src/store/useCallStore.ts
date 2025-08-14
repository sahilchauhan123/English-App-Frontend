import { create } from "zustand";


export const useCallStore = create((set,get) => ({
  usersList:[],
  targetId:null,
  inRandomMatch:false,
  incomingCall: null,
  remoteStream: null,
  localStream:null,
  iceCandidates: null,

  setUsersList:(data:any) => set({usersList:data}),
  setInRandomMatch : (data:boolean) => set({inRandomMatch:data}),
  showIncomingCallModal: (from, offer) => set({ incomingCall: { from, offer } }),
  hideIncomingCallModal: () => set({ incomingCall: null }),
  setRemoteStream: (stream) => set({ remoteStream: stream }),
  setLocalStream: (stream) => set({ localStream: stream }),
  setTargetId: (target) => set({ targetId: target }),


  setIceCandidates : (candidate) => set({icecandidates:candidate}),
  clearIceCandidates: () => set({ iceCandidates: null }),


}));

// Helper for socket.js
// export const { showIncomingCallModal } = useCallStore.getState();
