import axios from 'axios';
import {Alert} from 'react-native';
import {getData, removeData} from '../utils/storage';

const API_BASE_URL = 'https://reqres.in/api'; // ✅ Dummy API for testing

// ✅ Token cache for better performance
let authToken = null;

// ✅ Create Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {'Content-Type': 'application/json'},
});

// ✅ Attach token automatically
apiClient.interceptors.request.use(
  async config => {
    if (!authToken) {
      authToken = await getData('token'); // Fetch only once
    }
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// ✅ Handle Unauthorized Responses (401) and Auto Logout
apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      await handleSessionExpiry();
    }
    return Promise.reject(error);
  },
);

// ✅ Auto Logout on Session Expiry
const handleSessionExpiry = async () => {
  authToken = null;
  await removeData('token');
  Alert.alert(
    'Session Expired',
    'Your session has expired. Please login again.',
    [{text: 'OK'}],
  );
};

export default apiClient;
