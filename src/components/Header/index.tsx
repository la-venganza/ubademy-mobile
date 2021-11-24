import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import LogoutButton from '../LogoutButton';

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});

const MyComponent = ({ userName, navigation }) => (
  <Appbar.Header style={styles.text}>
    <Appbar.Content title="Ubademy" subtitle={`Welcome, ${userName}`} color="white" />
    <Button color="white" onPress={() => navigation.navigate('Profile')}>My profile</Button>
    <LogoutButton />
  </Appbar.Header>
);

export default MyComponent;
