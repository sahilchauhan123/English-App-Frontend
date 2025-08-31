

import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const GoogleSignUp = async () => {
    try {
        GoogleSignin.configure({
            webClientId: '654497521442-4kdbkr8v9gker2ndkbadseu8ufmp33j2.apps.googleusercontent.com',
            offlineAccess: false,
        });
        GoogleSignin.revokeAccess() // REMOVE THIS LINE LATER 
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        return userInfo.data?.idToken
    } catch (error) {
        // Log any errors that occur during the sign-in process
        console.error('Sign-in Error:', error);
    }
};
