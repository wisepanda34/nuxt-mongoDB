 <!-- components/Profile.vue -->

<script setup>
import { useAuth } from '~/store/auth';

const authStore = useAuth()

</script>

<template>
  <section class="profile">
    <h1 class="profile__title text-center text--fz24 text--fw700 text--grey-5">User Profile</h1><br>
    <p>User email: <strong>{{ authStore.user.email }}</strong> </p><br>
    <!-- <NuxtLink to="changePaasword">Change password</NuxtLink> -->
  </section>
</template>



<style scoped lang="scss">

</style>