<!-- Books.vue -->
<script setup>
import Button from "~/components/UI/Button.vue";

const { pending, data: books, refresh, error } =  useFetch( '/api/books', {
  lazy: false,
  // преобразование данных из data в books, можно переименовать, исключить, изменить структуру
  transform: (books) => {
    return books.map((book)=>({
      id: book._id,
      title: book.title,
      author: book.author,
      genre: book.genre,
      year: book.year, 
    }))
  },
  // onRequest({ request, options }) {
  //   options.headers = options.headers || {}
  //   options.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`
  // },
  // onResponse ({ request, response, options }) {
  //   if(response.status === 200){
  //     localStorage.setItem('access_token', response._data.token);
  //   }
  // },
  // onResponseError({ request, response, options }) {
  //   if (response.status === 403) {
  //     options.url = '/api/refresh';
  //     const refreshResponse = useFetch(options)
  //     if (refreshResponse.status === 200) {
  //       const newRequest = request.clone();
  //       newRequest.headers.authorization = `Bearer ${access_token}`;
  //       newRequest.send();
  //     }
  //   } else {
  //     console.error('Ошибка ответа:', response.statusText);
  //   }
  // }
});

</script>

<template>
  <section>
    <div v-if="pending" class="text-center text--grey-4">Loading...</div>

    <div v-else-if="error">
      <p>Error Code {{ error.statusCode }}</p>
      <p>Error Message {{ error.message }}</p>
    </div>

    <div v-else>
    <h1>Books</h1><br>
    <Button
      type="button" 
      text="Refresh data"
      @click="refresh"
    />
      <br>
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
