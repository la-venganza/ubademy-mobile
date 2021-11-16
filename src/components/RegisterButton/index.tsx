import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import { AuthContext } from '../../context/AuthContext';
import ColorPalette from '../../styles/colors';
import loginService from '../../services/loginService';

interface Props {
  email: PropTypes.string,
  password: PropTypes.string,
  userName: PropTypes.string,
}

function RegisterButton({
  email, password, userName,
  hasErrorsCallback, navigationCallback,
}: Props) {
  const auth = useContext(AuthContext);

  const handleLogin = () => {
    if (!hasErrorsCallback()) {
      loginService.registerUser(auth, email, password, userName).then(() => {
        navigationCallback();
      });
    }
  };
  return (
    <Button onPress={handleLogin} mode="contained">Register</Button>
  );
}

export default RegisterButton;
