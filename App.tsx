import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, DefaultTheme, ActivityIndicator } from 'react-native-paper';
import Constants from 'expo-constants';
import * as firebase from 'firebase/app';
import HomeScreen from './src/views/home.tsx';
import LoginScreen from './src/views/login.tsx';
import ProfileScreen from './src/views/profile.tsx';
import RegistrationScreen from './src/views/registration';
import CourseCreationScreen from './src/views/courseCreation';
import CourseViewScreen from './src/views/courseView';
import { AuthContext, AuthProvider } from './src/context/AuthContext';
import { LoadingContext, LoadingProvider } from './src/context/LoadingContext';
import Colors from './src/styles/colors';
import ProfileEditScreen from './src/views/profileEdit';
import LoadingScreen from './src/views/loading';
import DrawerNavigator from './src/navigation/DrawerNavigator';

const firebaseConfig = {
  apiKey: Constants.manifest.extra.FIREBASE_API_KEY,
  authDomain: Constants.manifest.extra.FIREBASE_AUTH_DOMAIN,
  projectId: Constants.manifest.extra.FIREBASE_PROJECT_ID,
  storageBucket: Constants.manifest.extra.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.manifest.extra.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.manifest.extra.FIREBASE_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    accent: Colors.secondary,
  },
};

const Stack = createNativeStackNavigator();

export default () => (
  <PaperProvider theme={theme}>
    <AuthProvider>
      <LoadingProvider>
        <AuthContext.Consumer>
          { ({ auth }) => (
            <NavigationContainer>

              { (() => {
                if (auth.token) {
                  return (
                    <>
                      <DrawerNavigator />
                    </>
                  );
                }
                if (!auth.loading) {
                  return (
                    <>
                      <Stack.Navigator>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Registration" component={RegistrationScreen} />
                      </Stack.Navigator>
                    </>
                  );
                }
                return (
                  <>
                    <Stack.Navigator>
                      <Stack.Screen name="Loading" component={LoadingScreen} />
                    </Stack.Navigator>
                  </>
                );
              })()}
            </NavigationContainer>
          )}
        </AuthContext.Consumer>
      </LoadingProvider>
    </AuthProvider>
  </PaperProvider>
);
