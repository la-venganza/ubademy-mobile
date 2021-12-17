import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import userService from '../services/userService';
import IUser from '../interfaces/IUser';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

interface Props {
  route: object;
}

const OtherProfileScreen = ({ route } : Props) => {
  const [user, setUser] = useState<IUser>({});
  const { id } = route.params;
  const isFocused = useIsFocused();

  const fetchUser = async () => {
    const userData = await userService.getUserById(id);
    if (userData) {
      setUser(userData);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [isFocused]);

  const userRole = (role) => {
    if (role) {
      return role;
    }
    return 'No role for user';
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: 'https://lh3.googleusercontent.com/a/AATXAJzmbRfP0iie6cg_7tNSQfxZroDeLDolmuoc8tzA=s96-c',
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title style={[styles.title, {
              marginTop: 15,
              marginBottom: 5,
            }]}
            >
              { user.first_name ? (
                <>
                  {user.first_name}
                  {' '}
                  {user.last_name}
                </>
              ) : (
                <>
                  Smart Student
                </>
              ) }

            </Title>
            <Caption style={styles.caption}>
              @
              {user.username}
            </Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="head" color="#777777" size={20} />
          <Text style={{ color: '#777777', marginLeft: 20 }}>{userRole(user.role)}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20} />
          <Text style={{ color: '#777777', marginLeft: 20 }}>{user.email}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtherProfileScreen;
