<!--Input.vue-->
<script setup>

const { id, textLabel, type, placeholder, modelValue, validationRules } = defineProps(['id', 'textLabel', 'type', 'placeholder', 'modelValue', 'validationRules']);
const emit = defineEmits(['update:modelValue']);

const updateModelValue = (event) => {
  emit('update:modelValue', event.target.value);
};
// onMounted(()=>{
//   console.log('validationRules input:',validationRules)
// })

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
          :class="{ 'is-invalid': validationRules?.$pending }"
          @input="updateModelValue"
      >
    </div>
<!--    <div v-if="validationRules">-->
<!--      <div v-if="validationRules?.required" class="input__error">-->
<!--        This field is required.-->
<!--      </div>-->
<!--      <div v-if="validationRules?.minLength" class="input__error">-->
<!--        Minimum length is 4 characters.-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/input.scss";
.input__error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
.is-invalid {
  border-color: red; // Пример стиля для выделения поля ввода при ошибке валидации
}
</style>