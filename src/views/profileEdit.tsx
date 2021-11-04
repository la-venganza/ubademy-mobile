import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button, Text, TextInput, HelperText,
} from 'react-native-paper';
import {
  getAuth, createUserWithEmailAndPassword, FirebaseError, updateProfile,
} from 'firebase/auth';
import axios from 'axios';
import Logo from '../components/Logo';
import { GoogleLoginButton } from '../components/LoginButton';
import { instance, configureAxiosHeaders } from '../utils/httpClient';

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

const ProfileEditScreen = ({ navigation }) => {
  const errorMessagesInitial : string[] = [];
  const [firstName, _setFirstName] = useState('');
  const [lastName, _setLastName] = useState('');
  const [age, _setAge] = useState('');

  const [errorMsgs, _setErrors] = useState(errorMessagesInitial);

  const setFirstName = (name: string) => _setFirstName(name);
  const setLastName = (text: string) => _setLastName(text);
  const setAge = (text: string) => _setAge(text);

  const setErrorList = (errors: string[]) => _setErrors(errors);

  const validate = () => {
    let errorList : string[] = [];

    if (!firstName) {
      errorList = errorList.concat(['User name empty.']);
    }

    if (!lastName) {
      errorList = errorList.concat(['Last name empty.']);
    }

    return (errorList);
  };

  const handleEdit = async () => {
    const errors = validate();
    setErrorList(errors);

    if (errors.length === 0) {
      // pegada a users

      navigation.navigate('Profile');
    }
  };

  const hasErrors = () => errorMsgs.length;

  return (
    <View style={styles.wrapper}>
      <View style={styles.surface}>
        <Logo style={styles.image} />
        <Text>Edit profile info</Text>
        <TextInput
          mode="outlined"
          value={firstName}
          onChangeText={setFirstName}
          label="First name"
        />
        <TextInput
          mode="outlined"
          value={lastName}
          onChangeText={setLastName}
          label="Last name"
          secureTextEntry
        />
        <TextInput
          mode="outlined"
          value={age}
          onChangeText={setAge}
          label="Age"
          secureTextEntry
        />
        <TextInput
          mode="outlined"
          value="luciana@gmail.com"
          label="Email"
          keyboardType="email-address"
          textContentType="emailAddress"
          editable={false}
          selectTextOnFocus={false}
        />
        <View style={styles.buttonWrapper}>
          <Button onPress={handleEdit} mode="contained">Save</Button>
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

export default ProfileEditScreen;
