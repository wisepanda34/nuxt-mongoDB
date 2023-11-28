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

<script setup>

const { id, textLabel, type, placeholder, modelValue } = defineProps(['id', 'textLabel', 'type', 'placeholder', 'modelValue']);
const emits = defineEmits(['update:modelValue']);

const updateModelValue = (event) => {
  emits('update:modelValue', event.target.value);
};

</script>

<style scoped lang="scss">
.input{
  width: 400px;

  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 15px 0;
  &__label{

  }
  &__block{
    height: 40px;
  }
  &__field{
    width: 100%;
    height: 100%;
    padding: 8px;
    border-radius: 5px;
    background: white;
    border: 1px solid #ddd;
  }
  &__field:hover{
    border: 1px solid #aaaeb7;
  }
}
</style>