import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './src/views/home.tsx';
import LoginScreen from './src/views/login.tsx';
import { AuthContext, AuthProvider } from './src/context/AuthContext';

const Stack = createNativeStackNavigator();

export default () => (
  <PaperProvider>
    <AuthProvider>
      <AuthContext.Consumer>
        { ({ auth }) => (
          <NavigationContainer>
            {console.log(auth)}
            <Stack.Navigator>
              { auth.token
                ? <Stack.Screen name="Home" component={HomeScreen} />
                : <Stack.Screen name="Login" component={LoginScreen} />}
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  </PaperProvider>
);
