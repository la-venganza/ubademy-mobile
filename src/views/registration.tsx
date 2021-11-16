import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button, Text, TextInput, HelperText,
} from 'react-native-paper';
import {
  getAuth, createUserWithEmailAndPassword, FirebaseError, updateProfile,
} from 'firebase/auth';
import Logo from '../components/Logo';
import userService from '../services/userService';
import RegisterButton from '../components/RegisterButton';

const styles = StyleSheet.create({
  surface: {
    flex: 1,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
  },
  wrapper: {
    flex: 1,
    width: '100%',
  },
  buttonWrapper: {
    marginTop: 25,
  },

});

const RegistrationScreen = ({ navigation }) => {
  const errorMessagesInitial : string[] = [];
  const [userName, _setUserName] = useState('');
  const [password, _setPassword] = useState('');
  const [passwordConfirm, _setPasswordConfirm] = useState('');
  const [email, _setEmail] = useState('');
  const [errorMsgs, _setErrors] = useState(errorMessagesInitial);

  const setUserName = (name: string) => _setUserName(name);
  const setPassword = (text: string) => _setPassword(text);
  const setPasswordConfirm = (text: string) => _setPasswordConfirm(text);
  const setEmail = (text:string) => _setEmail(text);
  const setErrorList = (errors: string[]) => _setErrors(errors);

  const validate = () => {
    let errorList : string[] = [];

    if (!userName) {
      errorList = errorList.concat(['User name empty.']);
    }

    if (!password) {
      errorList = errorList.concat(['Password empty.']);
    }

    if (!email) {
      errorList = errorList.concat(['Email empty.']);
    }

    if (!(password === passwordConfirm)) {
      errorList = errorList.concat(['Passwords should match.']);
    }

    return (errorList);
  };

  const isAnyErrorInFields = () => {
    const errors = validate();
    setErrorList(errors);

    if (errors && errors.length === 0) {
      return false;
    }

    return true;
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const hasErrors = () => errorMsgs.length;

  return (
    <View style={styles.wrapper}>
      <View style={styles.surface}>
        <Logo style={styles.image} />
        <Text>Registration</Text>
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
        <TextInput
          mode="outlined"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          label="Confirm password"
          secureTextEntry
        />
        <TextInput
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          label="Email"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <View style={styles.buttonWrapper}>
          <RegisterButton
            email={email}
            password={password}
            userName={userName}
            hasErrorsCallback={isAnyErrorInFields}
            navigationCallback={navigateToLogin}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <HelperText type="error" visible={hasErrors()}>
            {errorMsgs.join('\r\n')}
          </HelperText>
        </View>
      </View>
    </View>
  );
};
export default RegistrationScreen;
