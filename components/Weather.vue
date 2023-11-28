<script setup>

const data = ref(null)
const city = ref('Hassocks')

const fetchWeather =  async () => {
  try{
    data.value = await (await fetch('/api/weather')).json()
  }catch (error) {
    console.error('Error fetching weather data:', error);
  }
}
// const temp = ref(null)
const temperature = (temp) => {
  return Math.round(Number(temp) - 272)
}
onMounted(()=>{
  fetchWeather()
  // temp.value = data.main.temp
})
</script>

<template>
  <section class="weather">
    <div class="weather__left">
      <h1 class="text-fw700 text-fz20">Current weather in {{ city }}</h1>
      <br>
      <p v-if="data?.main?.temp">Temperature: <strong>{{ temperature(data.main.temp) }}°C</strong></p><br>
      <p v-if="data?.main?.temp">Humidity: <strong>{{ data.main.humidity }}%</strong></p><br>
      <p v-if="data?.weather[0]?.description">Weather: <strong>{{ data.weather[0].description }}</strong></p><br>
      <p v-if="data?.wind?.speed">Wind Speed: <strong>{{ data.wind.speed }} m/s</strong></p><br>
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

<!--        "coord": {                                                      -->
  <!--        "lon": -0.1257,                                                     -->
  <!--        "lat": 51.5085                                                      -->
<!--        },                                                      -->
<!--        "weather": [                                                      -->
  <!--        {                                                     -->
  <!--        "id": 800,                                                      -->
  <!--        "main": "Clear",                                                      -->
  <!--        "description": "clear sky",                                                     -->
  <!--        "icon": "01n"                                                     -->
  <!--        }                                                     -->
<!--        ],                                                      -->
<!--        "base": "stations",                                                     -->
<!--        "main": {                                                     -->
  <!--        "temp": 277.43,                                                     -->
  <!--        "feels_like": 273.77,                                                     -->
  <!--        "temp_min": 275.37,                                                     -->
  <!--        "temp_max": 279.15,                                                         -->
  <!--        "pressure": 1009,                                                         -->
  <!--        "humidity": 85                                                          -->
<!--        },                                                          -->
<!--        "visibility": 10000,                                                          -->
<!--        "wind": {                                                         -->
  <!--        "speed": 4.63,                                                          -->
  <!--        "deg": 280                                                          -->
<!--        },                                                          -->
<!--        "clouds": {                                                         -->
<!--          "all": 9                                                          -->
<!--        },                                                          -->
<!--        "dt": 1701191871,                                                         -->
<!--        "sys": {                                                          -->
  <!--        "type": 2,                                                          -->
  <!--        "id": 2075535,                                                          -->
  <!--        "country": "GB",                                                          -->
  <!--        "sunrise": 1701157146,                                                          -->
  <!--        "sunset": 1701187076                                                          -->
<!--        },                                                                  -->
<!--        "timezone": 0,                                                                  -->
<!--        "id": 2643743,                                                                  -->
<!--        "name": "London",                                                                 -->
<!--        "cod": 200                                                                        -->