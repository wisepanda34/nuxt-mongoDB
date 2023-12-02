<!-- YearInput.vue -->
<template>
  <div class="year-input">
    <label for="year-input">Year</label>
    <input
        id="year-input"
        class="year-input__field"
        placeholder="Choose year if you know"
        :value="modelValue"
        readonly
        @click="toggleShowCalendar"
    />
    <div v-if="isVisibleCalendar" class="year-input__calendar">
      <ul class="year-input__list">
        <li
            v-for="(item, index) in generateYears(period[0], period[1])"
            :key="index"
            class="year-input__item"
            @click="chooseYear(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>

defineProps(['modelValue']);
const emits = defineEmits(['update:modelValue']);

const period = [1970, 2025];
const isVisibleCalendar = ref(false);

const toggleShowCalendar = () => {
  isVisibleCalendar.value = !isVisibleCalendar.value;
};

const generateYears = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

const chooseYear = (item) => {
  emits('update:modelValue', item);
  isVisibleCalendar.value = false;
};
</script>





<style scoped lang="scss">
.year-input{
  position: relative;
  width: 400px;

  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 15px 0;

  &__field{
    width: 100%;
    height: 100%;
    padding: 8px;
    border-radius: 4px;
    background: white;
    border: 1px solid #ddd;
    &:hover{
      border: 1px solid #aaaeb7;
    }
  }
  &__calendar{
    position: absolute;
    top: -130px;
    left: 4px;
    width: 250px;
    height: 150px;
    z-index: 5;

    overflow-y: scroll;

    padding: 8px;
    border-radius: 4px;
    background: white;
    border: 1px solid #ddd;

  }
  &__list{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 10px;
    column-gap: 10px;
  }
  &__item{
    cursor: pointer;
    padding: 5px;
    display: flex;
    justify-content: center;
    &:hover{
      background: #fdd5cf;
      border-radius: 2px;
    }
  }
}
</style>

