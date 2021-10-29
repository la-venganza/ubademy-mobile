import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import HomeScreen from './src/views/home.tsx';
import LoginScreen from './src/views/login.tsx';
import RegistrationScreen from './src/views/registration';
import CourseCreationScreen from './src/views/courseCreation';
import CourseViewScreen from './src/views/courseView';
import { AuthContext, AuthProvider } from './src/context/AuthContext';
import Colors from './src/styles/colors';
import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: Constants.manifest.extra.FIREBASE_API_KEY,
  authDomain: Constants.manifest.extra.FIREBASE_AUTH_DOMAIN,
  projectId: Constants.manifest.extra.FIREBASE_PROJECT_ID,
  storageBucket: Constants.manifest.extra.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.manifest.extra.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.manifest.extra.FIREBASE_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);
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
      <AuthContext.Consumer>
        { ({ auth }) => (
          <NavigationContainer>
            {console.log(auth)}
            <Stack.Navigator>
              { auth.token
                ? (
                  <>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Course creation" component={CourseCreationScreen} initialParams={{ id: 0 }} />
                    <Stack.Screen name="Course view" component={CourseViewScreen} initialParams={{ id: 0 }} />
                  </>
                )
                : (
                  <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Registration" component={RegistrationScreen} />
                  </>
                )}
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  </PaperProvider>
);
