<script setup>

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
  display: grid;
  grid-template-columns: 250px auto;
  gap: 20px;
}
@media (max-width: 1024px) {
  .home{
    grid-template-columns: 200px auto;
  }
}
@media (max-width: 767px) {
  .home{
    grid-template-columns: auto;
    &__news{
      order: 2
    }
    &__main{
      order: 1
    }
  }
}
</style>