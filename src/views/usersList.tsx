import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView,
} from 'react-native';
import {
  Surface, Title, IconButton, Button,
} from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import UsersList from '../components/UsersList';
import userService from '../services/userService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: 30,
  },
  coursesWrapper: {
    marginTop: 24,
    width: '90%',
  },
  courseWrapperTitle: {
    fontSize: 18,
  },
  courseWrapperList: {
    marginTop: 18,
  },
  courseTitleWrapper: {
    flexDirection: 'row',
  },
  welcomeText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const HomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const auth = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      userService.setCookie(auth?.auth?.token);
      const results = await userService.getAll();
      if (results?.results?.length) {
        setUsers(results.results);
      }
    };
    fetchUsers();
  }, [isFocused]);

  const handleGoToUser = (id) => navigation.navigate('Profile', { screen: 'ProfileEdit', params: { id } });

  return (
    <ScrollView>
      <View style={styles.container}>
        <Surface style={styles.coursesWrapper}>
          <View style={styles.courseTitleWrapper}>
            <Title>Users</Title>
          </View>
          <View style={styles.courseWrapperList}>
            <UsersList users={users} handleGoToUser={handleGoToUser} />
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
};
export default HomeScreen;
