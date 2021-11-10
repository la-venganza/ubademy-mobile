import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureAxiosHeaders } from '../utils/httpClient';

// Create a context
const AuthContext = React.createContext({});
const defaultData = JSON.stringify({
  token: '', name: '', email: '',
});

const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState({
    token: '', name: '', email: '',
  });

  const [userId, setUserId] = useState('');

  // Get current auth state from AsyncStorage
  const getAuthState = async () => {
    try {
      const authDataString = await AsyncStorage.getItem('auth');
      const userIdData = await AsyncStorage.getItem('userId');
      const authData = JSON.parse(authDataString || defaultData);
      const userDataId = JSON.parse(userIdData || '');
      // Configure axios headers
      configureAxiosHeaders(authData.token);
      setAuthState({
        token: authData.token, name: authData.name, email: authData.email,
      });
      setUserId(userDataId);
    } catch (err) {
      setAuthState({
        token: '', name: '', email: '',
      });
    }
  };

  // Update AsyncStorage & context state
  const setAuth = async (token:string, name:string = '', email:string = '',) => {
    try {
      await AsyncStorage.setItem('auth', JSON.stringify({
        token, name, email, userId,
      }));
      // Configure axios headers
      configureAxiosHeaders(token);
      setAuthState({
        token, name, email,
      });
    } catch (error) {
      Promise.reject(error);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
