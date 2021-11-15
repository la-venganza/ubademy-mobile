import React, { useContext } from 'react';
import {
  TouchableOpacity, Image, View, Text, StyleSheet,
} from 'react-native';
import GoogleLogo from '../../assets/images/google-logo.png';
import ColorPalette from '../../styles/colors';
import { AuthContext } from '../../context/AuthContext';
import loginService from '../../services/loginService';

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

  const handleOAuthLogin = async () => {
    try {
      loginService.loginWithGoogle(auth);
    } catch (err) {
      console.log('ERROR:', err);
    }
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
