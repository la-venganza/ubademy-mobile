import { instance } from '../utils/httpClient';

const getSubscription = async (userId: string) => {
  try {
    const response = await instance.get(`subscription/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateSubscription = async (userId, newPlan) => {
  try {
    const response = await instance.put(`subscription/${userId}`, { plan: newPlan });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default { getSubscription, updateSubscription };
