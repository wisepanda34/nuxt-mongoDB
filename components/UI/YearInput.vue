<!-- YearInput.vue -->
<template>
  <div class="year">
    <p>Year</p>
    <div
        class="year__field"
        @click="toggleShowCalendar"
    >
      <p>{{selectedYear}}</p>
    </div>
    <div v-if="isVisibleCalendar" class="year__calendar">
      <ul class="year__list">
        <li
            v-for="(item, index) in generateYears(period[0], period[1])"
            :key="index"
            class="year__item"
            @click="chooseYear(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>

const props = defineProps(['year']);
const emit = defineEmits(['update:selectedYear']);
const selectedYear = ref( props.year )
const period = [1960, 2025];
const isVisibleCalendar = ref(false);

const toggleShowCalendar = () => {
  isVisibleCalendar.value = !isVisibleCalendar.value;
};

const generateYears = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

const chooseYear = (item) => {
  selectedYear.value = item
  emit('update:selectedYear', selectedYear.value);
  isVisibleCalendar.value = false;
};
</script>





<style scoped lang="scss">
.year{
  position: relative;
  width: 400px;

  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 15px 0;
  &__field{
    width: 100%;
    height: 40px;
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
    grid-template-columns: repeat(3, 1fr);
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

