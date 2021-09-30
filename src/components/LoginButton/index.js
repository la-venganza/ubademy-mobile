import React from 'react';
import {
  TouchableOpacity, Image, View, Text, StyleSheet,
} from 'react-native';
import * as Linking from 'expo-linking';
// import { AuthSession } from 'expo';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import GoogleLogo from '../../assets/images/google-logo.png';
import ColorPalette from '../../styles/colors';

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
  const handleRedirect = async (event) => {
    console.log(event);
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
    // const redirectUrl = await Linking.getInitialURL('/');
    const redirectUrl = await Linking.createURL();
    // this should change depending on where the server is running
    const authUrl = `${Constants.manifest.extra.REACT_APP_BACKEND_URL}/auth?redirect=${encodeURIComponent(redirectUrl)}`;
    console.log(redirectUrl);
    addLinkingListener();
    try {
      const authResult = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl);
      console.log('test2', authResult);
    //   await this.setState({ authResult });
    } catch (err) {
      console.log('ERROR:', err);
    }
    removeLinkingListener();
  };
  return (
    <TouchableOpacity style={styles.googleButton} activeOpacity={0.5}>
      <Image
        source={GoogleLogo}
        style={styles.ImageIconStyle}
      />
      <View style={styles.SeparatorLine} />
      <Text style={styles.TextStyle} onPress={handleOAuthLogin}> Login with Google </Text>
    </TouchableOpacity>
  );
};

export const FacebookLoginButton = () => (<div>FB</div>);
