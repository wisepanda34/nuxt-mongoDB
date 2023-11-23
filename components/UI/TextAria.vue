<template>
  <div class="textarea">
    <div class="textarea__label">
      <label :for="id">{{ textLabel }}</label>
    </div>

    <div class="textarea__block">
      <textarea
          :id="id"
          :value="modelValue"
          :placeholder="placeholder"
          class="textarea__field"
          autocomplete="off"
          @input="updateModelValue"
      />
    </div>

  </div>
</template>

<script setup>

const { id, textLabel, placeholder, modelValue } = defineProps(['id', 'textLabel', 'placeholder', 'modelValue']);
const emits = defineEmits(['update:modelValue']);

const updateModelValue = (event) => {
  emits('update:modelValue', event.target.value);
};

</script>

<style scoped lang="scss">
.textarea{
  width: 400px;

  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 15px 0;
  &__label{

  }
  &__block{
    height: 60px;
  }
  &__field{
    width: 100%;
    height: 100%;
    padding: 8px;
    border-radius: 5px;
    background: white;
    resize: none;
  }
}
</style>