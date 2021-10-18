import Axios from 'axios';
import Constants from 'expo-constants';

export const configureAxiosHeaders = (token:string) => {
  Axios.defaults.headers['X-Auth-Token'] = token;
};

export const instance = Axios.create({
  baseURL: `${Constants.manifest.extra.REACT_APP_BACKEND_URL}/`,
});
