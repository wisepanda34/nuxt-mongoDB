<!-- Books.vue -->
<script setup>
import $api from '~/http';

const route = '/api/books';
const books = ref(null);

const getData = async () => {
  try {
    const response = await $api.get(route);
    books.value = response.data;
  } catch (error) {
    console.log('Books.vue error:', error);
  }
};

onMounted(() => {
  getData();
});

</script>

<template>
  <section>
    <div v-if="!books" class="text-center text--grey-4">Loading...</div>

    <div v-else >
      <p>Error Code {{ error.statusCode }}</p>
      <p>Error Message {{ error.message }}</p>
    </div>

    <div v-else>
    <h1>Books</h1><br>
   
    <ul>
      <li v-for="book in books" :key="book.id">
        <p>{{ book.title }}</p>
        <p>{{ book.author }}</p>
        <p>{{ book.genre }}</p>
        <p>{{ book.year }}</p>
      </li>
    </ul>
  </div>
    

  </section>
</template>

<style scoped lang="scss">

</style>
