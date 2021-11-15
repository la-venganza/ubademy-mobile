import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import { AuthContext } from '../../context/AuthContext';
import ColorPalette from '../../styles/colors';
import loginService from '../../services/loginService';

const styles = StyleSheet.create({
  Button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ColorPalette.primary,
    borderWidth: 0.5,
    borderColor: ColorPalette.gray,
    height: 40,
    borderRadius: 5,
    margin: 5,
    padding: 10,
    alignSelf: 'center',
  },
  TextStyle: {
    color: ColorPalette.white,
    fontWeight: 'bold',
  },
});

interface Props {
  email: PropTypes.string,
  password: PropTypes.string,
}

function LogOnButton({ email, password }: Props) {
  const authCtx = useContext(AuthContext);

  const logon = () => {
    loginService.loginWithUserAndPassword(authCtx, email, password);
  };
  return (
    <Button mode="contained" onPress={logon}>
      <Text style={styles.TextStyle}>LOG IN</Text>
    </Button>
  );
}

export default LogOnButton;
