import { Linking, PermissionsAndroid, Platform } from "react-native";
import useAuthStore from "../store/useAuthStore";
import { setNotificationsEnabled } from "../store/userBasicStore";


export async function requestMicrophonePermission() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
}



export async function requestNotificationPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log('❌ Notification permission denied');
    }
  }
}

export async function turnOffNotifications() {
  // There is no direct API to revoke notification permission programmatically.
  // You can guide the user to the app settings to manually turn off notifications.
  setNotificationsEnabled(false);
}

