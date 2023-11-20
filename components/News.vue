<script setup >
const { posts, error } = defineProps(['posts', 'error']);
</script>

<template>
  <aside class="news">
    <h1 v-if="error">Oops! Error encountered: {{error}}</h1>
    <div v-if="posts">
      <div v-for="post in posts" :key="post.id" class="news__post ">
        <h3 class="font-bold text-gray-600 mt-4">{{ post.title }}</h3>
        <p class="mt-1 text-gray-500">{{ post.body }}</p>
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

  &__post{
    margin: 0 0 10px 0;

  }
}
</style>