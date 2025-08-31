import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(set => ({
    user: null,
    isAuthenticated: false,
    setUser: user => set({ user, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),

  }),
    {
      name: 'user-auth',
      storage: createJSONStorage(() => AsyncStorage),
    }),
);

export default useAuthStore;
