import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureAxiosHeaders } from '../utils/httpClient';

// Create a context
const AuthContext = React.createContext({});
const defaultData = JSON.stringify({ token: '' });

const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState({ token: '' });

  // Get current auth state from AsyncStorage
  const getAuthState = async () => {
    try {
      const authDataString = await AsyncStorage.getItem('auth');
      const authData = JSON.parse(authDataString || defaultData);
      // Configure axios headers
      configureAxiosHeaders(authData.token);
      setAuthState({ token: authData.token });
    } catch (err) {
      setAuthState({ token: '' });
    }
  };

  // Update AsyncStorage & context state
  const setAuth = async (token:string) => {
    try {
      await AsyncStorage.setItem('auth', JSON.stringify({ token }));
      // Configure axios headers
      configureAxiosHeaders(token);
      setAuthState({ token });
    } catch (error) {
      Promise.reject(error);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
