<!-- Authors.vue -->
 <script setup>
import { onMounted } from 'vue';
import $api from '~/http';
import {useAuth} from '~/store/auth'
import { useUserExit } from '#imports'


const route = '/api/authors';
const authorsData = ref(null);

const getData = async () => {
  try {
    const response = await $api.get(route);
    authorsData.value = response.data;
  } catch (error) {
    console.log('Authors.vue error:', error);
  }
};

// Вызываем getData при монтировании компонента
onMounted(() => {
  getData();
});

// const {pending, data: authorsData} = useFetch("/api/authors",{
//   onRequest({ request, options }) {
//      options.headers = options.headers || {}
//      options.headers.authorization = `${localStorage.getItem('access_token')}`
//    },
//  })

</script>


<template>
  <div>
    <h1>Authors</h1>
    <!-- <div v-if="pending" class="text-center text--grey-4">Loading...</div> -->
    <div >
      <div v-for="author in authorsData" :key="author.id" class="container">
        <h4>{{ author.author.name }} {{ author.author.surname }}</h4>
        <p>Favorites books:</p>
        <div v-for="book in author.books" :key="book">
          <p>{{ book }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>