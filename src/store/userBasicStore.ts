

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";

const useBasicStore = create(
  persist(
    (set) => ({

      userOnboarded:false,
      isInitialized: false,

      setUserOnboarded: (value:boolean) => set({ userOnboarded: value }),
      setInitialized: () => set({ isInitialized: true }),
      
    }),
    {
      name: "User-Data",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          setTimeout(() => state.setInitialized(), 0);
        }
      },
    }
  )
);

export default useBasicStore;


