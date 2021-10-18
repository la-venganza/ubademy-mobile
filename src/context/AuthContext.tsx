import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureAxiosHeaders } from '../utils/httpClient';

// Create a context
const AuthContext = React.createContext({});
const defaultData = JSON.stringify({ token: '', name: '' });

const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState({ token: '', name: '' });

  // Get current auth state from AsyncStorage
  const getAuthState = async () => {
    try {
      const authDataString = await AsyncStorage.getItem('auth');
      // await AsyncStorage.setItem('auth', '');
      // console.log(authDataString);
      const authData = JSON.parse(authDataString || defaultData);
      // Configure axios headers
      configureAxiosHeaders(authData.token);
      setAuthState({ token: authData.token, name: authData.name });
    } catch (err) {
      setAuthState({ token: '', name: '' });
    }
  };

  // Update AsyncStorage & context state
  const setAuth = async (token:string, name:string = '') => {
    try {
      await AsyncStorage.setItem('auth', JSON.stringify({ token, name }));
      // Configure axios headers
      configureAxiosHeaders(token);
      setAuthState({ token, name });
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
