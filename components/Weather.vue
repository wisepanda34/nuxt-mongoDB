 <!-- components/Weather.vue -->
<script setup>
import $api from '~/http'
import {useMyFetch} from '~/composables/useMyFetch'
import { useAuth } from '~/store/auth';
const weatherData = ref(null)
const city = ref('Hassocks')

const refreshToken = async () => {
  const response = await useFetch('api/refresh')
  const accessToken = response.data.value.body.accessToken
  localStorage.setItem('access_token', accessToken)
}
const fetchWeather =  async () => {
  const authStore = useAuth()
  try{
    
    const { data } = await useFetch('/api/weather')
    // const { data, pending, error, refresh } = await useFetch('api/weather',{
    //   refetchOnWindowFocus: true, // Автоматически повторно отправить запрос при возвращении в фокус
    //   onRequest({ request, options }) {
    //     options.headers = options.headers || {}
    //     options.headers.authorization = `${localStorage.getItem('access_token')}`
    //   },
    //   onRequestError({ request, options, error }) {
    //     // Handle the request errors
    //   },
    //   onResponse ({ request, response, options }) {
    //     if(response._data.error === 403){
    //       const refreshToken = async () => {
    //         const response = await useFetch('api/refresh')
    //         const accessToken = response.data.value.body.accessToken
    //         localStorage.setItem('access_token', accessToken)
    //         // return refresh();
    //       }
    //       refreshToken()
    //     } 
    //     else if(response._data.error === 401){
    //       authStore.logout()
    //     } else {
    //       console.log('response._data.error = ', response._data.error);
    //     }
    //   },
    //   onResponseError({ request, response, options }) {
    //     if(response._data.error === 401){
    //       console.log('onResponseError 401');
    //     }
    //   }
    // })

    if (data) {
      // console.log('data:', data.value);
      weatherData.value = data.value;
    } 
  }catch (error) {
    console.error('Error fetching weather data:');
  }
}

const temperature = (temp) => {
  return Math.round(Number(temp) - 272)
}


onMounted(()=>{
  fetchWeather()
})
</script>

<template>
  <section class="weather">
    <div class="weather__left">
      <h1 class="text-fw700 text-fz20">Current weather in {{ city }}</h1>
      <br>
      <p v-if="weatherData?.main?.temp">Temperature: <strong>{{ temperature(weatherData.main.temp) }}°C</strong></p><br>
      <p v-if="weatherData?.main?.temp">Humidity: <strong>{{ weatherData.main.humidity }}%</strong></p><br>
      <!-- <p v-if="data?.weather[0]?.description">Weather: <strong>{{ data.weather[0].description }}</strong></p><br> -->
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

  </section>
</template>

<style scoped lang="scss">
.weather{
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 20px;

  &__img{

    img{
      width: 100%;
      box-shadow: 3px 5px 12px 5px lightgrey;
      border-radius: 4px;
    }
  }
}
</style>

                                                                