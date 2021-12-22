import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, StyleSheet, DatePickerIOSBase } from 'react-native';
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
import walletService from '../services/walletService';
import subscriptionService from '../services/subscriptionService';
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
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState<IUser>({});
  const [currentPlan, setCurrentPlan] = useState('free');
  const [availableMoney, setAvailableMoney] = useState(0);

  const auth = useContext(AuthContext);

  const fetchUser = async () => {
    const userData = await userService.getUser(auth.auth.email);
    console.log(userData);
    if (userData) {
      setUser(userData);
    }
  };

  const getBalance = async () => {
    const balance = await walletService.getBalance(authContext.userId);
    setAvailableMoney(balance?.balance ?? 0);
    const subscription = await subscriptionService.getSubscription(authContext.userId);
    setCurrentPlan(subscription?.results[0].subscription?.title ?? 'Free');
  };    

  useEffect(() => {
    fetchUser();
    getBalance();
  }, [authContext.updateData]);

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

      <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox, {
          borderRightColor: '#dddddd',
          borderRightWidth: 1,
        }]}
        >
          <Title>{parseFloat(`${availableMoney}`).toFixed(4)}ETH</Title>
          <Caption>Wallet</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>{currentPlan}</Title>
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
        <TouchableRipple onPress={() => navigation.navigate('Subscription')}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color={Colors.secondary} size={25} />
            <Text style={styles.menuItemText}>Subscription</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate('Extract')}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color={Colors.secondary} size={25} />
            <Text style={styles.menuItemText}>Extract as Teacher</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
