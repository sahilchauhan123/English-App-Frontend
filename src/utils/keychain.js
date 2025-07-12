import * as Keychain from 'react-native-keychain';

export async function getTokenFromKeychain() {
  try {
    // Retrieve the credentials
    const credentials = await Keychain.getGenericPassword({
      service: 'refreshToken',
    });
    if (credentials) {
      console.log(
        'Credentials successfully loaded for user ' + credentials.username,
      );
      return credentials;
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.error('Failed to access Keychain', error);
  }
}

export async function setTokenInKeychain(token) {
  const username = 'user';
  try {
    await Keychain.setGenericPassword(username, token, {
      service: 'refreshToken',
    });
  } catch (error) {
    console.log(error);
  }

  console.log("token set sucessfully")
}
