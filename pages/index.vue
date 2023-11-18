<script setup>
import News from "~/components/News.vue";
import Main from "~/components/Main.vue";

const { data: posts, error } = await useFetch("/api/posts")

</script>

<template>
  <div class="home">
    <News class="home__news" :posts="posts" :error="error"/>
    <Main class="home__main"/>
  </div>
</template>

<style lang="scss" scoped>
.home{
  display: flex;
  gap: 20px;

  &__news{

  }
  &__main{

  }

}
</style>