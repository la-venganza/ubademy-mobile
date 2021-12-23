import { instance } from '../utils/httpClient';

const sendRecoveryMetrics = async () => {
  try {
    instance.patch('/metrics/password-recovery');
  } catch (error) {
    console.log('error while sending metrics');
  }
};

export default { sendRecoveryMetrics };
