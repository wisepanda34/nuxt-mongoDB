<script setup>

import Logo from "~/components/UI/Logo.vue";
</script>

<template>
  <div class="wrapper site">
    <Logo/>
    <slot/>
    <Footer/>
  </div>
</template>

<style scoped lang="scss">

</style>