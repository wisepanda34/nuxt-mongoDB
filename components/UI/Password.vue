<!--Password.vue-->
<script setup>
import { useVuelidate } from '@vuelidate/core'
import {required, minLength} from "@vuelidate/validators";
const props = defineProps(['id', 'textLabel', 'placeholder', 'modelValue', 'validationRules', "autocomplete"]);
const emit = defineEmits(['update:modelValue']);
const showPassword = ref(false);

const v$ = useVuelidate({ modelValue: props.validationRules });


const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
};
function updateModelValue(event) {
  // v$.modelValue.$model = event.target.value;
  // console.log(v$.modelValue.$error)

  emit("update:modelValue", event.target.value);
}

// onMounted(()=>{
//   console.log(v$.value.$dirty)
// })
</script>

<template>
  <div class="input-pass input">
    <div class="input__label">
      <label :for="id">{{ textLabel }}</label>
    </div>
    <div class="input-pass__wrapper input__block">
      <input
        :id="id"
        :type="showPassword ? 'text' : 'password'"
        :value="modelValue"
        :placeholder="placeholder"
        class="input__field"
        :autocomplete="autocomplete"
        @input="updateModelValue"
      >
      <span v-show="!showPassword" @click="togglePasswordVisibility">
        <img src="/svg/eye.svg" alt="icon">
      </span>
      <span v-show="showPassword" @click="togglePasswordVisibility">
        <img src="/svg/eye-slash.svg" alt="icon">
      </span>
    </div>
    <div class="input__errors" v-if="!v$?.modelValue?.$pending">
      <div class="error-msg text--red" v-if="!v$?.modelValue?.$pending && v$?.modelValue?.$error">
        {{ v$?.modelValue?.$errors?.length ? v$?.modelValue?.$errors[0]?.$message : '' }}
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.input-pass{
  &__wrapper {
    position: relative;
    box-sizing: border-box;
    span{
      position: absolute;
      top: 50%;
      right: 10px;
      width: 20px;
      height: 20px;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
}

@import "@/assets/scss/input.scss";

</style>