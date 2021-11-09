import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../styles/colors';
import userService from '../services/userService';
import IUser from '../interfaces/IUser';
import { AuthContext } from '../context/AuthContext';

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
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});

interface Props {
  navigation: object;
}

const ProfileScreen = ({ navigation } : Props) => {
  const [user, setUser] = useState<IUser>({});

  const auth = useContext(AuthContext);

  const fetchUser = async () => {
    const userData = await userService.getUser(auth.auth.email);
    if (userData.results[0]) {
      setUser(userData.results[0]);
    }
  };

  useEffect(() => {
    console.log('called');
    fetchUser();
  }, []);

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
              {user.first_name}
              {' '}
              {user.last_name}

            </Title>
            <Caption style={styles.caption}>
              @
              {user.first_name}
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

      <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox, {
          borderRightColor: '#dddddd',
          borderRightWidth: 1,
        }]}
        >
          <Title>$0.0</Title>
          <Caption>Wallet</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>{user.subscription}</Title>
          <Caption>Subscription</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="book-open-variant" color={Colors.secondary} size={25} />
            <Text style={styles.menuItemText}>Your Courses</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color={Colors.secondary} size={25} />
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate('ProfileEdit', {
          user, onGoBack: () => fetchUser(),
        })}
        >
          <View style={styles.menuItem}>
            <Icon name="account-edit-outline" color={Colors.secondary} size={25} />
            <Text style={styles.menuItemText}>Edit</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color={Colors.secondary} size={25} />
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
