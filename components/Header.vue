<script setup lang="ts">

import Logo from "~/components/UI/Logo.vue";
</script>

<template>
  <div class="header flex">

    <Logo/>

    <nav class="header__nav">
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link to="/books">Books</nuxt-link>
      <nuxt-link to="/authors">Authors</nuxt-link>
      <nuxt-link to="/weather">Weather</nuxt-link>
    </nav>

    <div class="header__client">
      <nuxt-link to="/login">Login</nuxt-link>
      <nuxt-link to="/registration">registration</nuxt-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header{
  height: 100px;

  display: flex;
  justify-content: space-between;

  background: #e3d4f6;
  border-radius: 10px;

  &__logo{
    width: 180px;
    height: 100px;
    padding: 10px;
  }
  &__logo img{
    width: 100%;
    border-radius: 40px;
  }
  &__nav{
    display: flex;
    gap: 20px;
    align-items: center;

    font-size: 20px;
    font-weight: 700;
    color: #59b684;
  }
  &__client{
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 10px;

    font-size: 16px;
    color: darkslateblue;


  }
}
</style>