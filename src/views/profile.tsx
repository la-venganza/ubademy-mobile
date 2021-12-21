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
  const [currentPlan, setCurrentPlan] = useState('Free');
  const [availableMoney, setAvailableMoney] = useState(0);

  const auth = useContext(AuthContext);

  const fetchUser = async () => {
    const userData = await userService.getUser(auth.auth.email);
    if (userData) {
      setUser(userData);
    }
  };

  const getBalance = async () => {
    const balance = await walletService.getBalance(authContext.userId);
    setAvailableMoney(balance?.balance ?? 0);
    const subscription = await subscriptionService.getSubscription(authContext.userId);
    setCurrentPlan(subscription?.subscription?.title ?? 'Free');
  };

  useEffect(() => {
    fetchUser();
    getBalance();
  }, []);

  const userRole = (user) => {
    if (user.created_courses && user.created_courses.length > 0) {
      return 'Teacher';
    }
    return 'Student';
  };

  const handleGoToCourse = (id) => {
    navigation.navigate('Course view', { id });
  };

  const handleGoToCourseExams = (id) => {
    navigation.navigate('CourseExamsList', { id });
  };

  const handleGoToStudents = (id) => {
    navigation.navigate('CourseUsersList', { id });
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: 'https://www.shareicon.net/data/2016/08/18/814671_user_512x512.png',
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
          <Text style={{ color: '#777777', marginLeft: 20 }}>{userRole(user)}</Text>
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
        <TouchableRipple onPress={() => navigation.navigate('CreatedCoursesList', {
          courses: user.created_courses, handleGoToCourse,
        })}
        >
          <View style={styles.menuItem}>
            <Icon name="book-open-variant" color={Colors.secondary} size={25} />
            <Text style={styles.menuItemText}>Your courses</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate('CreatedCoursesList', {
          courses: user.created_courses, handleGoToCourse: handleGoToCourseExams,
        })}
        >
          <View style={styles.menuItem}>
            <Icon name="book-open-variant" color={Colors.secondary} size={25} />
            <Text style={styles.menuItemText}>Your exams by course</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate('CreatedCoursesList', {
          courses: user.created_courses, handleGoToCourse: handleGoToStudents,
        })}
        >
          <View style={styles.menuItem}>
            <Icon name="account-box-multiple" color={Colors.secondary} size={25} />
            <Text style={styles.menuItemText}>Your students by course</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate('ProfileEdit', {
          user, onGoBack: () => fetchUser(),
        })}
        >
          <View style={styles.menuItem}>
            <Icon name="account-edit-outline" color={Colors.secondary} size={25} />
            <Text style={styles.menuItemText}>Edit profile</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate('Subscription')}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color={Colors.secondary} size={25} />
            <Text style={styles.menuItemText}>Subscription</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
