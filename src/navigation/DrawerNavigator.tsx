import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../styles/colors';
import { MainStackNavigator, ProfileStackNavigator, CoursesStackNavigator } from './StackNavigator';

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
  </Drawer.Navigator>
);

export default DrawerNavigator;
