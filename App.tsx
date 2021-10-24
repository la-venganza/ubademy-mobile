import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import HomeScreen from './src/views/home.tsx';
import LoginScreen from './src/views/login.tsx';
import RegistrationScreen from './src/views/registration';
import CourseCreationScreen from './src/views/courseCreation';
import { AuthContext, AuthProvider } from './src/context/AuthContext';
import Colors from './src/styles/colors';

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
                ? <Stack.Screen name="Home" component={HomeScreen} />
                : (
                  <>
                    <Stack.Screen name="Course" component={CourseCreationScreen} />
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
