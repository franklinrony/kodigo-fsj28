import { User } from '../types';
import { API_BASE_URL } from '../main';
import axios from '../interceptor/httpInterceptor';

export const getUsers = async (): Promise<User[]> => {
  const res = await axios.get(`${API_BASE_URL}/api/V1/users`);
  return res.data;
}; 