import * as Google from 'expo-google-app-auth';
import Constants from 'expo-constants';

// eslint-disable-next-line import/prefer-default-export
export async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      clientId: Constants.manifest.extra.GOOGLE_OAUTH_CLIENT_ID,
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      return result;
    }
    return { cancelled: true };
  } catch (e) {
    return { error: true };
  }
}
