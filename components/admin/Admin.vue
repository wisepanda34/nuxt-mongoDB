<!-- Admin.vue -->
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
  <div class="admin">

    <div class="admin__header">
      <Logo/>
      <div class="admin__header-link">All Users</div>
      <div class="admin__header-link" @click="logout">Logout</div>
    </div>
    <section class="admin__main">
      <h1 class="admin__title text-center text--grey-5">ADMIN PANEL</h1>
      <div></div>
    </section>
  </div>
  
</template>

<style scoped lang="scss">
.admin{

  &__header{
  height: 100px;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  background: orangered;
  border-radius: 8px;
  }

  &__header-link {
    cursor: pointer;
  }

  &__main{
    padding: 20px;
  }
}
</style>  