<script setup lang="ts">

</script>

<template>
  <div class="header flex">
    <div class="header__logo flex-center">
      <img src="@/public/logo.svg" alt="logo" />
<!--      <NuxtImg src="@/public/logo.svg" alt="logo" />-->

    </div>

    <nav class="header__nav">
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link to="/authors">Authors</nuxt-link>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.header{
  height: 100px;
  background: #e3d4f6;
  border-radius: 10px;

  &__logo{
    width: 100px;
    height: 100px;
    padding: 10px;
  }
  &__logo img{
    width: 100%;
  }
  &__nav{
    margin-left: 50px;

    display: flex;
    gap: 20px;
    align-items: center;

    font-size: 20px;
    font-weight: 700;
    color: #59b684;
  }
}
</style>