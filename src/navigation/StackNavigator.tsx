import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../views/home.tsx';
import ProfileScreen from '../views/profile.tsx';
import CourseCreationScreen from '../views/courseCreation';
import CourseViewScreen from '../views/courseView';
import CourseEnrollScreen from '../views/courseEnroll';
import PlanSelectionScreen from '../views/planSelection';
import ProfileEditScreen from '../views/profileEdit';
import ExamToCompleteScreen from '../views/exam/examToComplete';
import ExamEditScreen from '../views/exam/examEdit';
import ExamsToCorrectListScreen from '../views/exam/examsToCorrectList';
import ExamToCorrectScreen from '../views/exam/examToCorrect';
import OtherUserProfileScreen from '../views/userProfileView';
import CreatedCoursesListScreen from '../views/createdCoursesList';
import CourseExamsListScreen from '../views/exam/courseExamsList';
import CourseUserListScreen from '../views/courseUsersList';

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Subscription" component={PlanSelectionScreen} options={{ headerShown: false }} />
    <Stack.Screen name="OtherProfile" component={OtherUserProfileScreen} initialParams={{ id: 0 }} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const CoursesStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Course creation" component={CourseCreationScreen} initialParams={{ id: 0 }} options={{ headerShown: false }} />
    <Stack.Screen name="Course view" component={CourseViewScreen} initialParams={{ id: 0 }} options={{ headerShown: false }} />
    <Stack.Screen name="CourseExamEdit" component={ExamEditScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Course Enroll" component={CourseEnrollScreen} initialParams={{ id: 0 }} options={{ headerShown: false }} />
    <Stack.Screen name="CourseExamToComplete" component={ExamToCompleteScreen} options={{ headerShown: false }} />
    <Stack.Screen name="CourseExamToCorrect" component={ExamToCorrectScreen} initialParams={{ id: 0 }} options={{ headerShown: false }} />
    <Stack.Screen name="CreatedCoursesList" component={CreatedCoursesListScreen} initialParams={{ id: 0 }} options={{ headerShown: false }} />
    <Stack.Screen name="CourseExamsList" component={CourseExamsListScreen} initialParams={{ id: 0 }} options={{ headerShown: false }} />
    <Stack.Screen name="CourseUsersList" component={CourseUserListScreen} initialParams={{ id: 0 }} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const ExamsToCorrectStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="ExamsToCorrectList" component={ExamsToCorrectListScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ExamToCorrect" component={ExamToCorrectScreen} initialParams={{ id: 0 }} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export {
  ProfileStackNavigator,
  CoursesStackNavigator, ExamsToCorrectStackNavigator,
};
