import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureAxiosHeaders } from '../utils/httpClient';

// Create a context
const AuthContext = React.createContext({});
const defaultData = JSON.stringify({
  token: '', name: '', email: '', loading: false,
});

const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState({
    token: '', name: '', email: '', loading: false, plan: '', courses: [],
  });

  const [userId, setUserId] = useState('');
  const [subscription, setSubscription] = useState(null);
  const [updateData, setUpdateData] = useState(0);
  const [plans, setPlans] = useState(['Free'])

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
        token: authData.token,
        name: authData.name,
        email: authData.email,
        loading: authData.loading,
        courses: authData.courses,
      });
      setUserId(userDataId);
    } catch (err) {
      setAuthState({
        token: '', name: '', email: '', loading: false, courses: [],
      });
    }
  };

  // Update AsyncStorage & context state
  const setAuth = async (token:string, name:string = '', email:string = '', loading:boolean = false, courses:Array = []) => {
    try {
      const activeCourses = courses.filter((course) => course.active);
      await AsyncStorage.setItem('auth', JSON.stringify({
        token, name, email, userId, loading, activeCourses,
      }));
      // Configure axios headers
      configureAxiosHeaders(token);
      setAuthState({
        token, name, email, loading, courses: activeCourses,
      });
    } catch (error) {
      Promise.reject(error);
    }
  };

  const setCourses = async (enrolledCourses) => {
    setAuthState({ ...auth, courses: enrolledCourses });
  };

  const setAllPlans = async (plans) => {
    setPlans(plans)
  };

  const update = async () => {
    setUpdateData(updateData+1)
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{
      auth, setAuth, userId, setUserId, setCourses, subscription, setSubscription, updateData, update, plans, setAllPlans
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
