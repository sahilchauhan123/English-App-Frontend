import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import { createJSONStorage } from 'zustand/middleware';
import {persist} from 'zustand/middleware';

const useBasicStore = create(
  persist(
    set => ({
      userOnboarded: null, // true or false
   
    }),

    {
      name: 'Basic-Details',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => state => {
        if (state) {
          // setTimeout(() => state.setInitialized(), 0);
        }
      },
    },
  ),
);
