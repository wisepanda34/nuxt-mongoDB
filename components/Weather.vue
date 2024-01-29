 <!-- components/Weather.vue -->
<script setup>
import $api from '~/http';

const route = '/api/weather';
const city = ref('Hassocks')
const weatherData = ref(null)

const getData = async () => {
  try {
    const response = await $api.get(route);
    weatherData.value = response.data;
  } catch (error) {
    console.log('Books.vue error:', error);
  }
};
const temperature = (temp) => {
  return Math.round(Number(temp) - 272)
}

const refreshPage = () => {
  getData();
}

onMounted(() => {
  getData();
});


</script>

<template>
  <section class="weather">
    <div v-if="!weatherData" class="text-center text--grey-4">Loading...</div>
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

                                                                