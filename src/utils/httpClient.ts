import Axios from 'axios';
import Constants from 'expo-constants';

export const instance = Axios.create({
  baseURL: `${Constants.manifest.extra.REACT_APP_BACKEND_URL}/`,
  withCredentials: true,
});

export const configureAxiosHeaders = (token:string) => {
  instance.defaults.headers['X-Auth-Token'] = token;
  instance.defaults.headers.Cookie = `firebaseAuth=${token}`;
};

instance.interceptors.request.use((request) => {
  console.log('Starting Request', JSON.stringify(request, null, 2));
  return request;
});

instance.interceptors.response.use((response) => {
  console.log('Response:', JSON.stringify(response, null, 2));
  return response;
});
