import notifee, { AndroidImportance, AndroidStyle } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

async function displayLocalNotification(remoteMessage: any) {
    if (!remoteMessage?.data) {
        console.log("No data in the remote message");
        return;
    }
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH, // must be HIGH for heads-up
        sound: 'default',
    });

    await notifee.displayNotification({
        title: remoteMessage.data.title,
        body: remoteMessage.data.body,
        pressAction: { id: 'default' },
        android: {
            channelId,
            importance: AndroidImportance.HIGH, // 🔥 Heads-Up Notification
            sound: 'default',
            pressAction: { id: 'default' },
            style: {
                type: AndroidStyle.BIGTEXT, // ✅ Expandable Notification
                text: remoteMessage.data.body,
            },
        },
    });
}

export function onMessageReceived(message) {
    displayLocalNotification(message);
    console.log("Message received in foreground: ", message);
}


export async function onAppBootStart() {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log("FCM Token: ", token);
}