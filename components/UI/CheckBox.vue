<!--CheckBox.vue-->
<script setup >
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const check = ref(false)
const toggleCheck =()=>{
  check.value = !check.value
  emit('update:modelValue', check.value)
}
</script>

<template>
  <div class="checkbox">
    <div class="checkbox__square" @click="toggleCheck">
      <div v-show="check" class="checkbox__mark">
        <img src="/images/check-mark.png" alt="icon">
      </div>
    </div>
    <p class="checkbox__text flex-center text--fz14">
      Do you forget password?
    </p>
  </div>

</template>

<style scoped lang="scss">
.checkbox{
  display: flex;
  gap: 10px;
  &__square{
    width: 18px;
    height: 18px;

    border-radius: 2px;
    border: 1px solid #ddd;
    &:hover{
      border: 1px solid #aaaeb7;
    }
  }

  &__mark{
    img{
      height: 16px;
      transform: translateY(-2px);
    }
  }

}
</style>