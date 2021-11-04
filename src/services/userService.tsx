import IUser from '../interfaces/IUser';
import { instance } from '../utils/httpClient';

const formatUser = (firstName:string, lastName:string) => {
  const usr:IUser = {
    firstName,
    lastName,
  };

  return usr;
};

// Hardcodeado
const getUser = async (email) => {
  console.log('trying to get user');
  try {
    // hardcodeo mi user id
    const response = await instance.get('/user/1adbd719-9188-46d7-bca6-483b2ad8368d');
    console.log('recibo response');
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const registerUser = async (user) => {
  try {
    const response = await instance.post('/user', {
      firstName: 'Finn',
      lastName: 'Williams',
      age: 30,
      email: 'testtesttest@gmail.com',
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateUser = async (user) => {
  try {
    const response = await HTTPClient.put('/user', {
      firstName: 'Finn',
      lastName: 'Williams',
      age: 30,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default { getUser, updateUser, registerUser };
