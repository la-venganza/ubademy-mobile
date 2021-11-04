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

// Hardcodeado
const getUser = async (email) => {
  try {
    // hardcodeo mi user id
    const response = await instance.get('/user/1adbd719-9188-46d7-bca6-483b2ad8368d');
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const registerUser = async (user) => {
  try {
    const response = await instance.post('/user', {
      firstName: user.first_name,
      lastName: user.last_name,
      age: user.age,
      email: user.email,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateUser = async (user) => {
  try {
    const response = await instance.put('/user', {
      firstName: user.first_name,
      lastName: user.last_name,
      age: user.age,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  getUser, updateUser, registerUser, setCookie,
};
