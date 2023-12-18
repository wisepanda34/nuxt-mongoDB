<script setup>
import {ref} from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue']);


const isOpen = ref(false)
const period = ['none',1,2,3,5,7,10,14,21,30]
const localSelectedDeadline = ref(period[0])

const openPeriod = () => {
  isOpen.value = true
}
const determineDay = (i) =>{
  localSelectedDeadline.value = period[i]
  emit('update:modelValue', localSelectedDeadline.value);
  isOpen.value = false


}
</script>

<template>
  <div class="beforehand">
    <div class="beforehand__select" @click.stop="openPeriod">
      {{ localSelectedDeadline }}
    </div>
    <p>How many days notify?</p>
    <transition name="slide-fade" :duration="{ enter: 500, leave: 800 }">
      <div v-show="isOpen" class="beforehand__options">
        <ul class="beforehand__list">
          <li v-for="(item, i) in period" @click.stop="determineDay(i)" class="beforehand__item">{{item}}</li>
        </ul>
      </div>
    </transition>
  </div>
</template>



<style scoped lang="scss">
.beforehand{
  position: relative;
  width: 400px;
  display: flex;
  gap: 15px;
  p{
    display: flex;
    align-items: center;
  }
  &__select{
    width: 50px;
    height: 30px;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    border-radius: 4px;
    background: white;
    border: 1px solid #ddd;
    &:hover{
      cursor: pointer;
      border: 1px solid #aaaeb7;
    }
  }
  &__options{
    position: absolute;
    top: 0;
    left: 55px;

    width: 345px;
    height: 30px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;

    z-index: 5;
  }
  &__list{
    height: 100%;
    display: flex;
  }
  &__item{
    padding: 0 11px;
    display: flex;
    text-align: center;
    align-items: center;
    &:first-child{
      padding: 0 5px;
    }
    &:hover{
      cursor: pointer;
      background: #fdd5cf;
    }
  }
}
</style>