<script setup>

const weather = ref(null)

const fetchWeather =  async () => {
  try{
    const result = await fetch('/api/weather')
    const data = await result.json()
    console.log(typeof data)
    console.log(data)
    weather.value = data
  }catch (error) {
    console.error('Error fetching weather data:', error);
  }
}
onMounted(()=>{
  fetchWeather()
})
</script>

<template>
  <div class="weather">
    Weather
    <pre>weather: {{ weather }}</pre>

  </div>
</template>

<style scoped lang="scss">

</style>