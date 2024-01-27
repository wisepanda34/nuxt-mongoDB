// http/index.js
import axios from "axios";
import { useAuth } from '~/store/auth';




// env: API_URL=http://localhost:5000/api
const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.API_URL
})


$api.interceptors.request.use(config => {
  if(localStorage.getItem('access_token')){
    
     config.headers.Authorization = `${localStorage.getItem('access_token')}`
  }
  console.log('interceptors.request has worked');
  
  return config
})


$api.interceptors.response.use(
  // response => response,
  config => config,
  async (error) => {
    console.log('Intercepting response:', error.response.status);
    const originalRequest = error.config;
    if (error.response?.status === 401 && !error.config._isRetry) {
      originalRequest._isRetry = true

      try {
        console.log('/api/refresh');
        const response = await axios.get(`/api/refresh`, { withCredentials: true });
        console.log('/api/refresh response :', response);
        
        localStorage.setItem('access_token', response.data.body.accessToken);
        console.log('newAccessToken:', response.data.body.accessToken);
        
        return $api.request(originalRequest);
      } catch (error) {
        console.log('User is unauthorized');
        // return Promise.reject(error)
      }
    } 
    // return Promise.reject(error);
    throw error
  }
);

export default $api