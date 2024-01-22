<!-- Books.vue -->
<script setup>

const getBooks = async () => {
  try {
    const { data } = await useFetch('/api/books');
    
    if (!data) {
      console.log('Books.vue Response is not ok');
      return
    } 

    return data.value

  } catch (error) {
    console.log('getBooks error:', error);
  }
};
const books = await getBooks();
console.log('books:',books);

</script>

<template>
  <section>
    <div v-if="books">
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
