<template>
    <div class="date">
        <p>Date</p>
        <div
            class="date__field"
            @click="toggleShowCalendar"
        >
          <p>{{date}}</p>
        </div>
        <div v-if="isVisibleCalendar" class="date__calendar">
            <ul v-if="isMonth" class="date__month-list">
                <li
                    v-for="(item, index) in monthsStore.months"
                    :key="index"
                    class="date__month-item"
                    @click="chooseMonth(item)"
                >
                  {{ item.name }}
                </li>
            </ul>
            <ul v-else class="date__day-list">
                <li
                    v-for="(day, index) in selectedDate.days"
                    :key="index"
                    class="date__day-item"
                    @click="chooseDay(day)"
                >
                  {{day}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import {useMonths} from "~/store/months.js";
const monthsStore = useMonths()
const isVisibleCalendar = ref(false)
const isMonth = ref(false)
const selectedMonth = ref(null)
const selectedDay= ref(null)
const selectedDate = ref({ month: null, indexMonth: null, day: null, days: [] });
const date = ref('')

defineProps(['selectedDate']);
const emit = defineEmits(['update:selectedDate']);

const toggleShowCalendar = () => {
  isVisibleCalendar.value = !isVisibleCalendar.value;
  isMonth.value = true
};

watch(selectedDay, () => {
  const num = selectedDate.value.day
  const month = selectedDate.value.month
  date.value = `${month} ${num}`
})

const chooseMonth = (month) => {
  selectedMonth.value = month.name
  selectedDate.value = { month: month.name, indexMonth: month.indexMonth, day: null, days: Array.from({ length: month.countDays }, (_, i) => i + 1) };
  isMonth.value = false;
}
const chooseDay = (day) => {
  selectedDay.value = day
  selectedDate.value.day = day;
  emit('update:selectedDate', selectedDate.value);
  isVisibleCalendar.value = false;
  isMonth.value = false;
  console.log(selectedDate.value)
}
</script>





<style scoped lang="scss">
.date{
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
    top: -140px;
    left: 4px;
    z-index: 5;

    padding: 8px;
    border-radius: 4px;
    background: white;
    border: 1px solid #ddd;

  }
  &__month-list{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 10px;
    column-gap: 10px;
  }
  &__month-item{
    cursor: pointer;
    padding: 5px;
    &:hover{
      background: #fdd5cf;
      border-radius: 2px;
    }
  }
  &__day-list{
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  &__day-item{
    cursor: pointer;
    padding: 5px;
    &:hover{
      background: #fdd5cf;
      border-radius: 2px;
    }
  }
}
</style>

