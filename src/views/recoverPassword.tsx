import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Logo from '../components/Logo';
import { GoogleLoginButton } from '../components/LoginButton';
import LogOnButton from '../components/LogOnButton';
import loginService from '../services/loginService';
import metricsService from '../services/metricsService';

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

const RecoverPasswordScreen = ({ navigation }) => {
  const [email, _setEmail] = useState('');

  const handleRecoverPassword = (myEmail) => {
    loginService.recoverPassword(myEmail, () => {
      metricsService.sendRecoveryMetrics();
      navigation.navigate('Login');
    });
  };

  const setEmail = (name: string) => _setEmail(name);

  return (
    <View style={styles.wrapper}>
      <View style={styles.surface}>
        <Logo style={styles.image} />
        <Text>
          Enter your username or e-mail address and we'll
          send you an email to reset your password

        </Text>

        <TextInput
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          label="Email"
        />
        <View style={styles.buttonWrapper}>
          <Button mode="text" onPress={() => handleRecoverPassword(email)}>Submit</Button>
          <Button mode="text" onPress={() => navigation.navigate('Login')}>Cancel</Button>
        </View>
      </View>
    </View>
  );
};
export default RecoverPasswordScreen;
