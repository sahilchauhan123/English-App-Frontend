import { create } from "zustand";
import { sendMessage } from "../services/socket";
import { use } from "react";
import useAuthStore from "./useAuthStore";



const initialState = {
  usersList: [],
  targetId: null,
  inRandomMatch: false,
  randomUserData: null,
  incomingCall: null,
  remoteStream: null,
  localStream: null,
  iceCandidates: [],
  ongoingCallId: null,
  callStartTime: null,
  callDuration: 0,
  intervalId: null,
  ongoingCallData: null,
  isOnCallScreen: false,
};

export const useCallStore = create((set, get) => ({
  // usersList: [],
  // targetId: null,
  // inRandomMatch: false,
  // randomUserData: null,
  // incomingCall: null,
  // remoteStream: null,
  // localStream: null,
  // iceCandidates: null,
  // ongoingCallId: null,
  // callStartTime: null,
  // callDuration: 0,
  // intervalId: null,

  ...initialState,

  setUsersList: (data: any) => set({ usersList: data }),
  setIsOnCallScreen: (value: boolean) => set({ isOnCallScreen: value }),
  setInRandomMatch: (data: boolean) => set({ inRandomMatch: data }),
  showIncomingCallModal: (payload) => set({ incomingCall: payload }),
  hideIncomingCallModal: () => set({ incomingCall: null }),
  setOngoingCallData: (data) => set({ ongoingCallData: data }),
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
    const { intervalId } = get();
    if (intervalId) clearInterval(intervalId); // ← PREVENT DUPLICATES

    const startTime = Date.now();
    const id = setInterval(() => {
      const now = Date.now();
      const seconds = Math.floor((now - startTime) / 1000);
      set({ callDuration: seconds }); // always fresh
    }, 1000);

    set({ callStartTime: startTime, intervalId: id });
  },

  stopCallTimer: () => {
    const { intervalId } = get();
    if (intervalId) clearInterval(intervalId);
    set({ callDuration: 0, intervalId: null, callStartTime: null });
  },
  setCallStoreNull: () => {
    get().stopCallTimer();
    set(initialState);
  },
  startRefreshUserListLoop: (id) => {
    const refresh = () => {
        console.log("refreshing it ")
        sendMessage({ type: "refreshList", from: id });

      // Schedule next refresh
      setTimeout(refresh, 15000);
    };
    refresh(); // Start immediately
  }

}));

// Helper for socket.js
export const {
  startCallTimer,
  stopCallTimer,
  setOngoingCallId,
  setOngoingCallData,
  startRefreshUserListLoop
} = useCallStore.getState();

