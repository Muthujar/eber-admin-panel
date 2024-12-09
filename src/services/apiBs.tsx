import axios from 'axios';
// import Env from './Env';
import { message } from 'antd';
import { deleteCookie, getCookie } from "../services/utils";

// Create an Axios instance with default configurations
const api = axios.create({
 baseURL: 'https://mydemov2.beautecloud.com/be/api',
//  baseURL: 'http://103.253.15.184:8003/be/api',

   // Replace with your base URL
//   timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
    'referrer': "no-referrer",

  },
});

// Add a request interceptor (e.g., for attaching tokens)
api.interceptors.request.use(
  (config) => {
    // Add Authorization token to headers if available
    const token = getCookie('Token'); // Example token storage
    if (token) {
      console.log(token,'token')
      config.headers['Authorization'] = `token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle global responses
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Global error handling
    if (error.response) {
      console.error('Error response:', error.response.data.error);
      // message.error(error.response.data.message)
      if (error.response.status === 401) {
        message.error(error.response)
        // Unauthorized, handle token expiration
        deleteCookie('Token'); // Example of token removal
        
        if (!getCookie('Token')) {
            window.location.href = '/login';
          }      }
    } else if (error.request) {
            message.error('Could not connect to the server. Please try again later')

      console.error('No response received:', error.request);
    } else {
    
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

// Define the API service functions
const apiBs = {
  get: (url:any, params = {}) => api.get(url,  params ),
  post: (url:any, data:any) => api.post(url, data),
  put: (url:any, data:any) => api.put(url, data),
  patch: (url:any, data:any) => api.patch(url, data),
  delete: (url:any) => api.delete(url),
};

export default apiBs;