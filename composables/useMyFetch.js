// composables/useMyFetch.js

export const useMyFetch = (url, options) => {
  const baseUrl = process.env.API_URL
  return useFetch(url, {
    ...options,
    async onResponse({ request, response, options }) {
      console.log('[fetch response]')
      if(response.status === 401){

        try{
          const response = await fetch(`${baseUrl}/api/refresh`, {
            withCredentials: true,
          });
          localStorage.setItem('access_token', response.data.accessToken);
          return await useFetch(url, options);
        } catch(error){
          console.log('[fetch response error] - 401 - refresh token failed'); 
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    },
    async onResponseError({ request, response, options }) {
      console.log('[fetch response error]')
    },

    async onRequest({ request, options }) {
      const accessToken = localStorage.getItem('access_token');

      if (accessToken) {
        request.headers.set('Authorization', `Bearer ${accessToken}`);
      }
    },
    async onRequestError({ request, options, error }) {
      console.log('[fetch request error]')
    }
  })
}