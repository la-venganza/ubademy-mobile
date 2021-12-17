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
<<<<<<< HEAD

    const response = await instance.get(`/user/login/${email}`);
=======
    const response = await instance.get(`/user/login/${email}?properties=all`);
    return response.data;
  } catch (error) {
    console.log('Exception rised when trying to fetch user from back.');
    console.log(error.response.data);
    console.log('Returning null');
    return null;
  }
};

const getUserById = async (id) => {
  try {
    const response = await instance.get(`/user/${id}`);
>>>>>>> development
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

const getAll = async () => {
  try {
    const response = await instance.get('/user/all');
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
};

export default {
  getUser, updateUser, registerUser, setCookie, getAll, getUserById,
};
