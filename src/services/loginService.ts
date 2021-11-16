import React, { useContext, userContext } from 'react';
import Constants from 'expo-constants';
import * as Google from 'expo-google-app-auth';
import * as AppAuth from 'expo-app-auth';
import {
  getAuth, GoogleAuthProvider, signInWithCredential,
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';
import * as GoogleAuthentication from '../actions/googleAuthentication';
import userService from './userService';

const loginWithGoogle = async (auth: AuthContext) => {
  const result = await GoogleAuthentication.signInWithGoogleAsync();
  const userName = result.user.givenName;
  const provider = new GoogleAuthProvider();
  const googleCredential = GoogleAuthProvider.credential(
    result.idToken,
    result.accessToken,
  );
  const authFb = getAuth();
  const firebaseCredential = await signInWithCredential(authFb, googleCredential);

  const jwt = firebaseCredential.user.stsTokenManager.accessToken;
  userService.setCookie(jwt);

  let backUser = null;
  backUser = userService.getUser(firebaseCredential.user.email);

  backUser.then((u: { results: string | any[]; }): void => {
    if (u.results.length === 0) {
      const userData = {
        username: result.user.name,
        first_name: result.user.givenName,
        last_name: 'mock',
        email: firebaseCredential.user.email,
      };
      console.log('User not found, registering user.');
      userService.registerUser(userData);
    }

    userService.getUser(firebaseCredential.user.email)
      .then((user: any) => {
        auth.setUserId(u.results[0].user_id);
        auth.setAuth(jwt, userName, firebaseCredential.user.email);
      })
      .catch((error: any) => {
        console.log(error);
      });
  });
};

const loginWithUserAndPassword = async (authCtx: AuthContext, email: string, password: string) => {
  const firebaseAuth = getAuth();
  signInWithEmailAndPassword(firebaseAuth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const { user } = userCredential;
      const idToken = await user.getIdToken();
      const jwt = idToken;
      const userName = user.displayName;
      authCtx.setAuth(jwt, userName, email);
      userService.setCookie(jwt);
      // Obtaining userId from back.
      userService.getUser(email).then((u) => {
        authCtx.setUserId(u.results[0].user_id);
      }).catch((error) => {
        console.log(error);
      });
    })
    .catch((error) => {
      alert(error);
      console.log(error);
    });
};

const registerUser = async (authCtx: AuthContext,
  email: string, password: string, userName: string) => {
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      updateProfile(auth.currentUser, {
        displayName: userName,
      }).then(() => {
        alert('Succesfully registered.');

        const user = {
          username: userName,
          email,
        };

        userService.setCookie(auth.currentUser.stsTokenManager.accessToken);
        console.log('Registering user...');
        userService.registerUser(user);
        navigation.navigate('Login');
        // Update successful.
      }, (error) => {
        console.log(error);
      });
    })
    .catch((error: Error) => {
      const authError = error as FirebaseError;
      const errorCode = authError.code;
      const errorMessage = authError.message;
      alert(errorMessage);
      console.log(errorCode);
      console.log(error);
    });
};

export default {
  loginWithGoogle, loginWithUserAndPassword, registerUser,
};
