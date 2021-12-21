import { instance, configureAxiosHeaders } from '../utils/httpClient';

const getBalance = async (userId: string) => {
  try {
    const response = await instance.get(`wallet/balance/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getTeacherBalance = async (userId: string) => {
  try {
    const response = await instance.get(`wallet/teacherBalance/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const teacherWithdraw = async (userId: string, address: string) => {
  try {
    const response = await instance.post(`wallet/teacherWithdraw/${userId}`, { recieverAddress: address });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};


const getWallet = async (userId: string) => {
  try {
    const response = await instance.get(`wallet/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default { getBalance, getWallet, getTeacherBalance, teacherWithdraw };
