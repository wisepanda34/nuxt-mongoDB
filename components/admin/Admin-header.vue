<!-- Admin-header.vue -->
<script setup>
import Logo from "~/components/UI/Logo.vue";

</script>

<template>
  <div class="admin-header">
    <Logo/>
    <div>All Users</div>
    <div>Logout</div>
    
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
}
</style>