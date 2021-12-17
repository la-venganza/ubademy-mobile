import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../styles/colors';
import {
  MainStackNavigator, ProfileStackNavigator, CoursesStackNavigator, ExamsToCorrectStackNavigator,
} from './StackNavigator';
import ExamEditScreen from '../views/exam/examEdit';
import ExamToCorrectScreen from '../views/exam/examToCorrect';
import ExamsToCorrectListScreen from '../views/exam/examsToCorrectList';
import UsersList from '../views/usersList';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen
      name="Home"
      component={MainStackNavigator}
      options={{
        title: 'Home',
        drawerIcon: ({ focused, size }) => (
          <Icon name="home" color={Colors.primary} size={25} />
        ),
      }}
    />
    <Drawer.Screen
      name="Profile"
      component={ProfileStackNavigator}
      options={{
        title: 'Profile',
        drawerIcon: ({ focused, size }) => (
          <Icon name="face" color={Colors.primary} size={25} />
        ),
      }}
    />
    <Drawer.Screen
      name="Courses"
      component={CoursesStackNavigator}
      options={{
        title: 'Courses',
        drawerIcon: ({ focused, size }) => (
          <Icon name="book" color={Colors.primary} size={25} />
        ),
      }}
    />
    <Drawer.Screen
      name="Users"
      component={UsersList}
      options={{
        title: 'Users',
        drawerIcon: ({ focused, size }) => (
          <Icon name="account-group" color={Colors.primary} size={25} />
        ),
      }}
    />
  <Drawer.Screen
      name="Exams to correct"
      component={ExamsToCorrectStackNavigator}
      options={{
        title: 'Exams to correct',
        drawerIcon: ({ focused, size }) => (
          <Icon name="book" color={Colors.primary} size={25} />
          ),
      }}
      />
  </Drawer.Navigator>
);

export default DrawerNavigator;
