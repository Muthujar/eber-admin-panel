import axios from 'axios';

// API Base URL
// const API_URL = 'https://api.eber.co/v3/public';
const API_URL = 'http://localhost:4000/api';

const apiKey = process.env.REACT_APP_API_KEY+':'
// console.log(process.env)


// Axios instance with basic auth
const apiClient = axios.create({
  baseURL: API_URL,

});

// Axios interceptor to add Basic Auth token to every request
apiClient.interceptors.request.use((config) => {
    // console.log(process.env.REACT_APP_API_KEY)
//   const token = localStorage.getItem('authToken'); // Get token from localStorage

console.log(apiKey)
//   if (apiKey) {
//     const encodedToken = btoa(apiKey); // Encode to Base64

//     config.headers.Authorization=`Basic ${encodedToken}`
// }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;