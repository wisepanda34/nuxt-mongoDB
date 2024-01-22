<!-- authors.vue -->
<script setup>

const getAuthors = async () => {
  try{
    const { data } = await useFetch("/api/authors")

    if (!data) {
      console.log('authors.vue Response is not ok');
      return
    } 
    
    return data.value

  }catch(error){
    console.log('getAuthors error');
  }
}
const authorsData = await getAuthors()
console.log('authorsData:',authorsData);

</script>

<template>
  <div>
    <div v-if="authorsData">
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