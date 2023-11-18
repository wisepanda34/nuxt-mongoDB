<script setup>
const { data: authors, err } = await useFetch("/api/authors")

</script>

<template>
  <div>
    <h1 v-if="err">Oops! Error encountered: {{err}}</h1>
    <div v-if="authors">
      <div v-for="author in authors" :key="author.id" class="container">
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