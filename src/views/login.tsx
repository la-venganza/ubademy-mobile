import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Logo from '../components/Logo';
import { GoogleLoginButton } from '../components/LoginButton';

const styles = StyleSheet.create({
  surface: {
    flex: 1,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
    width: '100%',
  },
  image: {
    alignSelf: 'center',
  },
  buttonWrapper: {
    marginTop: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const LoginScreen = () => {
  const [userName, _setUserName] = useState('');
  const [password, _setPassword] = useState('');

  const setUserName = (name: string) => _setUserName(name);
  const setPassword = (text: string) => _setPassword(text);
  return (
    <View style={styles.wrapper}>
      <View style={styles.surface}>
        <Logo style={styles.image} />
        <Text>Welcome to Ubademy! Please log in</Text>
        <TextInput
          mode="outlined"
          value={userName}
          onChangeText={setUserName}
          label="Username"
        />
        <TextInput
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          label="Password"
          secureTextEntry
        />
        <View style={styles.buttonWrapper}>
          <Button mode="contained">Log In</Button>
          <Button mode="text">Forgot password</Button>
        </View>
        <View style={styles.row}>
          <GoogleLoginButton />
        </View>
      </View>
    </View>
  );
};
export default LoginScreen;
