import IUser from '../interfaces/IUser';
import { instance, configureAxiosHeaders } from '../utils/httpClient';

const formatUser = (firstName:string, lastName:string) => {
  const usr:IUser = {
    first_name,
    last_name,
  };

  return usr;
};

const setCookie = async (token) => {
  configureAxiosHeaders(token);
};

const getUser = async (email) => {
  try {
    console.log('Trying to fetch user form back');

    const response = await instance.get(`/user/login/${email}`);
    return response.data;
  } catch (error) {
    console.log('Exception rised when trying to fetch user from back.');
    console.log(error.response.data);
    console.log('Returning null');
    return null;
  }
};

const registerUser = async (user) => {
  console.log('Registering user...');
  console.log(user);
  try {
    const response = await instance.post('/user', {
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
      email: user.email,
    });

    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return null;
  }
};

const updateUser = async (user) => {
  try {
    const response = await instance.put(`/user/${user.user_id}`, {
      first_name: user.first_name,
      last_name: user.last_name,
      birth_date: user.birth_date,
    });

    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return null;
  }
};

export default {
  getUser, updateUser, registerUser, setCookie,
};
