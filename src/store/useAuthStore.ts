import { create } from 'zustand';
import { clearUserSession } from '../utils/tokens';
import { navigateAndReset } from '../navigation/navigationService';
import { ToastAndroid } from 'react-native';

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  setUser: user => set({ user, isAuthenticated: true }),
  logout:()=>{
    clearUserSession();
    set({ user: null, isAuthenticated: false });
    ToastAndroid.show("Logout Successfull",ToastAndroid.SHORT)
    navigateAndReset("SignIn");
  }
  // logout: () => set({
  //   user: null, isAuthenticated: false 
    
  // }),
}));

export default useAuthStore;


