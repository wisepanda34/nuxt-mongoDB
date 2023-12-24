<!--Input.vue-->
<script setup>

const { id, textLabel, type, placeholder, modelValue } = defineProps(['id', 'textLabel', 'type', 'placeholder', 'modelValue']);
const emit = defineEmits(['update:modelValue']);

const updateModelValue = (event) => {
  emit('update:modelValue', event.target.value);
};

</script>
<template>
  <div class="input">
    <div class="input__label">
      <label :for="id">{{ textLabel }}</label>
    </div>

    <div class="input__block">
      <input
          :id="id"
          :type="type"
          :value="modelValue"
          :placeholder="placeholder"
          class="input__field"
          autocomplete="off"
          @input="updateModelValue"
      >
    </div>

  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/input.scss";
</style>