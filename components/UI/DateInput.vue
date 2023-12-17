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
                    v-for="(day, index) in selectedDateCurrent.days"
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
const selectedDateCurrent = ref({ month: null, indexMonth: null, day: null, days: [] });
const selectedDate = ref(null)
const date = ref('')

// const props = defineProps(['selectedDate']);
const props = defineProps(['date']);
const emit = defineEmits(['update:selectedDate']);

const toggleShowCalendar = () => {
  isVisibleCalendar.value = !isVisibleCalendar.value;
  isMonth.value = true
};
// computed(selectedDateCurrent, () => {
//   const num = selectedDateCurrent.value.day
//   const month = selectedDateCurrent.value.month
//   date.value = `${month} ${num}`
//   console.log(num)
//   console.log(month)
// })
watch(selectedDate, () => {
  const num = selectedDateCurrent.value.day
  const month = selectedDateCurrent.value.month
  date.value = `${month} ${num}`
  console.log(num)
  console.log(month)
})

const chooseMonth = (month) => {
  selectedMonth.value = month.name
  selectedDateCurrent.value = { month: month.name, indexMonth: month.indexMonth, day: null, days: Array.from({ length: month.countDays }, (_, i) => i + 1) };
  isMonth.value = false;
  console.log( 'chooseMonth:', selectedDateCurrent.value.month)
}
const chooseDay = (day) => {
  selectedDay.value = day
  console.log('day:', day)
  selectedDateCurrent.value.day = day;
  const { indexMonth } = selectedDateCurrent.value
  selectedDate.value = {
    day: day,
    indexMonth: indexMonth
  }
  emit('update:selectedDate', selectedDate.value);
  isVisibleCalendar.value = false;
  isMonth.value = false;
  console.log(selectedDate.value)
}
onMounted(() => {
  console.log("onMounted:", props.date)
  if(props.date){
    const foundMonth = monthsStore.months.find(item => item.indexMonth === props.date.month)
    selectedDateCurrent.value = { month: foundMonth.name, indexMonth: foundMonth.indexMonth, day: props.date.day, days: foundMonth.countDays };
    console.log("onMounted:", selectedDateCurrent.value)
    selectedDate.value = {
      day: selectedDateCurrent.value.day,
      month: selectedDateCurrent.value.month
    }

  }
})
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

