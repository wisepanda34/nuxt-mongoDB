<!-- Header.vue-->

<script setup>
import Logo from "~/components/UI/Logo.vue";
import {useAuth} from "~/store/auth.js"

const authStore = useAuth()
const logout = async () => {
  try {
    await authStore.logout();
  } catch (error) {
    console.log("Error:", error.message);
  }
};

</script>

<template>
  <div class="header">

    <Logo/>

    <nav class="header__nav">
      <nuxt-link to="/friends">Friends</nuxt-link>
      <nuxt-link to="/books">Books</nuxt-link>
      <nuxt-link to="/authors">Authors</nuxt-link>
      <nuxt-link to="/weather">Weather</nuxt-link>
    </nav>

    <div class="header__client">
      <nuxt-link v-if="!authStore.isAuth"  to="/login">Login</nuxt-link>
      <nuxt-link v-if="authStore.isAuth" to="/profile" class="header__email">{{ authStore.user.email }}</nuxt-link>
      <span v-if="authStore.isAuth" class="header__logout" @click="logout">Logout</span>
      <nuxt-link v-if="!authStore.isAuth"   to="/registration">registration</nuxt-link>
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
  &__logout{
    cursor: pointer;
  }
  &__email{
    color: rgb(199, 166, 35);
  }
}
</style>