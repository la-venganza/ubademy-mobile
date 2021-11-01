import React, { useContext, userContext } from 'react';
import {
  TouchableOpacity, Image, View, Text, StyleSheet,
} from 'react-native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import * as Google from 'expo-google-app-auth';
import * as AppAuth from 'expo-app-auth';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import GoogleLogo from '../../assets/images/google-logo.png';
import ColorPalette from '../../styles/colors';
import { AuthContext } from '../../context/AuthContext';
import * as GoogleAuthentication from '../../actions/googleAuthentication';

const styles = StyleSheet.create({
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ColorPalette.background,
    borderWidth: 0.5,
    borderColor: ColorPalette.gray,
    height: 40,
    borderRadius: 5,
    margin: 5,
    width: '100%',
    alignSelf: 'center',
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  TextStyle: {
    color: ColorPalette.black,
    marginBottom: 4,
    marginLeft: 10,
  },
  SeparatorLine: {
    backgroundColor: ColorPalette.gray,
    width: 1,
    height: 40,
  },
});

export const GoogleLoginButton = () => {
  const auth = useContext(AuthContext);
  const handleRedirect = async (event) => {
    WebBrowser.dismissBrowser();
  };

  const addLinkingListener = () => {
    Linking.addEventListener('url', handleRedirect);
  };
  const removeLinkingListener = () => {
    Linking.removeEventListener('url', handleRedirect);
  };

  const handleOAuthLogin = async () => {
    // gets the app's deep link
    const redirectUrl = await Linking.createURL();
    // this should change depending on where the server is running
    const authUrl = `${Constants.manifest.extra.REACT_APP_BACKEND_URL}/auth?redirect=${encodeURIComponent(redirectUrl)}`;
    addLinkingListener();
    try {
      const result = await GoogleAuthentication.signInWithGoogleAsync();
      const jwt = result.accessToken;
      const userName = result.user.givenName;
      const provider = new GoogleAuthProvider();
      const googleCredential = GoogleAuthProvider.credential(
        result.idToken,
        result.accessToken,
      );

      const authFb = getAuth();
      const firebaseCredential = await signInWithCredential(authFb, googleCredential);
      console.log('Firebase credentials');
      console.log(firebaseCredential);

      auth.setAuth(jwt, userName);
      console.log(jwt, userName);
    } catch (err) {
      console.log('ERROR:', err);
    }
    removeLinkingListener();
  };
  return (
    <TouchableOpacity style={styles.googleButton} activeOpacity={0.5} onPress={handleOAuthLogin}>
      <Image
        source={GoogleLogo}
        style={styles.ImageIconStyle}
      />
      <View style={styles.SeparatorLine} />
      <Text style={styles.TextStyle}> Login with Google </Text>
    </TouchableOpacity>
  );
};

export const FacebookLoginButton = () => (<div>FB</div>);
