
import EncryptedStorage from 'react-native-encrypted-storage';



async function storeUserSession(value: any) {
    try {
        await EncryptedStorage.setItem(
            "user",
            JSON.stringify(value)
        );
        // Congrats! You've just stored your first value!
    } catch (error) {
        // There was an error on the native side
        return error;
    }
}

async function retrieveUserSession() {
    try {
        const session = await EncryptedStorage.getItem("user");
        if (session !== null) {
            // Congrats! You've just retrieved your first value!
            console.log(" in session",session);
            return JSON.parse(session);
        }
        return null; // Return null if no session found
    } catch (error) {
        // There was an error on the native side
        return error;
    }
}

async function removeUserSession() {
    try {
        await EncryptedStorage.removeItem("user");
        // Congrats! You've just removed your first value!
    } catch (error) {
        // There was an error on the native side
        return error;
    }
}



async function clearUserSession() {
    try {
        await EncryptedStorage.clear();
        // Congrats! You've just cleared the device storage!
    } catch (error) {
        // There was an error on the native side
        return error;
    }
}

export { storeUserSession, retrieveUserSession, removeUserSession, clearUserSession };