<script setup>
  const { text, type } = defineProps(['text', 'type']);
</script>

<template>
  <button
      class="btn flex-center"
      :type="type"
  >
    <span>{{text}}</span>
  </button>
</template>

<style scoped lang="scss">
.btn{
  width: 100px;
  height: 40px;
  border: 2px solid #59b684;
  border-radius: 4px;
  &:hover{
    border: 2.5px solid #85e3b0;
  }
}
</style>