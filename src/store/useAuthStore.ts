import { create } from 'zustand';
import { clearUserSession } from '../utils/tokens';
import { navigateAndReset } from '../navigation/navigationService';
import { ToastAndroid } from 'react-native';
import { useCallStore } from './useCallStore';
import { customFetch } from '../utils/api';

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  setUser: user => set({ user, isAuthenticated: true }),
  logout: () => {
    useCallStore.getState().setCallStoreNull()
    clearUserSession();
    set({ user: null, isAuthenticated: false });
    ToastAndroid.show("Logout Successfull", ToastAndroid.SHORT)
    navigateAndReset("SignIn");
  },
  deleteAccount: () => {
    customFetch("/api/user/account/delete","GET");
    useCallStore.getState().setCallStoreNull()
    clearUserSession();
    set({ user: null, isAuthenticated: false });
    ToastAndroid.show("Account Deleted", ToastAndroid.SHORT)
    navigateAndReset("SignIn");
  }


}));

export default useAuthStore;
export const {
  deleteAccount
} = useAuthStore.getState();


