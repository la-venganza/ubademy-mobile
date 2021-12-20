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

export default { getBalance };
