import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Logo from '../components/Logo';

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

const LoadingScreen = () => (
  <View style={styles.wrapper}>
    <View style={styles.surface}>
      <View style={styles.row}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    </View>
  </View>
);
export default LoadingScreen;
