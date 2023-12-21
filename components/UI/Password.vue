<!--Password.vue-->
<script setup>
const props = defineProps(['id', 'textLabel', 'placeholder', 'modelValue']);
const emit = defineEmits(['update:modelValue']);
const showPassword = ref(false);


const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
};
function sendModelValue(event) {
  emit("update:modelValue", event.target.value);
}

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
        @input="sendModelValue"
      >
      <span v-if="!showPassword" @click="togglePasswordVisibility">
        <img src="@/public/svg/eye.svg" alt="icon">
      </span>
      <span v-if="showPassword" @click="togglePasswordVisibility">
        <img src="@/public/svg/eye-slash.svg" alt="icon">
      </span>
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