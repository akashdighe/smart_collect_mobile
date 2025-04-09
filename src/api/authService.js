import apiClient from './apiClient';
import {storeData, removeData, getData} from '../utils/storage';

// ✅ Login Function (Using Dummy API)
export const login = async credentials => {
  try {
    const response = await apiClient.post('/login', credentials); // Reqres login API
    const {token} = response.data; // Reqres returns a token

    await storeData('token', token);
    await storeData('user', {email: credentials.email}); // Dummy user data

    return {token, user: {email: credentials.email}};
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Login failed');
  }
};

// ✅ Logout Function
export const logout = async () => {
  await removeData('token');
  await removeData('user');
};

// ✅ Get User Session
export const getUserSession = async () => {
  const token = await getData('token');
  const user = await getData('user');
  return token ? {token, user} : null;
};
