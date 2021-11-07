import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button, Text, TextInput, HelperText,
} from 'react-native-paper';
import Logo from '../components/Logo';
import IUser from '../interfaces/IUser';
import userService from '../services/userService';

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

interface Props {
  route: {params:{user: IUser}};
  navigation: object;
}

const ProfileEditScreen = ({ navigation, route } : Props) => {
  const user = route !== undefined && route.params;
  const errorMessagesInitial : string[] = [];
  const [firstName, _setFirstName] = useState('');
  const [lastName, _setLastName] = useState('');

  const [errorMsgs, _setErrors] = useState(errorMessagesInitial);

  const setFirstName = (name: string) => _setFirstName(name);
  const setLastName = (text: string) => _setLastName(text);

  const setErrorList = (errors: string[]) => _setErrors(errors);

  useEffect(() => {
    console.log(user.user.first_name);
    setFirstName(user.user.first_name);
    setLastName(user.user.last_name);
  }, []);

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
      const updatedUser: IUser = {
        first_name: firstName,
        last_name: lastName,
        email: user.user.email,
        role: user.user.role,
        is_admin: user.user.is_admin,
        user_id: user.user.user_id,
        blocked: user.user.blocked,
      };

      userService.updateUser(updatedUser);

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
        />
        <TextInput
          mode="outlined"
          value={user.user.email}
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
