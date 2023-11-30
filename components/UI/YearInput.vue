<template>
  <div class="year-input">
    <label for="year-input">Year</label>
    <input
        id="year-input"
        class="year-input__field"
        placeholder="Choose year if you know"
        :value="selectedYear"
        readonly
        @click="toggleShowCalendar"
    />
    <div v-if="isVisibleCalendar" class="year-input__calendar">
      <ul class="year-input__list">
        <li
            v-for="(item, index) in period"
            :key="index"
            class="date-input__item"
            @click="chooseYear(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const period = [1970, 2025]
const isVisibleCalendar = ref(false)
const selectedYear = ref('')

const toggleShowCalendar = () => {
  isVisibleCalendar.value = !isVisibleCalendar.value;
};

const chooseYear = (item) => {
  selectedYear.value = item
  isVisibleCalendar.value = false;
}


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
    top: -140px;
    left: 4px;
    z-index: 5;

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
    &:hover{
      background: #fdd5cf;
      border-radius: 2px;
    }
  }
}
</style>

