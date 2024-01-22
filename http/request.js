// request.ts
import { ofetch } from 'ofetch';

const fetcher = ofetch.create({
  baseURL: process.env.API_URL,
  async onRequest({ options }) {
    const accessToken = localStorage.getItem('access_token');
    const language = localStorage.getItem('language');

    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `${accessToken}`,
      };
    }

    if (language) {
      options.headers = {
        ...options.headers,
        'Accept-Language': language,
      };
    }
  },
  async onResponse({ response }) {
    if (response.status === 401) {
      const { accessToken } = await ofetch('api/refresh', {
        baseURL: process.env.API_URL,
      });

      localStorage.setItem('access_token', accessToken);
    }
  },
});

// export default async (request, options) => {
//   try {
//     const response = await fetcher.raw(request, options);
//     return response
//   } catch (error) {
//     if (error.response?.status === 401) {
//       const response = await fetcher.raw(request, options);
//       return response 
//     }

//     return error.response 
//   }
// };