import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { DdRumReactNavigationTracking } from '@datadog/mobile-react-navigation';
import HomeScreen from './src/views/home.tsx';
import LoginScreen from './src/views/login.tsx';
import { AuthContext, AuthProvider } from './src/context/AuthContext';
import DatadogClient from './src/utils/DatadogClient';

const Stack = createNativeStackNavigator();

const DatadogSetup = async (navigationRef: any) => {
  await DatadogClient();
  DdRumReactNavigationTracking.startTrackingViews(navigationRef.current);
};

export default () => {
  const navigationRef = React.useRef(null);

  return (
    <PaperProvider>
      <AuthProvider>
        <AuthContext.Consumer>
          { ({ auth }) => (
            <NavigationContainer ref={navigationRef} onReady={async () => await DatadogSetup(navigationRef)}>
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
};
