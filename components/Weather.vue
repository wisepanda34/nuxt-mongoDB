 <!-- components/Weather.vue -->
<script setup>
// import $api from '~/http'
// import {useMyFetch} from '~/composables/useMyFetch'
// import {useUserExit} from '~/composables/useUserExit'
// import { useAuth } from '~/store/auth';

const city = ref('Hassocks')

    
const { data: weatherData, pending, error, refresh }  = await useFetch('/api/weather',{
  refetchOnWindowFocus: false, // Автоматически повторно отправить запрос при возвращении в фокус
  onRequest({ request, options }) {
    options.headers = options.headers || {}
    options.headers.authorization = localStorage.getItem('access_token')
  },

  onResponse: async ({ request, response, options }) => {
    // console.log('onResponse response', response)
    // console.log('onResponse options', options)
  },
  // onResponseError: async ({ request, response, options }) => {
  //   try {
  //     if (response.status === 401) {
  //       if (options._retry) {
  //         console.log(options)
  //         throw createError({ statusCode: response.status })
  //       }

  //       const { data, error } = await useFetch('/api/refresh',{ ...options, _retry:true});
  //       console.log('refresh data:',data.value);
  //       console.log('refresh error:',error.value)

  //       if (error.value) {
  //         throw createError({ statusCode: error.statusCode, statusMessage: 'Not valid refresh' })
  //       }
        
  //       if (data.value.status === 200) {
  //         const accessToken = data.value.body.accessToken;
  //         console.log('accessToken: ok');
  //         localStorage.setItem('access_token', accessToken);

  //       } else {
  //         console.log('status after refresh:',response.status);
  //       }
  //       const result =  await useFetch('/api/weather', { ...options, _retry: true})
  //       console.log("result: ",result.data.value);
        
  //       return Promise.resolve(result)
  //     }
     
  //     else {
  //       throw createError({ statusCode: response.status })
  //     }
  //   } catch (error) {
  //     console.log('logout')
  //     console.error('onResponseError error:', error);
  //     return Promise.reject(error)
  //   }
  // }
});

if (error) {
  console.log(error.value)
}

console.log('weatherData:', weatherData);

const refreshPage = () => {
  // console.log('refresh');
  
  refresh()
}
const temperature = (temp) => {
  return Math.round(Number(temp) - 272)
}
</script>

<template>
  <section class="weather">
    <div v-if="pending" class="text-center text--grey-4">Loading...</div>
    <div v-else class="weather__wrapper">
      <div class="weather__left">
        <div class="flex">
          <h1 class="text-fw700 text-fz20">Current weather in {{ city }} </h1>
          <div class="weather__recycle" @click.prevent="refreshPage"><img src="../public/svg/recycle.svg" alt="recycle"></div>
        </div>
      
        <br>
        <p v-if="weatherData?.main?.temp">Temperature: <strong>{{ temperature(weatherData.main.temp) }}°C</strong></p><br>
        <p v-if="weatherData?.main?.humidity">Humidity: <strong>{{ weatherData.main.humidity }}%</strong></p><br>
        <p v-if="weatherData?.weather[0]?.description">Weather: <strong>{{ weatherData.weather[0].description }}</strong></p><br> 
        <p v-if="weatherData?.wind?.speed">Wind Speed: <strong>{{ weatherData.wind.speed }} m/s</strong></p><br>
        <div class="weather__img">
          <img src="/images/hassocks2.jpg" alt="img">
        </div>
      </div>

      <div class="weather__right">
        <div class="weather__img">
          <img src="/images/hassocks1.webp" alt="img">
        </div>
      </div>
    </div>
    

  </section>
</template>

<style scoped lang="scss">
.weather{

  &__wrapper{
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    gap: 20px;
  }

  &__recycle{
    width: 40px;
    height: 40px;
  }

  &__img{

    img{
      width: 100%;
      box-shadow: 3px 5px 12px 5px lightgrey;
      border-radius: 4px;
    }
  }
}
</style>

                                                                