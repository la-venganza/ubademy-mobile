import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import LogoutButton from '../components/LogoutButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    marginTop: 30,
  },
});

const HomeScreen = () => {
  const auth = useContext(AuthContext);
  console.log('auth:', auth);
  console.log('prov', AuthProvider);
  return (
    <View style={styles.container}>
      <Text>
        Hello
        {' '}
        {auth.auth.name}
        . Welcome to Ubademy!
      </Text>
      <View style={styles.logoutButton}>
        <LogoutButton />
      </View>
    </View>
  );
};
export default HomeScreen;
