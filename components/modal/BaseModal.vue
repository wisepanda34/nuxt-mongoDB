<!--BaseModal.vue-->
<script setup>
const props = defineProps(['modalText'])
const emit = defineEmits(['update:modalText'])
const textNull = ''
const closeModal = () => {
  emit('update:modalText', textNull)
}
</script>

<template>
  <div v-if="modalText" class="modal" @click="closeModal">
    <div class="modal__white">
      <p class="modal__text text--center">
        {{modalText}}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';
.modal{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;

  background: rgba(64, 64, 64, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;

  &__white{
    width: 200px;
    min-height: 150px;
    background: $white;
    opacity: 1;
    border-radius: 4px;
    box-shadow: 8px 13px 9px rgba(0, 0, 0, 0.15);
    transform: translateY(-50%);

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }
}
</style>