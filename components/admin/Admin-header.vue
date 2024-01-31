<!-- Admin-header.vue -->
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
  <div class="admin-header">
    <Logo/>
    <div class="admin-header__link"  >All Users</div>
    <div class="admin-header__link" @click="logout">Logout</div>
    
  </div>
</template>

<style scoped lang="scss">
.admin-header{
  height: 100px;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  background: orangered;
  border-radius: 8px;

  &__link{
    cursor: pointer;
  }
  
}
</style>