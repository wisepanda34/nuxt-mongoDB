// http/index.js
import axios from "axios";
import { useUserExit } from '#imports'


// env: API_URL=http://localhost:5000/api
const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.API_URL
})


$api.interceptors.request.use(config => {
  if(localStorage.getItem('access_token')){
     config.headers.Authorization = `${localStorage.getItem('access_token')}`
  }
  return config
})


$api.interceptors.response.use(
  // response => response,
  config => config,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !error.config._isRetry) {
      originalRequest._isRetry = true

      try {
        const response = await axios.get(`/api/refresh`, { withCredentials: true });
        
        localStorage.setItem('access_token', response.data.body.accessToken);
        
        return $api.request(originalRequest);
      } catch (error) {
        console.log('User is unauthorized');
        useUserExit()
        return Promise.reject(error)
      }
    } 
    throw error
  }
);

export default $api