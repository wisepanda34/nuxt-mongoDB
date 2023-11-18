<script setup >
const { posts, error } = defineProps(['posts', 'error']);
</script>

<template>
  <aside class="news">
    <h1 v-if="error">Oops! Error encountered: {{error}}</h1>
    <div v-if="posts">
      <div v-for="post in posts" :key="post.id" class="container">
        <h3>{{ post.id }}</h3>
        <h3>{{ post.title }}</h3>
        <h3>{{ post.body }}</h3>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped >
.news{
  width: 220px;
  background: #d1f8fd;

  padding: 10px;

  border-radius: 10px;
  border: 0.5px solid #9de6fa;
}
</style>