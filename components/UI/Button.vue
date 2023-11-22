<script setup>
  const { text } = defineProps(['text']);
  console.log(typeof text)
  console.log(text)
</script>

<template>
  <button
      class="btn flex-center"
      type="button"
  >
    <span>{{text}}</span>
  </button>
</template>

<style scoped lang="scss">
.btn{
  width: 100px;
  height: 40px;
  border: 1px solid #59b684;
}
</style>