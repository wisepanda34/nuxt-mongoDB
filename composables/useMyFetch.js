// composables/useMyFetch.js

import { useAuth } from '~/store/auth'

import axios from 'axios'

const useMyFetch = (route) => {
  console.log('useMyFetch started');
  

  const retryCount = ref(0)

  const axiosInstance = axios.create()

  axiosInstance.interceptors.request.use((config) => {
    console.log('interceptors.request');
    
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      config.headers.Authorization = accessToken
    }
    return config
  })

  axiosInstance.interceptors.response.use(
    (response) =>{
      console.log('Response:', response)
      return response
    }, 

    async (error) => {
      console.error('Error:', error)
      if (error.response.status === 401) {
        
        if (retryCount.value === 0) {
          retryCount.value++

          try {
            const refreshResponse =  await axiosInstance.get('/api/refresh')
            const newAccessToken = refreshResponse.data.accessToken
            localStorage.setItem('access_token', newAccessToken)
            axiosInstance.defaults.headers.common['Authorization'] = newAccessToken
            console.log('Token refreshed successfully. Retrying the original request...')
            return axiosInstance(route)

          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError)
            return Promise.reject(refreshError)

          } finally {
            retryCount.value--
          }
        }
      }
      return Promise.reject(error)
    }
  )
  return axiosInstance
}
export default useMyFetch



// const useMyFetch = (reqUrl) => {
//   // const authStore = useAuth()
//   console.log('useMyFetch start');
  

//   const _interceptor = async (url, options, error) => {
//     if (options.retry) {
//       if (error.statusCode === 401) {
//         // authStore.logout(),
//         console.log('logout');
//         navigateTo('/')
//         throw error
//       } 
//     }

//     if ( error.statusCode === 401 ) {
//       const data = await customFetch('/api/refresh', {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         retry: true
//       })

//       console.log('data.body.accessToke:', data.body.accessToken);
//       localStorage.setItem('access_token', data.body.accessToken);

//       return await customFetch(url, { ...options, retry: true })
//     }
//     throw error
//   }

//   const customFetch = async (url, options = {}) => {
//     console.log('customFetch start');
    
//     const url = reqUrl; 
//     const accessToken = localStorage.getItem('access_token')
//     const headers = {
//       'Authorization': accessToken
//     }

//     try {
//       const response = await fetch(url, { ...options, headers })
//       if (!response.ok) {
//         const { error } = await response.json()
//         const statusCode = response.status
//         const statusText = response.statusText
//         throw { error, statusCode, statusText }
//       }
//       console.log('customFetch has worked');
      
//       return await response.json()
//     } catch (error) {
//       return await _interceptor(url, options, error)
//     }
//   }

//   return { customFetch }
// }


