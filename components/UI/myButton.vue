<script setup lang="ts">

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
  border: 1px solid #59b684;
}
</style>