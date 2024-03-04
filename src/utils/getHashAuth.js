import md5 from 'md5';
import { BASE_PSW } from '@utils/constants';

const getHashAuth = () => {
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const token = `${BASE_PSW}_${timestamp}`;
  const hash = md5(token);
  return hash;
};

export default getHashAuth;
