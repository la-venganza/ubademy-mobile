import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../views/home.tsx';
import ProfileScreen from '../views/profile.tsx';
import CourseCreationScreen from '../views/courseCreation';
import CourseViewScreen from '../views/courseView';
import ProfileEditScreen from '../views/profileEdit';
import ExamToCompleteScreen from '../views/exam/examToComplete';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

const ProfileStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const CoursesStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Course creation" component={CourseCreationScreen} initialParams={{ id: 0 }} options={{ headerShown: false }} />
    <Stack.Screen name="Course view" component={CourseViewScreen} initialParams={{ id: 0 }} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const ExamsToCompleteStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Exam" component={ExamToCompleteScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export {
  MainStackNavigator, ProfileStackNavigator,
  CoursesStackNavigator, ExamsToCompleteStackNavigator,
};
