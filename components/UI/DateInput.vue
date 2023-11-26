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
          @change="updateModelValue"
          pattern="\d{2}/\d{2}/\d{4}"
      >
    </div>

  </div>
</template>

<script setup>
import moment from 'moment';

const { id, textLabel, type, placeholder, modelValue } = defineProps(['id', 'textLabel', 'type', 'placeholder', 'modelValue']);
const emits = defineEmits(['update:modelValue']);
const updateModelValue = (event) => {
  const inputValue = event.target.value;
  const isValidDate = moment(inputValue, 'DD/MM/YYYY', true).isValid();

  if (isValidDate) {
    emits('update:modelValue', inputValue);
  } else {
    console.log('неверный формат даты');
  }
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
  }
}
</style>