import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Surface, Text,
} from 'react-native-paper';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  surface: {
    backgroundColor: colors.gray,
    width: '100%',
    padding: 12,
  },
  course: {
    padding: 24,
    backgroundColor: colors.white,
    marginTop: 12,
  },
});

const UsersList = ({ users = [], handleGoToUser }) => (
  <Surface style={styles.surface}>
    {users && users.map((user) => (
      <TouchableOpacity style={styles.course} key={user.id} onPress={() => handleGoToUser(user.user_id)}>
        <Text>{user.username}</Text>
      </TouchableOpacity>
    ))}
  </Surface>
);

export default UsersList;
