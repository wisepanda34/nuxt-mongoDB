// http/index.js
import  {useAuth}  from "~/store/auth";
import axios from "axios";


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
  (config) => config,
  async (error) => {
    console.log('Intercepting response:', error.response.status);
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest.isRetry) {
      originalRequest.isRetry = true

      try {
        console.log('api/refresh');
        const response = await axios.get(`api/refresh`, { withCredentials: true });
        localStorage.setItem('access_token', response.data.accessToken);
        return $api.request(originalRequest);
      } catch (error) {
        console.log('User is unauthorized');
        return Promise.reject(error)
      }
    } 
    return Promise.reject(error);
  }
);

export default $api