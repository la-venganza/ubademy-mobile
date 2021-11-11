import React, { useContext } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';
import ColorPalette from '../../styles/colors';

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

function LogoutButton() {
  const auth = useContext(AuthContext);
  const logout = () => auth.setAuth('', '', '');
  return (
    <Button mode="contained" onPress={logout}>
      <Text style={styles.TextStyle}>Log me out!</Text>
    </Button>
  );
}
export default LogoutButton;
