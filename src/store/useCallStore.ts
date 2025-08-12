import { create } from "zustand";


export const useCallStore = create((set) => ({
  usersList:[],
  target:null,
  inRandomMatch:false,
  incomingCall: null,
  remoteStream: null,
  localStream:null,

  setUsersList:(data:any) => set({usersList:data}),
  setInRandomMatch : (data:boolean) => set({inRandomMatch:data}),
  showIncomingCallModal: (from, offer) => set({ incomingCall: { from, offer } }),
  hideIncomingCallModal: () => set({ incomingCall: null }),
  setRemoteStream: (stream) => set({ remoteStream: stream }),
  setLocalStream: (stream) => set({ localStream: stream }),
  setTarget: (target) => set({ target: target }),
}));

// Helper for socket.js
export const { showIncomingCallModal } = useCallStore.getState();
