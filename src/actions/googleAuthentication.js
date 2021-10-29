import * as Google from 'expo-google-app-auth';
import { initializeApp } from 'firebase/app';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.manifest.extra.FIREBASE_API_KEY,
  authDomain: Constants.manifest.extra.FIREBASE_AUTH_DOMAIN,
  projectId: Constants.manifest.extra.FIREBASE_PROJECT_ID,
  storageBucket: Constants.manifest.extra.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.manifest.extra.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.manifest.extra.FIREBASE_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

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
