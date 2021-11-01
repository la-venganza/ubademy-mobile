import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Logo from '../components/Logo';
import { GoogleLoginButton } from '../components/LoginButton';
import LogOnButton from '../components/LogOnButton';

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

const LoginScreen = ({ navigation }) => {
  const [email, _setEmail] = useState('');
  const [password, _setPassword] = useState('');

  const setEmail = (name: string) => _setEmail(name);
  const setPassword = (text: string) => _setPassword(text);
  return (
    <View style={styles.wrapper}>
      <View style={styles.surface}>
        <Logo style={styles.image} />
        <Text>Welcome to Ubademy! Please log in</Text>
        <TextInput
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          label="Email"
        />
        <TextInput
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          label="Password"
          secureTextEntry
        />
        <View style={styles.buttonWrapper}>
          <LogOnButton email={email} password={password}>Log In</LogOnButton>
          <Button mode="text">Forgot password</Button>
          <Button mode="text" onPress={() => navigation.navigate('Registration')}>You don&apos;t have an account? Register now!</Button>
        </View>
        <View style={styles.row}>
          <GoogleLoginButton />
        </View>
      </View>
    </View>
  );
};
export default LoginScreen;
