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

const updateSubscription = async (userId:string, newPlan:string) => {
  try {
    const now = new Date();
    const endDate = new Date(now.setMonth(now.getMonth() + 1));
    const endDateFormatted = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
    const response = await instance.post(`subscription/${userId}`, { subscription: newPlan.toLowerCase(), end_date: endDateFormatted });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default { getSubscription, updateSubscription };
